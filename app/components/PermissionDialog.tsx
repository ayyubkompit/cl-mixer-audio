"use client";

interface Props {
  onDismiss: () => void;
}

export default function PermissionDialog({ onDismiss }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        className="mx-4 w-full max-w-sm rounded-xl p-6 text-center"
        style={{ background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)", border: "1px solid #007D7D" }}
      >
        <img src="/logo.png" alt="Campus League" className="mx-auto mb-4 h-10 object-contain" />
        <h2 className="mb-2 text-lg font-bold" style={{ color: "#00FFFF", fontFamily: "var(--font-bai-jamjuree)" }}>
          Audio Permission Required
        </h2>
        <p className="mb-6 text-sm" style={{ color: "#4B4B4B" }}>
          Your browser blocked audio playback. Click below to allow sound.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onDismiss}
            className="rounded-lg px-6 py-2 text-sm font-bold transition-colors"
            style={{ background: "#00FFFF", color: "#111" }}
          >
            Allow Audio
          </button>
          <button
            onClick={onDismiss}
            className="rounded-lg px-6 py-2 text-sm font-bold transition-colors"
            style={{ background: "#00000080", color: "#4B4B4B", border: "1px solid #3F3F3F" }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
