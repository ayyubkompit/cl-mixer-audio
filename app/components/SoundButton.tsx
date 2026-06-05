"use client";

import type { DownloadState } from "../types/sound";

interface Props {
  label: string;
  shortcutKey: string;
  isActive: boolean;
  downloadState: DownloadState;
  onClick: () => void;
}

export default function SoundButton({ label, shortcutKey, isActive, downloadState, onClick }: Props) {
  const isDownloading = downloadState === "downloading" || downloadState === "idle";

  const bgStyle = isActive
    ? { background: "#767676" }
    : { background: "#C7C7C7" };

  const textColor = isActive ? "#00FFFF" : "#4B4B4B";
  const shadow = isActive
    ? "0px 0px 4px 0px #00000099"
    : "0px 10px 4px 0px #00000099";

  // Scales with viewport width, capped at 24px
  const fontSize = "clamp(12px, 1.5vw, 24px)";

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.blur();
    onClick();
  }

  return (
    <button
      onClick={handleClick}
      disabled={downloadState === "error"}
      className="relative flex items-center w-full select-none transition-all rounded-[20px] p-4"
      style={{
        ...bgStyle,
        height: 64,
        boxShadow: shadow,
        fontFamily: "var(--font-bai-jamjuree)",
        cursor: downloadState === "error" ? "not-allowed" : "pointer",
        border: "none",
        outline: "none"
      }}
    >
      {isDownloading && (
        <span
          className="block rounded-full animate-pulse absolute"
          style={{ width: 10, height: 10, background: "#4B4B4B66", right: 48, top: "50%", marginTop: -3 }}
        />
      )}

      <span className="relative flex-1 truncate">
        {isActive &&        
          <span
            aria-hidden
            className="absolute inset-0 font-bold truncate pointer-events-none text-left"
            style={{ color: textColor, fontSize, letterSpacing: "0.1em", filter: "blur(5px)" }}
          >
            {label}
          </span>
        }
        <span
          className="relative font-bold truncate text-left block"
          style={{ color: textColor, fontSize, letterSpacing: "0.1em"}}
        >
          {label}
        </span>
      </span>

      <div 
        className="h-full w-px my-3"
        style={{ background: isActive ? "#FFFFFF33" : "#FFF" }}
      />

      <span className="relative truncate">
        {isActive &&        
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center font-bold pointer-events-none"
            style={{ width: 44, color: textColor, fontSize, letterSpacing: "0.1em", filter: "blur(5px)" }}
          >
            {shortcutKey.toUpperCase()}
          </span>
        }
        <span
          className="relative font-bold truncate text-right block shrink-0"
          style={{
            width: 28,
            color: textColor,
            fontSize,
          }}
        >
          {shortcutKey.toUpperCase()}
        </span>
      </span>
    </button>
  );
}
