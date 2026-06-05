import type { SoundDef } from "../types/sound";

export const POINT_BUTTONS: SoundDef[] = [
  { label: "2 POINT (1)", key: "q", file: "point.mp3" },
  { label: "2 POINT (2)", key: "w", file: "point.mp3" },
  { label: "3 POINT (1)", key: "e", file: "point.mp3" },
  { label: "3 POINT (2)", key: "r", file: "point.mp3" },
];

export const HORN_BUTTONS: SoundDef[] = [
  { label: "HORN 01", key: "n", file: "tip-off-01.mp3" },
  { label: "HORN 02", key: "m", file: "tip-off-02.mp3" },
];

export const MAIN_GRID: SoundDef[][] = [
  [
    { label: "TIP OFF", key: "1", file: "tip-off-03.mp3" },
    { label: "DEFENSE 01", key: "5", file: "defense-01.mp3" },
    { label: "ALT MUSIC 01", key: "a", file: "offense-04.mp3" },
    { label: "EPIC 01", key: "g", file: "defense-04.mp3" },
  ],
  [
    { label: "OFFENSE 01", key: "2", file: "offense-01.mp3" },
    { label: "DEFENSE 02", key: "6", file: "defense-02.mp3" },
    { label: "ALT MUSIC 02", key: "s", file: "offense-05.mp3" },
    { label: "EPIC 02", key: "h", file: "defense-05.mp3" },
  ],
  [
    { label: "OFFENSE 01", key: "3", file: "offense-01.mp3" },
    { label: "DEFENSE 03", key: "7", file: "defense-03.mp3" },
    { label: "ALT SHORT 01", key: "d", file: "free.mp3" },
    { label: "FREE THROW", key: "j", file: "free-throw-01.mp3" },
  ],
  [
    { label: "SLAM DUNK 01", key: "4", file: "tip-off-04.mp3" },
    { label: "SLAM DUNK 02", key: "8", file: "offense-02.mp3" },
    { label: "ALT SHORT 02", key: "f", file: "free-throw-02.mp3" },
    { label: "WAITING MUSIC", key: "k", file: "offense-06.mp3" },
  ],
];

export const ANTHEM_BUTTONS: SoundDef[] = [
  { label: "3 SEC", key: "z", file: "countdown.mp3" },
  { label: "30 SEC", key: "x", file: "countdown.mp3" },
  { label: "1 MIN", key: "c", file: "countdown.mp3" },
  { label: "FULL", key: "v", file: "countdown.mp3" },
];

export const ALL_SOUNDS: SoundDef[] = [
  ...POINT_BUTTONS,
  ...HORN_BUTTONS,
  ...MAIN_GRID.flat(),
  ...ANTHEM_BUTTONS,
];
