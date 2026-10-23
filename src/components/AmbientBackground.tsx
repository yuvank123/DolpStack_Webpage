export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden="true">
      {/* Ambient glass-like gradient waves */}
      <div className="ambient-blob blob-top-left" />
      <div className="ambient-blob blob-bottom-right" />
      <div className="ambient-blob blob-top-right" />
      <div className="ambient-blob blob-bottom-left" />

      {/* frosted glass backdrop overlay */}
      <div className="absolute inset-0 backdrop-blur-[100px] pointer-events-none" />
    </div>
  );
}
