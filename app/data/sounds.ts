import type { SoundDef } from "../types/sound";

export const POINT_BUTTONS: SoundDef[] = [
  { label: "2 POINT (1)", key: "q", file: "2-points/1.m4a" },
  { label: "2 POINT (2)", key: "w", file: "2-points/2.m4a" },
  { label: "3 POINT (1)", key: "e", file: "3-points/1.m4a" },
  { label: "3 POINT (2)", key: "r", file: "3-points/2.m4a" },
];

export const HORN_BUTTONS: SoundDef[] = [
  { label: "HORN 01", key: "n", file: "horns/1.m4a" },
  { label: "HORN 02", key: "m", file: "horns/2.m4a" },
];

export const MAIN_GRID: SoundDef[][] = [
  [
    { label: "TIP OFF", key: "1", file: "others/tip-off.m4a" },
    { label: "DEFENSE 01", key: "5", file: "defense/1.m4a" },
    { label: "TIMEOUT 01", key: "a", file: "alt-music/timeout-1.m4a" },
    { label: "TO TIGHT 01", key: "g", file: "alt-music/timeout-tight-1.m4a" },
  ],
  [
    { label: "OFFENSE 01", key: "2", file: "offense/1.m4a" },
    { label: "DEFENSE 02", key: "6", file: "defense/2.m4a" },
    { label: "TIMEOUT 02", key: "s", file: "alt-music/timeout-2.m4a" },
    { label: "TO TIGHT 02", key: "h", file: "alt-music/timeout-tight-2.m4a" },
  ],
  [
    { label: "OFFENSE 02", key: "3", file: "offense/2.m4a" },
    { label: "COUNTDOWN", key: "7", file: "defense/countdown.m4a" },
    { label: "END OF QTR A", key: "d", file: "alt-music/end-of-quarter-a.m4a" },
    { label: "FREE THROW", key: "j", file: "others/free-throw.m4a" },
  ],
  [
    { label: "SLAM DUNK 01", key: "4", file: "dunk/1.m4a" },
    { label: "SLAM DUNK 02", key: "8", file: "dunk/2.m4a" },
    { label: "END OF QTR B", key: "f", file: "alt-music/end-of-quarter-b.m4a" },
    { label: "WAITING MUSIC", key: "k", file: "alt-music/waiting.m4a" },
  ],
];

export const ANTHEM_BUTTONS: SoundDef[] = [
  { label: "3 SEC", key: "z", file: "anthem/3sec.m4a" },
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
