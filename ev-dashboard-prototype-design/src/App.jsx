import { useState } from "react";
import HomePage            from "./HomePage";
import ChargingPage        from "./ChargingPage";
import ChargingActivePage  from "./ChargingActivePage";

export default function App() {
  const [navActive, setNavActive] = useState(0);
  const [page, setPage]           = useState("home");

  // When nav tab changes, map to page
  const handleNav = (index) => {
    setNavActive(index);
    if (index === 1) {
      // EV tab → go to charging page (or stay in session)
      if (page !== "session") setPage("charging");
    } else {
      setPage("home");
    }
  };

  if (page === "session") {
    return (
      <ChargingActivePage
        navActive={navActive}
        setNavActive={handleNav}
        onStop={() => { setPage("charging"); setNavActive(1); }}
      />
    );
  }

  if (page === "charging") {
    return (
      <ChargingPage
        navActive={navActive}
        setNavActive={handleNav}
        onStartSession={() => setPage("session")}
      />
    );
  }

  return (
    <HomePage
      navActive={navActive}
      setNavActive={handleNav}
      onGoToSession={() => setPage("session")}
    />
  );
}