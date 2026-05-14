import { useState } from "react";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import ChargingPage from "./ChargingPage";
import ChargingActivePage from "./ChargingActivePage";
import SettingsPage from "./SettingsPage";
import AppsPage from "./AppsPage";
import NavPage from "./NavPage";
import WeatherPage from "./WeatherPage";
import EmergencyPage from "./EmergencyPage";
import AccountPage from "./AccountPage"; // 1. 引入新页面

export default function App() {
  const [navActive, setNavActive] = useState(0);
  const [page, setPage] = useState("login");
  const [theme, setTheme] = useState("light");

  const handleNav = (index) => {
    setNavActive(index);
    if (index === 0) setPage("home");
    else if (index === 1) {
      if (page !== "session") setPage("charging");
    } else if (index === 2) setPage("nav");
    else if (index === 3) setPage("weather");
    else if (index === 4) setPage("emergency");
    else if (index === 5) setPage("settings");
    else if (index === 6)
      setPage("account"); // 2. 处理 Account 页面的索引
    else setPage("home");
  };

  const renderPage = () => {
    if (page === "login") {
      return <LoginPage theme={theme} onLoginSuccess={() => setPage("home")} />;
    }

    // 3. 增加 Account 渲染逻辑
    if (page === "account")
      return <AccountPage navActive={navActive} setNavActive={handleNav} />;

    if (page === "session")
      return (
        <ChargingActivePage
          navActive={navActive}
          setNavActive={handleNav}
          onStop={() => {
            setPage("charging");
            setNavActive(1);
          }}
          theme={theme}
        />
      );
    if (page === "charging")
      return (
        <ChargingPage
          navActive={navActive}
          setNavActive={handleNav}
          onStartSession={() => setPage("session")}
          theme={theme}
        />
      );
    if (page === "settings")
      return (
        <SettingsPage
          navActive={navActive}
          setNavActive={handleNav}
          theme={theme}
          setTheme={setTheme}
        />
      );
    if (page === "apps")
      return <AppsPage navActive={navActive} setNavActive={handleNav} />;
    if (page === "nav")
      return (
        <NavPage
          navActive={navActive}
          setNavActive={handleNav}
          theme={theme}
          setTheme={setTheme}
        />
      );
    if (page === "weather")
      return <WeatherPage navActive={navActive} setNavActive={handleNav} />;
    if (page === "emergency")
      return (
        <EmergencyPage
          navActive={navActive}
          setNavActive={handleNav}
          theme={theme}
          setTheme={setTheme}
        />
      );

    return (
      <HomePage
        navActive={navActive}
        setNavActive={handleNav}
        onGoToSession={() => setPage("session")}
        theme={theme}
        setTheme={setTheme}
        onGoToAccount={() => {
          setPage("account");
          setNavActive(6);
        }}
      />
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 1280,
          height: 800,
          borderRadius: 28,
          border: "10px solid #1a1a1a",
          boxShadow: [
            "0 0 0 1px #3a3a3a",
            "0 0 0 3px #111",
            "0 40px 100px rgba(0,0,0,0.8)",
            "0 10px 30px rgba(0,0,0,0.5)",
            "inset 0 1px 0 rgba(255,255,255,0.06)",
          ].join(", "),
          overflow: "hidden",
          flexShrink: 0,
          background: "#000",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 3,
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 3,
            height: "100%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        />

        {renderPage()}
      </div>
    </div>
  );
}
