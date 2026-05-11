import BottomNav from "./BottomNav";

export default function WeatherPage({ navActive, setNavActive }) {
  return (
    <div
      style={{
        position: "relative",
        width: 1280,
        height: 800,
        background: "#F8F9FB",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 100,
          fontSize: 48,
          fontWeight: 700,
          color: "#333",
        }}
      >
        Weather Page
      </div>
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 200,
          fontSize: 24,
          color: "#666",
        }}
      >
        This is a placeholder for the Weather page.
      </div>
      <BottomNav active={navActive} setActive={setNavActive} />
    </div>
  );
}
