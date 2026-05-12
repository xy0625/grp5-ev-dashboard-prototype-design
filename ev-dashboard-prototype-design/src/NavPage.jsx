import { useState, useEffect, useRef, useCallback } from "react";
import BottomNav from "./BottomNav";

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const FAV_STATIONS = [
  {
    id: 1,
    name: "Vivacity Megamall EV Charger",
    address: "Jalan Wan Alwi, Kuching",
    lat: 1.5072,
    lng: 110.3651,
    dist: "3.2 km",
    time: "8 min",
  },
  {
    id: 2,
    name: "The Spring Shopping Mall",
    address: "Jalan Pending, Kuching",
    lat: 1.5188,
    lng: 110.3842,
    dist: "5.1 km",
    time: "12 min",
  },
  {
    id: 3,
    name: "Kuching Waterfront EV Hub",
    address: "Waterfront Promenade, Kuching",
    lat: 1.5573,
    lng: 110.3439,
    dist: "1.8 km",
    time: "5 min",
  },
  {
    id: 4,
    name: "AEON Mall Kuching Central",
    address: "Jalan Simpang Tiga, Kuching",
    lat: 1.5295,
    lng: 110.3574,
    dist: "4.4 km",
    time: "10 min",
  },
  {
    id: 5,
    name: "Bintang Megamall Charger",
    address: "Jalan Rubber, Kuching",
    lat: 1.5397,
    lng: 110.3502,
    dist: "2.7 km",
    time: "7 min",
  },
];

/* ═══════════════════════════════════════════════════════════════
   SVG ICONS
═══════════════════════════════════════════════════════════════ */
const NavDashboard = ({ active }) => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
    <rect
      x="3"
      y="3"
      width="12"
      height="12"
      rx="2"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2.5"
    />
    <rect
      x="19"
      y="3"
      width="12"
      height="12"
      rx="2"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2.5"
    />
    <rect
      x="3"
      y="19"
      width="12"
      height="12"
      rx="2"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2.5"
    />
    <rect
      x="19"
      y="19"
      width="12"
      height="12"
      rx="2"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2.5"
    />
  </svg>
);
const NavFuel = ({ active }) => (
  <svg width="32" height="36" viewBox="0 0 32 36" fill="none">
    <rect
      x="3"
      y="4"
      width="18"
      height="24"
      rx="2"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2.5"
    />
    <path
      d="M21 10h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="8"
      y1="28"
      x2="16"
      y2="28"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="8"
      y1="28"
      x2="8"
      y2="32"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="16"
      y1="28"
      x2="16"
      y2="32"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const NavLocation = ({ active }) => (
  <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
    <path
      d="M14 2C8.5 2 3 7 3 13.5c0 9 11 20.5 11 20.5s11-11.5 11-20.5C25 7 19.5 2 14 2z"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2.5"
      fill={active ? "rgba(255,255,255,0.2)" : "none"}
    />
    <circle
      cx="14"
      cy="13.5"
      r="4"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2.5"
    />
  </svg>
);
const NavWeather = ({ active }) => (
  <svg width="38" height="34" viewBox="0 0 38 34" fill="none">
    <circle
      cx="19"
      cy="11"
      r="6"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2.5"
    />
    <path
      d="M9 22a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <rect
      x="4"
      y="22"
      width="30"
      height="9"
      rx="4.5"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2.5"
    />
  </svg>
);
const NavEmergency = ({ active }) => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle
      cx="18"
      cy="14"
      r="6"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2.5"
    />
    <path
      d="M4 34c0-7.7 6.3-14 14-14s14 6.3 14 14"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M24 8c2 1.2 3 3 3 5s-1 3.8-3 5"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M27 4c3.5 2 5.5 5 5.5 9s-2 7-5.5 9"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const NavSettings = ({ active }) => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle
      cx="18"
      cy="18"
      r="6"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2.5"
    />
    <path
      d="M18 3v4M18 29v4M3 18h4M29 18h4M7.1 7.1l2.8 2.8M26.1 26.1l2.8 2.8M7.1 28.9l2.8-2.8M26.1 9.9l2.8-2.8"
      stroke={active ? "#fff" : "#4B4E53"}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const MicIcon = ({ listening }) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect
      x="11"
      y="3"
      width="10"
      height="15"
      rx="5"
      fill={listening ? "#2B8FFF" : "none"}
      stroke={listening ? "#2B8FFF" : "#555"}
      strokeWidth="2.2"
    />
    <path
      d="M5 15a11 11 0 0 0 22 0"
      stroke={listening ? "#2B8FFF" : "#555"}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <line
      x1="16"
      y1="26"
      x2="16"
      y2="30"
      stroke={listening ? "#2B8FFF" : "#555"}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <line
      x1="10"
      y1="30"
      x2="22"
      y2="30"
      stroke={listening ? "#2B8FFF" : "#555"}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="26" height="24" viewBox="0 0 26 24" fill="none">
    <path
      d="M13 21S2 14 2 7a5.5 5.5 0 0 1 11-1 5.5 5.5 0 0 1 11 1c0 7-11 14-11 14z"
      fill={filled ? "#FF0000" : "none"}
      stroke="#FF0000"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  </svg>
);

const SpeakerIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
    <path d="M4 9H9L15 4V22L9 17H4V9Z" fill="#555" />
    <path
      d="M19 8c1.5 1.5 2.5 3.1 2.5 5S20.5 16.5 19 18"
      stroke="#555"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M22 5c2.5 2.5 4 5 4 8s-1.5 5.5-4 8"
      stroke="#555"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/* Speaker ON — blue waves */
const SpeakerOnIcon = () => (
  <svg width="30" height="30" viewBox="0 0 28 28" fill="none">
    <path d="M4 9H9L15 4V24L9 19H4V9Z" fill="#2B8FFF" />
    <path
      d="M19 9c1.5 1.5 2.5 3.1 2.5 5S20.5 17.5 19 19"
      stroke="#2B8FFF"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M22 6c2.5 2.5 4 5 4 8s-1.5 5.5-4 8"
      stroke="#2B8FFF"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

/* Speaker OFF — grey + X */
const SpeakerOffIcon = () => (
  <svg width="30" height="30" viewBox="0 0 28 28" fill="none">
    <path d="M4 9H9L15 4V24L9 19H4V9Z" fill="#bbb" />
    <line
      x1="19"
      y1="8"
      x2="27"
      y2="20"
      stroke="#bbb"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <line
      x1="27"
      y1="8"
      x2="19"
      y2="20"
      stroke="#bbb"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

/* Bigger turn arrow */
const TurnRightArrow = () => (
  <svg width="64" height="64" viewBox="0 0 44 44" fill="none">
    <path
      d="M9 33V17C9 13 13 9 21 9H33M33 9L25 3M33 9L25 15"
      stroke="#1E1E1E"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LocateIcon = ({ active }) => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
    <circle
      cx="17"
      cy="17"
      r="9"
      stroke={active ? "#2B8FFF" : "#333"}
      strokeWidth="2.5"
    />
    <circle cx="17" cy="17" r="3" fill={active ? "#2B8FFF" : "#333"} />
    <line
      x1="17"
      y1="2"
      x2="17"
      y2="7"
      stroke={active ? "#2B8FFF" : "#333"}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="17"
      y1="27"
      x2="17"
      y2="32"
      stroke={active ? "#2B8FFF" : "#333"}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="2"
      y1="17"
      x2="7"
      y2="17"
      stroke={active ? "#2B8FFF" : "#333"}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <line
      x1="27"
      y1="17"
      x2="32"
      y2="17"
      stroke={active ? "#2B8FFF" : "#333"}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const ChargingBolt = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M12 2L4 12H10L8 18L16 8H10L12 2Z" fill="#2B8FFF" />
  </svg>
);

const PaperPlaneIcon = () => (
  <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
    <path d="M40 6L6 19l14 6 6 15L40 6z" fill="#fff" />
    <path
      d="M20 25L40 6"
      stroke="rgba(43,143,255,0.5)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   INFO CARD  (top-left: range + battery)
═══════════════════════════════════════════════════════════════ */
function InfoCard({ distanceKm, batteryPct }) {
  const barColor =
    batteryPct > 50 ? "#49E83D" : batteryPct > 20 ? "#FFA500" : "#FF4444";
  return (
    <div
      style={{
        position: "absolute",
        left: "56px",
        top: "17px",
        width: "171px",
        height: "129px",
        background: "#fff",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.25)",
        borderRadius: "20px",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "14px 18px",
        gap: "10px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: "32px",
          fontWeight: 700,
          color: "#1E1E1E",
          lineHeight: 1,
        }}
      >
        {distanceKm} km
      </div>
      <div style={{ display: "flex" }}>
        {/* Battery shell */}
        <div
          style={{
            position: "relative",
            left: 10,
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >
          <div
            style={{
              width: "48px",
              height: "22px",
              border: "2px solid #999",
              borderRadius: "4px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: `${batteryPct}%`,
                height: "100%",
                background: barColor,
                transition: "width 0.5s",
              }}
            />
          </div>
          <div
            style={{
              width: "4px",
              height: "10px",
              background: "#999",
              borderRadius: "0 2px 2px 0",
              marginLeft: "1px",
            }}
          />
        </div>
        <span
          style={{
            fontSize: "20px",
            fontWeight: 500,
            color: "#000",
            position: "relative",
            left: 20,
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >
          {batteryPct}%
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SPEEDOMETER  (circular, orange/red border)
═══════════════════════════════════════════════════════════════ */
function Speedometer({ speed }) {
  const isOver = speed > 80;
  return (
    <div
      style={{
        position: "absolute",
        left: "245px",
        top: "17px",
        width: "100px",
        height: "100px",
        background: "#fff",
        boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
        borderRadius: "50%",
        border: `3.5px solid ${isOver ? "#FF4444" : "#FFA500"}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        transition: "border-color 0.3s",
      }}
    >
      <span
        style={{
          fontSize: "34px",
          fontWeight: 700,
          color: isOver ? "#FF4444" : "#000",
          lineHeight: 1,
          marginTop: "20px",
          transition: "color 0.3s",
        }}
      >
        {speed}
      </span>
      <span
        style={{
          fontSize: "11px",
          color: "#666",
          fontWeight: 500,
        }}
      >
        km/h
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TURN CARD  (top-right, navigation mode)
═══════════════════════════════════════════════════════════════ */
function TurnCard({ instruction, voiceOn, onToggleVoice }) {
  if (!instruction) return null;
  return (
    <div
      style={{
        position: "absolute",
        right: "20px",
        top: "17px",
        width: "430px",
        height: "100px",
        background: "#fff",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
        borderRadius: "16px",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: "16px",
        animation: "fadeIn 0.3s ease",
      }}
    >
      {/* Bigger direction icon */}
      <div style={{ flexShrink: 0 }}>
        <TurnRightArrow />
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "26px",
            fontWeight: 700,
            color: "#1E1E1E",
            lineHeight: 1,
          }}
        >
          {instruction.dist}
        </div>
        <div style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
          {instruction.text}
        </div>
      </div>
      {/* Speaker toggle button */}
      <button
        onClick={onToggleVoice}
        title={voiceOn ? "Mute navigation voice" : "Unmute navigation voice"}
        style={{
          background: voiceOn ? "rgba(43,143,255,0.08)" : "rgba(0,0,0,0.04)",
          border: voiceOn ? "1.5px solid #2B8FFF" : "1.5px solid #ddd",
          borderRadius: "50%",
          cursor: "pointer",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          outline: "none",
          flexShrink: 0,
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        {voiceOn ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SEARCH BAR  (with live voice + suggestions)
═══════════════════════════════════════════════════════════════ */
function SearchBar({ onSearch, hidden }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState("");
  const debounceRef = useRef(null);
  const recognitionRef = useRef(null);

  const fetchSuggestions = useCallback(async (q) => {
    if (q.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5&countrycodes=my`,
        { headers: { "Accept-Language": "en" } },
      );
      setSuggestions(await res.json());
    } catch {
      setSuggestions([]);
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const v = e.target.value;
    setQuery(v);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(v), 350);
  };
  const handleSelect = (item) => {
    setQuery(item.display_name.split(",")[0]);
    setSuggestions([]);
    onSearch({
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      name: item.display_name,
    });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestions.length > 0)
      handleSelect(suggestions[0]);
    if (e.key === "Escape") setSuggestions([]);
  };

  const handleMicClick = () => {
    setMicError("");
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setMicError("Voice search not supported in this browser.");
      setTimeout(() => setMicError(""), 4000);
      return;
    }
    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      return;
    }
    const r = new SR();
    r.lang = "en-MY";
    r.interimResults = true;
    r.maxAlternatives = 1;
    r.continuous = false;
    recognitionRef.current = r;
    r.onstart = () => setListening(true);
    r.onresult = (ev) => {
      const t = Array.from(ev.results)
        .map((x) => x[0].transcript)
        .join("");
      setQuery(t);
      if (ev.results[ev.results.length - 1].isFinal) {
        clearTimeout(debounceRef.current);
        fetchSuggestions(t);
      }
    };
    r.onerror = (ev) => {
      setListening(false);
      setMicError(
        ev.error === "not-allowed"
          ? "Microphone access denied. Enable it in browser settings."
          : `Voice error: ${ev.error}`,
      );
      setTimeout(() => setMicError(""), 5000);
    };
    r.onend = () => setListening(false);
    r.start();
  };

  if (hidden) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "590px",
        zIndex: 15,
        flexShrink: 0,
      }}
    >
      {/* Bar */}
      <div
        style={{
          width: "590px",
          height: "86px",
          background: "#fff",
          boxShadow: listening
            ? "0 4px 20px rgba(43,143,255,0.45)"
            : "0px 4px 20px rgba(0,0,0,0.25)",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: "8px",
          boxSizing: "border-box",
          border: listening ? "2px solid #2B8FFF" : "2px solid transparent",
          transition: "box-shadow 0.3s, border-color 0.3s",
        }}
      >
        <input
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={listening ? "Listening…" : "Search"}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "32px",
            fontWeight: 400,
            color: listening ? "#2B8FFF" : "#727272",
            background: "transparent",
            fontFamily: "'Inter',sans-serif",
          }}
        />
        {loading && (
          <div
            style={{
              width: "24px",
              height: "24px",
              border: "3px solid #eee",
              borderTop: "3px solid #2B8FFF",
              borderRadius: "50%",
              animation: "spin 0.7s linear infinite",
              flexShrink: 0,
            }}
          />
        )}
        {/* Mic button */}
        <button
          onClick={handleMicClick}
          title={listening ? "Stop" : "Voice search"}
          style={{
            background: listening ? "rgba(43,143,255,0.10)" : "none",
            border: listening ? "2px solid #2B8FFF" : "2px solid transparent",
            borderRadius: "50%",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            flexShrink: 0,
            outline: "none",
          }}
        >
          <MicIcon listening={listening} />
        </button>
      </div>

      {/* Listening pulse ring */}
      {listening && (
        <div
          style={{
            position: "absolute",
            right: "14px",
            top: "14px",
            width: "58px",
            height: "58px",
            borderRadius: "50%",
            border: "3px solid #2B8FFF",
            opacity: 0.4,
            animation: "pulseRing 1.2s ease-out infinite",
            pointerEvents: "none",
          }}
        />
      )}

      {micError && (
        <div
          style={{
            position: "absolute",
            top: "92px",
            left: 0,
            background: "#fff3f3",
            border: "1px solid #ffaaaa",
            borderRadius: "10px",
            padding: "10px 16px",
            fontSize: "14px",
            color: "#cc0000",
            boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
            zIndex: 25,
          }}
        >
          {micError}
        </div>
      )}

      {suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "92px",
            left: 0,
            width: "590px",
            background: "#fff",
            borderRadius: "14px",
            boxShadow: "0 8px 28px rgba(0,0,0,0.16)",
            overflow: "hidden",
            zIndex: 20,
          }}
        >
          {suggestions.map((s, i) => (
            <div
              key={s.place_id}
              onClick={() => handleSelect(s)}
              style={{
                padding: "14px 20px",
                fontSize: "16px",
                color: "#222",
                cursor: "pointer",
                borderBottom:
                  i < suggestions.length - 1 ? "1px solid #f0f0f0" : "none",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f5f8ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <path
                  d="M8 1C4.7 1 2 3.7 2 7c0 5 6 12 6 12s6-7 6-12c0-3.3-2.7-6-6-6z"
                  fill="#2B8FFF"
                  opacity="0.75"
                />
                <circle cx="8" cy="7" r="2" fill="#fff" />
              </svg>
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {s.display_name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FAVOURITES PANEL
═══════════════════════════════════════════════════════════════ */
function FavouritesPanel({ onNavigate, onClose }) {
  return (
    <div
      style={{
        position: "absolute",
        right: "20px",
        top: "130px",
        width: "590px",
        background: "#fff",
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        zIndex: 20,
        overflow: "hidden",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        style={{
          padding: "16px 20px 12px",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "18px", fontWeight: 700, color: "#1E1E1E" }}>
          ⚡ Favourite Charging Stations
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            color: "#999",
            outline: "none",
          }}
        >
          ✕
        </button>
      </div>
      {FAV_STATIONS.map((s) => (
        <div
          key={s.id}
          onClick={() => {
            onNavigate(s);
          }}
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid #f5f5f5",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f8faff")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#EEF5FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ChargingBolt />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{ fontSize: "16px", fontWeight: 600, color: "#1E1E1E" }}
            >
              {s.name}
            </div>
            <div style={{ fontSize: "13px", color: "#888", marginTop: "2px" }}>
              {s.address}
            </div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div
              style={{ fontSize: "15px", fontWeight: 600, color: "#2B8FFF" }}
            >
              {s.dist}
            </div>
            <div style={{ fontSize: "12px", color: "#aaa" }}>{s.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPASS BUTTON
═══════════════════════════════════════════════════════════════ */
function CompassButton({ bearing, northLocked, onClick }) {
  return (
    <button
      onClick={onClick}
      title={
        northLocked
          ? "Compass active (click to unlock)"
          : "Click to orient north"
      }
      style={{
        width: "104px",
        height: "104px",
        background: "#fff",
        borderRadius: "50%",
        boxShadow: northLocked
          ? "0 0 0 3px #2B8FFF, 0 0 16px rgba(43,143,255,0.3)"
          : "0px 0px 10px rgba(0,0,0,0.25)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        outline: "none",
        transition: "box-shadow 0.25s, transform 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Rotating needle assembly */}
      <div
        style={{
          position: "absolute",
          width: "26px",
          height: "76px",
          top: "14px",
          left: "calc(50% - 13px)",
          transform: `rotate(${bearing}deg)`,
          transformOrigin: "13px 38px",
          transition: "transform 0.4s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Red north tip */}
        <div
          style={{
            width: "0",
            height: "0",
            borderLeft: "13px solid transparent",
            borderRight: "13px solid transparent",
            borderBottom: "38px solid #FF0000",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
          }}
        />
        {/* White south tip */}
        <div
          style={{
            width: "0",
            height: "0",
            borderLeft: "13px solid transparent",
            borderRight: "13px solid transparent",
            borderTop: "38px solid #ccc",
          }}
        />
      </div>
      {/* N label */}
      <span
        style={{
          position: "absolute",
          top: "12px",
          fontSize: "13px",
          fontWeight: 700,
          color: "#FF0000",
          letterSpacing: "-0.5px",
          zIndex: 2,
        }}
      >
        N
      </span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LIVE MAP  (Leaflet)
═══════════════════════════════════════════════════════════════ */
function LiveMap({ searchTarget, mapRef: extRef, isNavigating }) {
  const containerRef = useRef(null);
  const internalMapRef = useRef(null);
  const markerRef = useRef(null);
  const routeLayerRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Load Leaflet
  useEffect(() => {
    if (!document.getElementById("leaflet-css")) {
      const l = document.createElement("link");
      l.id = "leaflet-css";
      l.rel = "stylesheet";
      l.href = LEAFLET_CSS;
      document.head.appendChild(l);
    }
    if (window.L) {
      setReady(true);
      return;
    }
    const s = document.createElement("script");
    s.src = LEAFLET_JS;
    s.onload = () => setReady(true);
    document.head.appendChild(s);
  }, []);

  // Init map
  useEffect(() => {
    if (!ready || !containerRef.current || internalMapRef.current) return;
    const L = window.L;
    const map = L.map(containerRef.current, {
      center: [1.5533, 110.3592],
      zoom: 15,
      zoomControl: false,
      attributionControl: true,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
      maxZoom: 19,
    }).addTo(map);
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Navigation arrow marker
    const arrowIcon = L.divIcon({
      html: `<div style="width:0;height:0;border-left:14px solid transparent;border-right:14px solid transparent;border-bottom:36px solid #0078FF;filter:drop-shadow(0 0 8px #0078FF);"></div>`,
      iconSize: [28, 36],
      iconAnchor: [14, 18],
      className: "",
    });
    markerRef.current = L.marker([1.5533, 110.3592], { icon: arrowIcon }).addTo(
      map,
    );

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) => {
          map.setView([lat, lng], 16);
          markerRef.current.setLatLng([lat, lng]);
        },
        () => {},
      );
    }
    internalMapRef.current = map;
    if (extRef) extRef.current = map;
  }, [ready]);

  // Draw / remove route
  useEffect(() => {
    if (!internalMapRef.current || !searchTarget) return;
    const L = window.L;
    const { lat, lng, name } = searchTarget;

    if (routeLayerRef.current) {
      internalMapRef.current.removeLayer(routeLayerRef.current);
      routeLayerRef.current = null;
    }

    if (isNavigating) {
      const start = markerRef.current?.getLatLng() || {
        lat: 1.5533,
        lng: 110.3592,
      };
      const mid1Lat = (start.lat * 2 + lat) / 3 + 0.004;
      const mid1Lng = (start.lng * 2 + lng) / 3 - 0.003;
      const mid2Lat = (start.lat + lat * 2) / 3 - 0.002;
      const mid2Lng = (start.lng + lng * 2) / 3 + 0.002;
      const route = L.polyline(
        [
          [start.lat, start.lng],
          [mid1Lat, mid1Lng],
          [mid2Lat, mid2Lng],
          [lat, lng],
        ],
        {
          color: "#2B8FFF",
          weight: 9,
          opacity: 0.88,
          lineJoin: "round",
          lineCap: "round",
        },
      ).addTo(internalMapRef.current);
      routeLayerRef.current = route;
      internalMapRef.current.fitBounds(route.getBounds(), {
        padding: [90, 90],
        animate: true,
      });
    } else {
      internalMapRef.current.setView([lat, lng], 15, { animate: true });
      markerRef.current?.setLatLng([lat, lng]);
      L.popup()
        .setLatLng([lat, lng])
        .setContent(
          `<b style="font-size:14px;font-family:sans-serif">${name.split(",").slice(0, 2).join(",")}</b>`,
        )
        .openOn(internalMapRef.current);
    }
  }, [searchTarget, isNavigating]);

  // Remove route on cancel
  useEffect(() => {
    if (!isNavigating && routeLayerRef.current && internalMapRef.current) {
      internalMapRef.current.removeLayer(routeLayerRef.current);
      routeLayerRef.current = null;
    }
  }, [isNavigating]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        left: "-126px",
        top: "0",
        width: "1531px",
        height: "817px",
        zIndex: 0,
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION BOTTOM BAR
═══════════════════════════════════════════════════════════════ */
function NavBottomBar({ destination, eta, distance, onCancel }) {
  const arrivalTime = new Date(
    Date.now() + parseInt(eta) * 60000,
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      style={{
        position: "absolute",
        left: "0",
        bottom: "146px",
        width: "100%",
        zIndex: 12,
        animation: "slideUp 0.35s ease",
      }}
    >
      <div
        style={{
          margin: "0 56px",
          background: "rgba(255,255,255,0.97)",
          borderRadius: "20px 20px 0 0",
          boxShadow: "0 -4px 28px rgba(0,0,0,0.13)",
          padding: "18px 28px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Cancel ⊗ */}
        <button
          onClick={onCancel}
          title="Cancel navigation"
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            border: "2.5px solid #333",
            background: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            outline: "none",
            transition: "background 0.18s, transform 0.14s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f5f5f5";
            e.currentTarget.style.transform = "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <svg width="60" height="60" viewBox="0 0 22 22" fill="none">
            <path
              d="M7 7l8 8M15 7l-8 8"
              stroke="#333"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* ETA */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#2B8FFF",
              lineHeight: 1,
            }}
          >
            {eta}
          </div>
          <div style={{ fontSize: "15px", color: "#666", marginTop: "4px" }}>
            {distance}&nbsp;&nbsp;|&nbsp;&nbsp;{arrivalTime}
          </div>
        </div>

        {/* Destination */}
        <div style={{ textAlign: "right", maxWidth: "320px" }}>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "#1E1E1E",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {destination}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN  NavPage
═══════════════════════════════════════════════════════════════ */
export default function NavPage({ navActive, setNavActive }) {
  const [speed, setSpeed] = useState(80);
  const [battery] = useState(78);
  const [activeNav, setActiveNav] = useState(2);
  const [searchTarget, setSearchTarget] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState("");
  const [showFavs, setShowFavs] = useState(false);
  const [compassBearing, setCompassBearing] = useState(0);
  const [northLocked, setNorthLocked] = useState(false);
  const [turnInstruction, setTurnInstruction] = useState(null);
  const [voiceOn, setVoiceOn] = useState(true);
  const mapRef = useRef(null);

  /* Speed drift */
  useEffect(() => {
    const id = setInterval(
      () =>
        setSpeed((s) =>
          Math.max(0, Math.min(130, Math.round(s + (Math.random() - 0.5) * 8))),
        ),
      2000,
    );
    return () => clearInterval(id);
  }, []);

  /* Compass drift while navigating */
  useEffect(() => {
    if (!isNavigating || northLocked) return;
    const id = setInterval(
      () => setCompassBearing((b) => (b + 0.4) % 360),
      150,
    );
    return () => clearInterval(id);
  }, [isNavigating, northLocked]);

  /* Speak turn instruction via TTS — respects voiceOn */
  const speakInstruction = useCallback((instruction, on = true) => {
    if (!on || !instruction || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(
      `In ${instruction.dist}, ${instruction.text}`,
    );
    utt.lang = "en-MY";
    utt.rate = 0.95;
    window.speechSynthesis.speak(utt);
  }, []);

  /* Start navigation */
  const startNavigation = useCallback(
    (target) => {
      setSearchTarget(target);
      setIsNavigating(true);
      setShowFavs(false);
      const first = { dist: "750m", text: "Turn Right" };
      setTurnInstruction(first);
      speakInstruction(first, voiceOn);
      setTimeout(() => {
        const i = { dist: "1.2 km", text: "Keep Left" };
        setTurnInstruction(i);
        speakInstruction(i, voiceOn);
      }, 8000);
      setTimeout(() => {
        const i = { dist: "300m", text: "Turn Left" };
        setTurnInstruction(i);
        speakInstruction(i, voiceOn);
      }, 16000);
    },
    [voiceOn, speakInstruction],
  );

  /* Cancel navigation */
  const cancelNavigation = () => {
    setIsNavigating(false);
    setTurnInstruction(null);
    if (mapRef.current) {
      navigator.geolocation?.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) =>
          mapRef.current.setView([lat, lng], 15, { animate: true }),
        () => mapRef.current.setView([1.5533, 110.3592], 15, { animate: true }),
      );
    }
  };

  /* Compass click: reset north / toggle lock */
  const handleCompassClick = () => {
    const locked = !northLocked;
    setNorthLocked(locked);
    setCompassBearing(0);
    if (mapRef.current?.setBearing) mapRef.current.setBearing(0);
  };

  /* Toggle voice on/off */
  const handleToggleVoice = () => {
    const next = !voiceOn;
    setVoiceOn(next);
    if (!next) {
      window.speechSynthesis?.cancel();
    } else if (turnInstruction) {
      speakInstruction(turnInstruction, true);
    }
  };

  /* Locate me */
  const handleLocateMe = () => {
    setLocateError("");
    if (!navigator.geolocation) {
      setLocateError("Geolocation not supported.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        setLocating(false);
        if (mapRef.current) {
          mapRef.current.setView([lat, lng], 17, { animate: true });
          window.L?.popup()
            .setLatLng([lat, lng])
            .setContent("<b>📍 You are here</b>")
            .openOn(mapRef.current);
        }
      },
      (err) => {
        setLocating(false);
        setLocateError(
          err.code === 1
            ? "Location access denied. Enable it in browser settings."
            : "Unable to get your location.",
        );
        setTimeout(() => setLocateError(""), 5000);
      },
      { timeout: 10000, enableHighAccuracy: true },
    );
  };

  const navItems = [
    { Icon: NavDashboard, label: "Dashboard" },
    { Icon: NavFuel, label: "Fuel" },
    { Icon: NavLocation, label: "Location" },
    { Icon: NavWeather, label: "Weather" },
    { Icon: NavEmergency, label: "Emergency" },
    { Icon: NavSettings, label: "Settings" },
  ];

  const navEta = "18 min";
  const navDist = "34 km";

  return (
    <div
      style={{
        position: "relative",
        width: "1280px",
        height: "800px",
        background: "#fff",
        fontFamily: "'Inter',sans-serif",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* ── MAP ── */}
      <LiveMap
        searchTarget={searchTarget}
        mapRef={mapRef}
        isNavigating={isNavigating}
      />

      {/* ══ TOP-LEFT: Info card + Speedometer ══ */}
      <InfoCard distanceKm={217} batteryPct={battery} />
      <Speedometer speed={speed} />

      {/* ══ TOP-RIGHT row: ♥ Favourite  |  Search bar  |  Navigate btn ══ */}
      {!isNavigating && (
        <div
          style={{
            position: "absolute",
            right: "20px",
            top: "17px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
            zIndex: 15,
          }}
        >
          {/* Favourite heart button */}
          <button
            onClick={() => setShowFavs((v) => !v)}
            title="Favourite charging stations"
            style={{
              width: "65px",
              height: "65px",
              background: "#fff",
              border: "none",
              borderRadius: "50%",
              boxShadow: showFavs
                ? "0 0 0 3px #FF0000, 0 4px 16px rgba(0,0,0,0.15)"
                : "0px 0px 10px rgba(0,0,0,0.25)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "box-shadow 0.2s, transform 0.15s",
              outline: "none",
              flexShrink: 0,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.08)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <HeartIcon filled={showFavs} />
          </button>

          {/* Search bar inline */}
          <SearchBar onSearch={startNavigation} hidden={false} />

          {/* Navigate (paper-plane) button */}
          <button
            onClick={() => {
              if (searchTarget) {
                startNavigation(searchTarget);
              } else {
                alert(
                  "Search or select a destination first, then press Navigate.",
                );
              }
            }}
            title="Start navigation"
            style={{
              width: "100px",
              height: "100px",
              background: "#2B8FFF",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 4px 20px rgba(43,143,255,0.55)",
              outline: "none",
              flexShrink: 0,
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.07)";
              e.currentTarget.style.boxShadow =
                "0 8px 28px rgba(43,143,255,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0px 4px 20px rgba(43,143,255,0.55)";
            }}
          >
            <PaperPlaneIcon />
          </button>
        </div>
      )}

      {/* ══ TURN CARD (navigation mode, top-right) ══ */}
      {isNavigating && (
        <TurnCard
          instruction={turnInstruction}
          voiceOn={voiceOn}
          onToggleVoice={handleToggleVoice}
        />
      )}

      {/* ══ FAVOURITES PANEL ══ */}
      {showFavs && (
        <FavouritesPanel
          onNavigate={(s) =>
            startNavigation({ lat: s.lat, lng: s.lng, name: s.name })
          }
          onClose={() => setShowFavs(false)}
        />
      )}

      {/* ══ SIDE BUTTONS: Compass + Locate Me — fixed from bottom so NavBottomBar never pushes them ══ */}
      <div
        style={{
          position: "absolute",
          right: "20px",
          bottom: "420px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          zIndex: 13,
        }}
      >
        <CompassButton
          bearing={compassBearing}
          northLocked={northLocked}
          onClick={handleCompassClick}
        />

        <button
          onClick={handleLocateMe}
          title="Locate me"
          style={{
            width: "104px",
            height: "104px",
            background: "#fff",
            border: "none",
            borderRadius: "50%",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.25)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none",
            transition: "transform 0.15s, box-shadow 0.15s",
            animation: locating
              ? "locatePulse 1s ease-in-out infinite"
              : "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.06)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(43,143,255,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.25)";
          }}
        >
          {locating ? (
            <div
              style={{
                width: "36px",
                height: "36px",
                border: "4px solid #eee",
                borderTop: "4px solid #2B8FFF",
                borderRadius: "50%",
                animation: "spin 0.7s linear infinite",
              }}
            />
          ) : (
            <LocateIcon active />
          )}
        </button>
      </div>

      {/* ══ NAVIGATION BOTTOM BAR ══ */}
      {isNavigating && (
        <NavBottomBar
          destination={
            searchTarget?.name?.split(",").slice(0, 2).join(",") ||
            "Destination"
          }
          eta={navEta}
          distance={navDist}
          onCancel={cancelNavigation}
        />
      )}

      {/* Locate error toast */}
      {locateError && (
        <div
          style={{
            position: "absolute",
            bottom: "238px",
            right: "32px",
            background: "#fff3f3",
            border: "1px solid #ffaaaa",
            borderRadius: "12px",
            padding: "12px 18px",
            fontSize: "14px",
            color: "#cc0000",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            zIndex: 15,
            maxWidth: "300px",
          }}
        >
          {locateError}
        </div>
      )}
      <BottomNav active={navActive} setActive={setNavActive} />

      <style>{`
        @keyframes spin        { to { transform:rotate(360deg); } }
        @keyframes pulseRing   { 0%{transform:scale(1);opacity:.5;} 100%{transform:scale(2);opacity:0;} }
        @keyframes slideUp     { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
        @keyframes fadeIn      { from{opacity:0;}to{opacity:1;} }
        @keyframes locatePulse { 0%,100%{box-shadow:0 0 0 0 rgba(43,143,255,0.35);}50%{box-shadow:0 0 0 10px rgba(43,143,255,0);} }
        .leaflet-control-attribution { font-size:10px !important; }
        .leaflet-control-zoom        { margin-right:140px !important; margin-bottom:200px !important; }
        .leaflet-control-zoom a      { width:36px !important; height:36px !important; line-height:36px !important; font-size:18px !important; }
      `}</style>
    </div>
  );
}
