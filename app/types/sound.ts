export type DownloadState = "idle" | "downloading" | "ready" | "error";

export interface SoundDef {
  label: string;
  key: string;
  file: string;
}

export interface SoundState {
  download: DownloadState;
  blobUrl: string | null;
}
