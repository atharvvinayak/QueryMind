export default function AnimatedBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-50 bg-[#020817]" />

      <div className="fixed inset-0 -z-40 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(6,182,212,0.12),transparent_35%)]" />

      <div
        className="fixed inset-0 -z-30 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
    </>
  );
}