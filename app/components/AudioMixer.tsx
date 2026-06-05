"use client";

import { useEffect } from "react";
import { useAudioCache } from "../hooks/useAudioCache";
import { POINT_BUTTONS, HORN_BUTTONS, MAIN_GRID, ANTHEM_BUTTONS } from "../data/sounds";
import SoundButton from "./SoundButton";
import SidebarAnimation from "./SidebarAnimation";
import PermissionDialog from "./PermissionDialog";

const BASE_URL = process.env.NEXT_PUBLIC_SOUND_BASE_URL ?? "/sounds/";
const GAP = 24;

export default function AudioMixer() {
  const { soundStates, activeKey, play, needsPermission, dismissPermission } = useAudioCache(BASE_URL);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.repeat) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key.toLowerCase();
      play(key);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [play]);

  const isPlaying = activeKey !== null;

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ fontFamily: "var(--font-bai-jamjuree)" }}
    >
      <img
        src="/bg.webp"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover -z-10"
        style={{ transform: "scale(1.5)" }}
      />
      {needsPermission && <PermissionDialog onDismiss={dismissPermission} />}

      <div className="flex flex-1 min-h-screen p-4 pt-2 gap-[36px]">

        {/* Left sidebar */}
        <SidebarAnimation isActive={isPlaying} />

        {/* Button section */}
        <div className="flex flex-col flex-1 my-[28px] gap-6 justify-center" style={{ gap: GAP }}>
          {/* Header */}
          <div className="flex-10 grid grid-cols-5 gap-x-5 gap-y-6 items-center">
            <div className="flex items-center">
              <img src="/logo.png" alt="Campus League" className="h-14 object-contain" />
            </div>

            {POINT_BUTTONS.map((s) => (
              <SoundButton
                key={s.key}
                label={s.label}
                shortcutKey={s.key}
                isActive={activeKey === s.key}
                downloadState={soundStates[s.key]?.download ?? "idle"}
                onClick={() => play(s.key)}
              />
            ))}
          </div>

          <hr className="h-px bg-[#FFFFFF4D] w-full border-t-0"/>

          {/* Horn buttons row */}
          <div className="flex-10 grid grid-cols-2 gap-x-5 gap-y-6" style={{ gap: GAP }}>
            {HORN_BUTTONS.map((s) => (
              <SoundButton
                key={s.key}
                label={s.label}
                shortcutKey={s.key}
                isActive={activeKey === s.key}
                downloadState={soundStates[s.key]?.download ?? "idle"}
                onClick={() => play(s.key)}
              />
            ))}
          </div>

          {/* Main 4-column grid — flex-1 so rows share remaining height equally */}
          <div className="flex-50 flex flex-col flex-1 gap-x-5 gap-y-6" style={{ gap: GAP }}>
            {MAIN_GRID.map((row, ri) => (
              <div key={ri} className="grid grid-cols-4 flex-1 gap-x-5 gap-y-6" style={{ gap: GAP }}>
                {row.map((s) => (
                  <SoundButton
                    key={s.key}
                    label={s.label}
                    shortcutKey={s.key}
                    isActive={activeKey === s.key}
                    downloadState={soundStates[s.key]?.download ?? "idle"}
                    onClick={() => play(s.key)}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Footer / Anthem section */}
          <div
            className="flex items-center rounded-3xl px-6 py-5 bg-[#007D7D80] gap-x-5 border-1 border-[#00B4B4]"
          >
            <div className="shrink-0 leading-tight">
              <div className="text-[20px] font-bold text-white">
                CAMPUS LEAGUE
              </div>
              <div className="text-[28px] font-bold text-white">
                ANTHEM
              </div>
            </div>
            <div className="flex-1 grid grid-cols-4" style={{ gap: GAP }}>
              {ANTHEM_BUTTONS.map((s) => (
                <SoundButton
                  key={s.key}
                  label={s.label}
                  shortcutKey={s.key}
                  isActive={activeKey === s.key}
                  downloadState={soundStates[s.key]?.download ?? "idle"}
                  onClick={() => play(s.key)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <SidebarAnimation isActive={isPlaying} />
      </div>

      <div className="absolute bottom-3 left-0 right-0 text-center text-white text-sm pointer-events-none">
        Campus League &copy; 2026
      </div>
    </div>
  );
}
