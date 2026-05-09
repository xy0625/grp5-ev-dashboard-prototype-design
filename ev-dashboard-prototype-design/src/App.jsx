import { useState } from "react";
import HomePage     from "./HomePage";
import ChargingPage from "./ChargingPage";

export default function App() {
  // 0 = Apps (Home), 1 = EV (Charging), 2-5 = others (Home)
  const [navActive, setNavActive] = useState(0);

  return navActive === 1
    ? <ChargingPage navActive={navActive} setNavActive={setNavActive} />
    : <HomePage     navActive={navActive} setNavActive={setNavActive} />;
}