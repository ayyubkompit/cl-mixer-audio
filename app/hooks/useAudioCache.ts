"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ALL_SOUNDS } from "../data/sounds";
import type { SoundState, DownloadState } from "../types/sound";

const CACHE_NAME = "audio-cache-v1";

type SoundStateMap = Record<string, SoundState>;

export function useAudioCache(baseUrl: string) {
  const [soundStates, setSoundStates] = useState<SoundStateMap>(() =>
    Object.fromEntries(
      ALL_SOUNDS.map((s) => [s.key, { download: "idle" as DownloadState, blobUrl: null }])
    )
  );

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [needsPermission, setNeedsPermission] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlsRef = useRef<Record<string, string>>({});

  const setDownloadState = useCallback((key: string, download: DownloadState, blobUrl?: string) => {
    setSoundStates((prev) => ({
      ...prev,
      [key]: { download, blobUrl: blobUrl ?? prev[key]?.blobUrl ?? null },
    }));
    if (blobUrl) {
      blobUrlsRef.current[key] = blobUrl;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchSound(key: string, file: string) {
      const url = `${baseUrl}${file}`;
      setDownloadState(key, "downloading");

      try {
        const cache = await caches.open(CACHE_NAME);
        let response = await cache.match(url);

        if (!response) {
          const fetched = await fetch(url);
          if (!fetched.ok) throw new Error(`HTTP ${fetched.status}`);
          await cache.put(url, fetched.clone());
          response = fetched;
        }

        const blob = await response.blob();
        if (cancelled) {
          URL.revokeObjectURL(URL.createObjectURL(blob));
          return;
        }
        const blobUrl = URL.createObjectURL(blob);
        setDownloadState(key, "ready", blobUrl);
      } catch {
        if (!cancelled) setDownloadState(key, "error");
      }
    }

    const seen = new Set<string>();
    const promises: Promise<void>[] = [];

    for (const sound of ALL_SOUNDS) {
      if (!seen.has(sound.key)) {
        seen.add(sound.key);
        promises.push(fetchSound(sound.key, sound.file));
      }
    }

    Promise.all(promises);

    return () => {
      cancelled = true;
    };
  }, [baseUrl, setDownloadState]);

  const play = useCallback(
    async (key: string) => {
      const blobUrl = blobUrlsRef.current[key];
      if (!blobUrl) return;

      if (activeKey === key) {
        audioRef.current?.pause();
        if (audioRef.current) audioRef.current.currentTime = 0;
        setActiveKey(null);
        return;
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(blobUrl);
      audioRef.current = audio;

      audio.onended = () => setActiveKey(null);
      audio.onpause = () => {
        if (audio.ended) return;
        setActiveKey(null);
      };

      try {
        await audio.play();
        setActiveKey(key);
        setNeedsPermission(false);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "NotAllowedError") {
          setNeedsPermission(true);
        }
      }
    },
    [activeKey]
  );

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setActiveKey(null);
  }, []);

  const dismissPermission = useCallback(() => {
    setNeedsPermission(false);
  }, []);

  return { soundStates, activeKey, play, stop, needsPermission, dismissPermission };
}
