import { useState } from "react";
import HomePage from "./HomePage";
import ChargingPage from "./ChargingPage";
import ChargingActivePage from "./ChargingActivePage";
import SettingsPage from "./SettingsPage";
import AppsPage from "./AppsPage";
import NavPage from "./NavPage";
import WeatherPage from "./WeatherPage";
import EmergencyPage from "./EmergencyPage";

export default function App() {
  const [navActive, setNavActive] = useState(0);
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState("light");
  // When nav tab changes, map to page
  const handleNav = (index) => {
    setNavActive(index);
    if (index === 0) {
      setPage("home");
    } else if (index === 1) {
      // EV tab → go to charging page (or stay in session)
      if (page !== "session") setPage("charging");
    } else if (index === 2) {
      setPage("nav");
    } else if (index === 3) {
      setPage("weather");
    } else if (index === 4) {
      setPage("emergency");
    } else if (index === 5) {
      setPage("settings");
    } else {
      setPage("home");
    }
  };

  if (page === "session") {
    return (
      <ChargingActivePage
        navActive={navActive}
        setNavActive={handleNav}
        onStop={() => {
          setPage("charging");
          setNavActive(1);
        }}
      />
    );
  }

  if (page === "charging") {
    return (
      <ChargingPage
        navActive={navActive}
        setNavActive={handleNav}
        onStartSession={() => setPage("session")}
        theme={theme}
      />
    );
  }

  if (page === "settings") {
    return (
      <SettingsPage
        navActive={navActive}
        setNavActive={handleNav}
        theme={theme}
        setTheme={setTheme}
      />
    );
  }

  if (page === "apps") {
    return <AppsPage navActive={navActive} setNavActive={handleNav} />;
  }

  if (page === "nav") {
    return (
      <NavPage
        navActive={navActive}
        setNavActive={handleNav}
        theme={theme}
        setTheme={setTheme}
      />
    );
  }

  if (page === "weather") {
    return <WeatherPage navActive={navActive} setNavActive={handleNav} />;
  }

  if (page === "emergency") {
    return <EmergencyPage navActive={navActive} setNavActive={handleNav} />;
  }

  return (
    <HomePage
      navActive={navActive}
      setNavActive={handleNav}
      onGoToSession={() => setPage("session")}
      theme={theme}
      setTheme={setTheme}
    />
  );
}
