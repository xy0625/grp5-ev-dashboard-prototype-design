import { useState, useEffect, useRef } from "react";

// ── Mini SVG Map ──────────────────────────────────────────────
function MapView() {
  return (
    <div className="relative w-full h-full bg-[#1e2130] rounded-2xl overflow-hidden">
      <svg viewBox="0 0 200 280" className="w-full h-full">
        {/* Road grid */}
        <rect x="0" y="60" width="200" height="40" fill="#2a2e45" opacity="0.6" />
        <rect x="80" y="0" width="40" height="280" fill="#2a2e45" opacity="0.6" />
        <rect x="0" y="130" width="200" height="30" fill="#2a2e45" opacity="0.4" />
        <rect x="40" y="0" width="25" height="160" fill="#2a2e45" opacity="0.4" />
        <rect x="130" y="80" width="70" height="25" fill="#2a2e45" opacity="0.4" />
        {/* Route */}
        <polyline
          points="100,0 100,80 160,80 160,280"
          stroke="#6366f1"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
        {/* Current position */}
        <circle cx="100" cy="140" r="7" fill="#7c6ff7" />
        <circle cx="100" cy="140" r="4" fill="#fff" />
        {/* Labels */}
        <text x="10" y="50" fill="#6b7080" fontSize="7" fontFamily="DM Sans,sans-serif">Layang Rd</text>
        <text x="85" y="200" fill="#6b7080" fontSize="7" fontFamily="DM Sans,sans-serif" transform="rotate(-90,85,200)">Main Ave</text>
        <text x="40" y="230" fill="#9ca3af" fontSize="8" fontFamily="DM Sans,sans-serif">Rock Road</text>
        <text x="120" y="110" fill="#9ca3af" fontSize="7" fontFamily="DM Sans,sans-serif">Wisma</text>
        <circle cx="157" cy="260" r="5" fill="#f59e0b" opacity="0.9" />
        <text x="142" y="274" fill="#f59e0b" fontSize="6.5" fontFamily="DM Sans,sans-serif">Vivacity</text>
      </svg>

      {/* Turn instruction */}
      <div className="absolute top-3 left-3 bg-white text-gray-900 rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg">
        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <div>
          <div className="text-sm font-bold leading-none">750m</div>
          <div className="text-[9px] text-gray-500 font-normal">Turn Right</div>
        </div>
      </div>

      {/* Speed */}
      <div className="absolute bottom-3 left-3 bg-white rounded-full w-14 h-14 flex flex-col items-center justify-center shadow">
        <span className="text-lg font-bold text-gray-900 leading-none">80</span>
        <span className="text-[8px] text-gray-500">km/h</span>
      </div>

      {/* Max speed */}
      <div className="absolute bottom-3 left-[72px] bg-[#1a1d27] border border-[#333] rounded-lg px-2 py-1 text-[9px] text-gray-400 text-center leading-tight">
        MAX<br />90
      </div>
    </div>
  );
}

// ── Battery Card ──────────────────────────────────────────────
function BatteryCard() {
  return (
    <div className="bg-[#1a1d27] rounded-2xl p-3 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-widest text-gray-500">Battery</span>
        <span className="text-gray-600 text-lg">···</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <div className="flex-1 h-3 bg-[#2a2d3a] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" style={{ width: "78%" }} />
        </div>
        <span className="text-lg font-semibold">78%</span>
      </div>
      <div className="text-[11px] text-green-400 font-medium flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
        312 km available
      </div>
      <div className="text-[10px] text-gray-600 mt-1">Not connected · Last charged 2h ago</div>
    </div>
  );
}

// ── Climate Card ──────────────────────────────────────────────
function ClimateCard() {
  const [temp, setTemp] = useState(24);
  return (
    <div className="bg-[#1a1d27] rounded-2xl p-3 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-widest text-gray-500">Climate</span>
        <span className="text-gray-600 text-lg">···</span>
      </div>
      <div className="text-[10px] text-gray-600">Auto</div>
      <div className="flex items-center gap-2 mt-1">
        <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.59 4.59A2 2 0 1112 4c0 .73-.4 1.35-1 1.7V12l3 3-3 3v1.3c.6.35 1 .97 1 1.7a2 2 0 11-2.41-1.96V18l-3-3 3-3V5.7A2 2 0 019.59 4.59z" />
        </svg>
        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setTemp((t) => Math.max(16, t - 1))}
            className="bg-[#23273a] text-gray-300 rounded-lg w-7 h-7 flex items-center justify-center text-base hover:bg-[#2e3347] transition"
          >
            −
          </button>
          <span className="text-base font-semibold w-10 text-center">{temp}°</span>
          <button
            onClick={() => setTemp((t) => Math.min(30, t + 1))}
            className="bg-[#23273a] text-gray-300 rounded-lg w-7 h-7 flex items-center justify-center text-base hover:bg-[#2e3347] transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Clock + Weather ───────────────────────────────────────────
function ClockCard() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const dow = time.getDay();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");

  return (
    <div className="bg-[#1a1d27] rounded-2xl p-3 flex flex-col gap-1">
      <div className="text-[9px] text-green-400 uppercase tracking-widest font-medium">Good Morning</div>
      <div className="font-mono text-2xl font-semibold tracking-tight leading-none mt-1">
        {hh}:{mm}
      </div>
      <div className="text-[9px] text-gray-500">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][dow]}, {time.getDate()} {months[time.getMonth()]} {time.getFullYear()}
      </div>
      <div className="flex gap-1 mt-2">
        {days.map((d, i) => (
          <span
            key={i}
            className={`text-[9px] px-1.5 py-1 rounded-md font-medium ${
              i === dow ? "bg-violet-600 text-white" : "text-gray-600"
            }`}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

function WeatherCard() {
  return (
    <div className="bg-[#1a1d27] rounded-2xl p-3 flex items-center gap-3">
      <div>
        <div className="text-[10px] uppercase tracking-widest text-gray-500">Weather</div>
        <div className="text-2xl font-semibold mt-0.5">24°C</div>
        <div className="text-[10px] text-gray-500">Cloudy · 19°C / 29°C</div>
      </div>
      <div className="ml-auto text-3xl" role="img" aria-label="Partly cloudy">🌤</div>
    </div>
  );
}

// ── Trip Card ─────────────────────────────────────────────────
function TripCard() {
  return (
    <div className="bg-[#1a1d27] rounded-2xl p-3">
      <div className="flex items-center gap-2 mb-1">
        <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <span className="text-[10px] uppercase tracking-widest text-gray-500">Trip</span>
        <span className="text-[10px] text-gray-600 ml-auto">Vivacity Mall</span>
      </div>
      <div className="text-[9px] text-gray-600 mb-2">Jalan Isthmus · Kuching</div>
      <div className="flex gap-1.5">
        {[["03:12", "ETA"], ["3.2", "km left"], ["14", "mins"]].map(([val, lbl]) => (
          <div key={lbl} className="flex-1 bg-[#23273a] rounded-xl p-2 text-center">
            <div className="text-sm font-semibold">{val}</div>
            <div className="text-[9px] text-gray-500 mt-0.5">{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Now Playing Card ──────────────────────────────────────────
function NowPlayingCard() {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(107);
  const total = 204;
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (playing) setProgress((p) => (p + 1) % total);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [playing]);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="bg-[#1a1d27] rounded-2xl p-3">
      <div className="text-[9px] uppercase tracking-widest text-gray-500 mb-2">Now Playing</div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-amber-400 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold truncate">Sunset Drive</div>
          <div className="text-[10px] text-gray-500">Ocean Eyes</div>
        </div>
        <svg className="w-4 h-4 text-fuchsia-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
        </svg>
      </div>

      {/* Progress bar */}
      <div className="mt-2 h-1 bg-[#2a2d3a] rounded-full overflow-hidden">
        <div
          className="h-full bg-violet-500 rounded-full transition-all"
          style={{ width: `${Math.round((progress / total) * 100)}%` }}
        />
      </div>
      <div className="flex justify-between text-[9px] text-gray-600 mt-1">
        <span>{fmt(progress)}</span>
        <span>{fmt(total)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-2">
        <button className="text-gray-500 hover:text-gray-300 transition">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="text-white bg-violet-600 hover:bg-violet-500 rounded-full w-8 h-8 flex items-center justify-center transition"
        >
          {playing ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button className="text-gray-500 hover:text-gray-300 transition">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Nav Bar ───────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Apps", icon: (active) => (
    <svg className={`w-5 h-5 ${active ? "text-violet-400" : "text-gray-600"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  )},
  { label: "EV", icon: (active) => (
    <svg className={`w-5 h-5 ${active ? "text-violet-400" : "text-gray-600"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )},
  { label: "Nav", icon: (active) => (
    <svg className={`w-5 h-5 ${active ? "text-violet-400" : "text-gray-600"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )},
  { label: "Weather", icon: (active) => (
    <svg className={`w-5 h-5 ${active ? "text-violet-400" : "text-gray-600"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  )},
  { label: "Phone", icon: (active) => (
    <svg className={`w-5 h-5 ${active ? "text-violet-400" : "text-gray-600"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )},
  { label: "Settings", icon: (active) => (
    <svg className={`w-5 h-5 ${active ? "text-violet-400" : "text-gray-600"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" />
    </svg>
  )},
];

function NavBar({ active, setActive }) {
  return (
    <div className="flex justify-around items-center bg-[#1a1d27] rounded-2xl py-2.5 mt-2.5">
      {NAV_ITEMS.map((item, i) => (
        <button
          key={item.label}
          onClick={() => setActive(i)}
          className="flex flex-col items-center gap-1 cursor-pointer"
        >
          {item.icon(active === i)}
          <span className={`text-[9px] ${active === i ? "text-violet-400" : "text-gray-600"}`}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}

// ── Root Dashboard ────────────────────────────────────────────
export default function EVDashboard() {
  const [navActive, setNavActive] = useState(1);

  return (
    <div
      className="bg-[#0f1117] text-[#e8eaf0] rounded-3xl p-3.5 w-full max-w-3xl mx-auto select-none"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div className="flex gap-3 text-gray-400">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.56 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0M12 20h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" stroke="currentColor" fill="none"/>
          </svg>
        </div>
        <div className="flex items-center gap-2 bg-[#1a1d27] rounded-full px-4 py-1.5 text-[11px] text-gray-500">
          <svg className="w-3 h-3 text-violet-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="1"/><path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
          </svg>
          Say something...
        </div>
        <div className="w-8 h-8 rounded-full bg-[#1a1d27] flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-3 gap-2.5" style={{ gridTemplateRows: "1fr 1fr" }}>
        {/* Map — spans 2 rows */}
        <div className="row-span-2" style={{ minHeight: 300 }}>
          <MapView />
        </div>

        {/* Middle column */}
        <div className="flex flex-col gap-2.5">
          <BatteryCard />
          <ClimateCard />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-2.5">
          <ClockCard />
          <WeatherCard />
        </div>

        {/* Bottom middle */}
        <TripCard />

        {/* Bottom right */}
        <NowPlayingCard />
      </div>

      {/* Nav bar */}
      <NavBar active={navActive} setActive={setNavActive} />
    </div>
  );
}
