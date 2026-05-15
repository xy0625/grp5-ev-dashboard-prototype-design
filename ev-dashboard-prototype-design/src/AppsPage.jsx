import BottomNav from "./BottomNav";

function tk(theme) {
  const dark = theme === "dark";
  return {
    pageBg: dark ? "#0F1117" : "#F8F9FB",
    textPrimary: dark ? "#E8EAF0" : "#111827",
    textMuted: dark ? "#9CA3AF" : "#666",
  };
}

export default function AppsPage({ navActive, setNavActive, theme = "dark" }) {
  const t = tk(theme);
  return (
    <div
      style={{
        position: "relative",
        width: 1280,
        height: 800,
        background: t.pageBg,
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
        color: t.textPrimary,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 100,
          fontSize: 48,
          fontWeight: 700,
          color: t.textPrimary,
        }}
      >
        Apps Page
      </div>
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 200,
          fontSize: 24,
          color: t.textMuted,
        }}
      >
        This is a placeholder for the Apps page.
      </div>
      <BottomNav active={navActive} setActive={setNavActive} theme={theme} />
    </div>
  );
}
