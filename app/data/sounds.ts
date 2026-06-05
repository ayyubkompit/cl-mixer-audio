import type { SoundDef } from "../types/sound";

export const POINT_BUTTONS: SoundDef[] = [
  { label: "2 POINT (1)", key: "q", file: "2-points/1.flac" },
  { label: "2 POINT (2)", key: "w", file: "2-points/2.flac" },
  { label: "3 POINT (1)", key: "e", file: "3-points/1.flac" },
  { label: "3 POINT (2)", key: "r", file: "3-points/2.flac" },
];

export const HORN_BUTTONS: SoundDef[] = [
  { label: "HORN 01", key: "n", file: "horns/1.flac" },
  { label: "HORN 02", key: "m", file: "horns/2.flac" },
];

export const MAIN_GRID: SoundDef[][] = [
  [
    { label: "TIP OFF", key: "1", file: "others/tip-off.flac" },
    { label: "DEFENSE 01", key: "5", file: "defense/1.flac" },
    { label: "ALT MUSIC 01", key: "a", file: "alt-music/alt-music-1.mp3" },
    { label: "EPIC 01", key: "g", file: "alt-music/epic-1.mp3" },
  ],
  [
    { label: "OFFENSE 01", key: "2", file: "offense/1.flac" },
    { label: "DEFENSE 02", key: "6", file: "defense/2.flac" },
    { label: "ALT MUSIC 02", key: "s", file: "alt-music/alt-music-2.mp3" },
    { label: "EPIC 02", key: "h", file: "alt-music/epic-2.mp3" },
  ],
  [
    { label: "OFFENSE 02", key: "3", file: "offense/2.flac" },
    { label: "DEFENSE 03", key: "7", file: "defense/3.flac" },
    { label: "ALT SHORT 01", key: "d", file: "alt-music/alt-short-1.mp3" },
    { label: "FREE THROW", key: "j", file: "others/free-throw.flac" },
  ],
  [
    { label: "SLAM DUNK 01", key: "4", file: "dunk/1.flac" },
    { label: "SLAM DUNK 02", key: "8", file: "dunk/2.flac" },
    { label: "ALT SHORT 02", key: "f", file: "alt-music/alt-short-2.mp3" },
    { label: "WAITING MUSIC", key: "k", file: "alt-music/waiting.mp3" },
  ],
];

export const ANTHEM_BUTTONS: SoundDef[] = [
  { label: "3 SEC", key: "z", file: "anthem/3sec.mp3" },
  { label: "30 SEC", key: "x", file: "anthem/30sec.mp3" },
  { label: "1 MIN", key: "c", file: "anthem/1min.mp3" },
  { label: "FULL", key: "v", file: "anthem/full.mp3" },
];

export const ALL_SOUNDS: SoundDef[] = [
  ...POINT_BUTTONS,
  ...HORN_BUTTONS,
  ...MAIN_GRID.flat(),
  ...ANTHEM_BUTTONS,
];
