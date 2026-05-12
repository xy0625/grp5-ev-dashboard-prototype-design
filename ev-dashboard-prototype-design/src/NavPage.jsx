import { useState, useEffect, useRef, useCallback } from "react";

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

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

const IcoDash = ({ a }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect
      x="2"
      y="2"
      width="8"
      height="8"
      rx="1.5"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="2"
    />
    <rect
      x="14"
      y="2"
      width="8"
      height="8"
      rx="1.5"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="2"
    />
    <rect
      x="2"
      y="14"
      width="8"
      height="8"
      rx="1.5"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="2"
    />
    <rect
      x="14"
      y="14"
      width="8"
      height="8"
      rx="1.5"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="2"
    />
  </svg>
);
const IcoCharge = ({ a }) => (
  <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
    <rect
      x="2"
      y="3"
      width="13"
      height="17"
      rx="2"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="2"
    />
    <path
      d="M15 8h2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="5"
      y1="20"
      x2="12"
      y2="20"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="5"
      y1="20"
      x2="5"
      y2="24"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="12"
      y1="20"
      x2="12"
      y2="24"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const IcoNavTab = ({ a }) => (
  <svg width="20" height="26" viewBox="0 0 20 26" fill="none">
    <path
      d="M10 2C6 2 2 5.7 2 10.5c0 6.8 8 15.5 8 15.5s8-8.7 8-15.5C18 5.7 14 2 10 2z"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="2"
      fill={a ? "rgba(255,255,255,.2)" : "none"}
    />
    <circle
      cx="10"
      cy="10.5"
      r="3"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="2"
    />
  </svg>
);
const IcoWeather = ({ a }) => (
  <svg width="26" height="24" viewBox="0 0 26 24" fill="none">
    <circle
      cx="13"
      cy="8"
      r="4.5"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="2"
    />
    <path
      d="M6 16a5 5 0 0 1 5-5h3a5 5 0 0 1 5 5"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect
      x="2"
      y="16"
      width="22"
      height="6"
      rx="3"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="2"
    />
  </svg>
);
const IcoEmg = ({ a }) => (
  <svg width="24" height="26" viewBox="0 0 24 26" fill="none">
    <circle
      cx="12"
      cy="9"
      r="4.5"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="2"
    />
    <path
      d="M2 25c0-5.5 4.5-10 10-10s10 4.5 10 10"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const IcoSettings = ({ a }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="12"
      r="4"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="2"
    />
    <path
      d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"
      stroke={a ? "#fff" : "#6B7280"}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const IcoMic = ({ on }) => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
    <rect
      x="5"
      y="1"
      width="8"
      height="11"
      rx="4"
      fill={on ? "#3B82F6" : "none"}
      stroke={on ? "#3B82F6" : "#9CA3AF"}
      strokeWidth="1.8"
    />
    <path
      d="M2 9a7 7 0 0 0 14 0"
      stroke={on ? "#3B82F6" : "#9CA3AF"}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <line
      x1="9"
      y1="16"
      x2="9"
      y2="19"
      stroke={on ? "#3B82F6" : "#9CA3AF"}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <line
      x1="5"
      y1="19"
      x2="13"
      y2="19"
      stroke={on ? "#3B82F6" : "#9CA3AF"}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);
const IcoHeart = ({ f }) => (
  <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
    <path
      d="M10 16S1 10.5 1 5.5a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1C19 10.5 10 16 10 16z"
      fill={f ? "#EF4444" : "none"}
      stroke="#EF4444"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);
const IcoSpeakOn = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 6H6L10 2V16L6 12H2V6Z" fill="#3B82F6" />
    <path
      d="M12 5c1 1 1.7 2.4 1.7 4S13 12 12 13"
      stroke="#3B82F6"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M14 3c2 1.7 3 3.8 3 6s-1 4.3-3 6"
      stroke="#3B82F6"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);
const IcoSpeakOff = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 6H6L10 2V16L6 12H2V6Z" fill="#9CA3AF" />
    <line
      x1="12"
      y1="5"
      x2="18"
      y2="13"
      stroke="#9CA3AF"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <line
      x1="18"
      y1="5"
      x2="12"
      y2="13"
      stroke="#9CA3AF"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);
const IcoBolt = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M7.5 1L2 7.5H6.5L5.5 12L11 5.5H6.5L7.5 1Z" fill="#3B82F6" />
  </svg>
);
const IcoX = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 2l10 10M12 2L2 12"
      stroke="#374151"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const IcoSearch = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="6.5" cy="6.5" r="5" stroke="#9CA3AF" strokeWidth="1.8" />
    <path
      d="M11 11l3 3"
      stroke="#9CA3AF"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);
const IcoArrowR = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
    <path
      d="M6 26V14C6 10 10 6 17 6H26M26 6L19 1M26 6L19 11"
      stroke="#1D4ED8"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function LiveMap({ searchTarget, mapRef: extRef, isNavigating }) {
  const containerRef = useRef(null);
  const internalMapRef = useRef(null);
  const markerRef = useRef(null);
  const routeLayerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!document.getElementById("lf-css")) {
      const l = document.createElement("link");
      l.id = "lf-css";
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
    const icon = L.divIcon({
      html: `<div style="width:0;height:0;border-left:11px solid transparent;border-right:11px solid transparent;border-bottom:30px solid #2563EB;filter:drop-shadow(0 0 5px #93C5FD)"></div>`,
      iconSize: [22, 30],
      iconAnchor: [11, 15],
      className: "",
    });
    markerRef.current = L.marker([1.5533, 110.3592], { icon }).addTo(map);
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

  useEffect(() => {
    if (!internalMapRef.current || !searchTarget) return;
    const L = window.L;
    const { lat, lng, name } = searchTarget;
    if (routeLayerRef.current) {
      internalMapRef.current.removeLayer(routeLayerRef.current);
      routeLayerRef.current = null;
    }
    if (isNavigating) {
      const s = markerRef.current?.getLatLng() || {
        lat: 1.5533,
        lng: 110.3592,
      };
      const route = L.polyline(
        [
          [s.lat, s.lng],
          [(s.lat * 2 + lat) / 3 + 0.004, (s.lng * 2 + lng) / 3 - 0.003],
          [(s.lat + lat * 2) / 3 - 0.002, (s.lng + lng * 2) / 3 + 0.002],
          [lat, lng],
        ],
        {
          color: "#3B82F6",
          weight: 7,
          opacity: 0.9,
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
          `<b style="font-size:13px;font-family:sans-serif">${name.split(",").slice(0, 2).join(",")}</b>`,
        )
        .openOn(internalMapRef.current);
    }
  }, [searchTarget, isNavigating]);

  useEffect(() => {
    if (!isNavigating && routeLayerRef.current && internalMapRef.current) {
      internalMapRef.current.removeLayer(routeLayerRef.current);
      routeLayerRef.current = null;
    }
  }, [isNavigating]);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    />
  );
}

function SearchBar({ onSearch }) {
  const [query, setSugg0] = useState("");
  const [suggestions, setSug] = useState([]);
  const [loading, setLoad] = useState(false);
  const [listening, setLis] = useState(false);
  const [micErr, setMicErr] = useState("");
  const debRef = useRef(null);
  const recRef = useRef(null);

  const fetchSug = useCallback(async (q) => {
    if (q.trim().length < 2) {
      setSug([]);
      return;
    }
    setLoad(true);
    try {
      const r = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5&countrycodes=my`,
        { headers: { "Accept-Language": "en" } },
      );
      setSug(await r.json());
    } catch {
      setSug([]);
    }
    setLoad(false);
  }, []);

  const handleChange = (e) => {
    const v = e.target.value;
    setSugg0(v);
    clearTimeout(debRef.current);
    debRef.current = setTimeout(() => fetchSug(v), 350);
  };
  const pick = (item) => {
    setSugg0(item.display_name.split(",")[0]);
    setSug([]);
    onSearch({
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      name: item.display_name,
    });
  };
  const handleKey = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) pick(suggestions[0]);
    if (e.key === "Escape") setSug([]);
  };
  const handleMic = () => {
    setMicErr("");
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setMicErr("Voice not supported");
      setTimeout(() => setMicErr(""), 3000);
      return;
    }
    if (listening && recRef.current) {
      recRef.current.stop();
      setLis(false);
      return;
    }
    const r = new SR();
    r.lang = "en-MY";
    r.interimResults = true;
    recRef.current = r;
    r.onstart = () => setLis(true);
    r.onresult = (ev) => {
      const t = Array.from(ev.results)
        .map((x) => x[0].transcript)
        .join("");
      setSugg0(t);
      if (ev.results[ev.results.length - 1].isFinal) {
        clearTimeout(debRef.current);
        fetchSug(t);
      }
    };
    r.onerror = (ev) => {
      setLis(false);
      setMicErr(ev.error === "not-allowed" ? "Mic denied" : ev.error);
      setTimeout(() => setMicErr(""), 4000);
    };
    r.onend = () => setLis(false);
    r.start();
  };

  return (
    <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,.97)",
          borderRadius: 14,
          padding: "0 14px",
          height: 52,
          boxShadow: listening
            ? "0 0 0 2px #3B82F6,0 4px 20px rgba(59,130,246,.18)"
            : "0 2px 14px rgba(0,0,0,.13)",
          border: `1.5px solid ${listening ? "#3B82F6" : "rgba(0,0,0,.06)"}`,
          transition: "all .25s",
        }}
      >
        <IcoSearch />
        <input
          value={query}
          onChange={handleChange}
          onKeyDown={handleKey}
          placeholder={listening ? "Listening…" : "Search destination"}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            fontSize: 15,
            color: listening ? "#3B82F6" : "#374151",
            fontFamily: "system-ui,sans-serif",
          }}
        />
        {loading && (
          <div
            style={{
              width: 15,
              height: 15,
              border: "2px solid #E5E7EB",
              borderTop: "2px solid #3B82F6",
              borderRadius: "50%",
              animation: "spin .7s linear infinite",
              flexShrink: 0,
            }}
          />
        )}
        <button
          onClick={handleMic}
          style={{
            background: listening ? "rgba(59,130,246,.1)" : "transparent",
            border: `1.5px solid ${listening ? "#3B82F6" : "transparent"}`,
            borderRadius: "50%",
            cursor: "pointer",
            padding: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            outline: "none",
            flexShrink: 0,
          }}
        >
          <IcoMic on={listening} />
        </button>
      </div>
      {micErr && (
        <div
          style={{
            position: "absolute",
            top: 58,
            left: 0,
            zIndex: 25,
            background: "#FEF2F2",
            border: "1px solid #FCA5A5",
            borderRadius: 10,
            padding: "8px 14px",
            fontSize: 13,
            color: "#B91C1C",
            whiteSpace: "nowrap",
          }}
        >
          {micErr}
        </div>
      )}
      {suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: 58,
            left: 0,
            right: 0,
            zIndex: 20,
            background: "rgba(255,255,255,.98)",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,.14)",
            overflow: "hidden",
          }}
        >
          {suggestions.map((s, i) => (
            <div
              key={s.place_id}
              onClick={() => pick(s)}
              style={{
                padding: "11px 14px",
                fontSize: 13,
                color: "#111827",
                cursor: "pointer",
                borderBottom:
                  i < suggestions.length - 1 ? "1px solid #F3F4F6" : "none",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#EFF6FF")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <svg
                width="10"
                height="14"
                viewBox="0 0 10 14"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M5 1C2.8 1 1 3 1 5.5c0 3.7 4 8.5 4 8.5s4-4.8 4-8.5C9 3 7.2 1 5 1z"
                  fill="#3B82F6"
                  opacity=".7"
                />
                <circle cx="5" cy="5.5" r="1.2" fill="#fff" />
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

function SpeedGauge({ speed }) {
  const pct = Math.min(speed / 140, 1);
  const R = 38,
    cx = 52,
    cy = 55;
  const toRad = (a) => (a * Math.PI) / 180;
  const pt = (a) => ({
    x: cx + R * Math.cos(toRad(a)),
    y: cy + R * Math.sin(toRad(a)),
  });
  const arc = (start, sweep) => {
    const e = start + sweep,
      large = Math.abs(sweep) > 180 ? 1 : 0,
      s = pt(start),
      en = pt(e);
    return `M${s.x.toFixed(2)} ${s.y.toFixed(2)} A${R} ${R} 0 ${large} 1 ${en.x.toFixed(2)} ${en.y.toFixed(2)}`;
  };
  const startA = -215,
    sweepA = 250;
  const color = speed > 100 ? "#EF4444" : speed > 80 ? "#F97316" : "#3B82F6";
  return (
    <div
      style={{
        background: "rgba(255,255,255,.97)",
        borderRadius: 18,
        padding: "14px 10px 10px",
        boxShadow: "0 2px 14px rgba(0,0,0,.12)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 106,
        flexShrink: 0,
      }}
    >
      <svg width="104" height="76" viewBox="0 0 104 76">
        <path
          d={arc(startA, sweepA)}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {pct > 0 && (
          <path
            d={arc(startA, sweepA * pct)}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            style={{ transition: "all .4s ease" }}
          />
        )}
        <text
          x="52"
          y="58"
          textAnchor="middle"
          fontSize="28"
          fontWeight="700"
          fill={color}
          style={{ transition: "fill .3s", fontFamily: "system-ui" }}
        >
          {speed}
        </text>
        <text
          x="52"
          y="70"
          textAnchor="middle"
          fontSize="9"
          fill="#9CA3AF"
          style={{ fontFamily: "system-ui" }}
        >
          km/h
        </text>
      </svg>
      <div
        style={{
          fontSize: 10,
          color: "#9CA3AF",
          fontWeight: 600,
          letterSpacing: 1,
          marginTop: 2,
        }}
      >
        SPEED
      </div>
    </div>
  );
}

function BatteryCard({ rangeKm, pct }) {
  const color = pct > 50 ? "#22C55E" : pct > 20 ? "#F97316" : "#EF4444";
  return (
    <div
      style={{
        background: "rgba(255,255,255,.97)",
        borderRadius: 18,
        padding: "14px 16px",
        boxShadow: "0 2px 14px rgba(0,0,0,.12)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 10,
        width: 148,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1,
          }}
        >
          {rangeKm}
        </span>
        <span style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 500 }}>
          km
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            flex: 1,
            height: 7,
            background: "#F3F4F6",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: color,
              borderRadius: 4,
              transition: "width .5s",
            }}
          />
        </div>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color,
            minWidth: 34,
            textAlign: "right",
          }}
        >
          {pct}%
        </span>
      </div>
      <div
        style={{
          fontSize: 10,
          color: "#9CA3AF",
          fontWeight: 600,
          letterSpacing: 1,
        }}
      >
        RANGE · BATTERY
      </div>
    </div>
  );
}

function Compass({ bearing, locked, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: "rgba(255,255,255,.97)",
        border: locked ? "2px solid #3B82F6" : "1.5px solid rgba(0,0,0,.08)",
        boxShadow: locked
          ? "0 0 0 3px rgba(59,130,246,.2),0 2px 12px rgba(0,0,0,.12)"
          : "0 2px 12px rgba(0,0,0,.12)",
        cursor: "pointer",
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all .25s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      title={locked ? "Unlock" : "Lock north"}
    >
      <svg width="30" height="30" viewBox="0 0 30 30">
        <g
          transform={`rotate(${bearing},15,15)`}
          style={{ transition: "transform .4s ease" }}
        >
          <polygon points="15,3 18.5,15 15,13 11.5,15" fill="#EF4444" />
          <polygon points="15,27 18.5,15 15,17 11.5,15" fill="#D1D5DB" />
        </g>
        <circle cx="15" cy="15" r="2" fill="#374151" />
      </svg>
    </button>
  );
}

function LocateBtn({ loading, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 52,
        height: 52,
        borderRadius: "50%",
        background: "rgba(255,255,255,.97)",
        border: "1.5px solid rgba(0,0,0,.08)",
        boxShadow: "0 2px 12px rgba(0,0,0,.12)",
        cursor: "pointer",
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all .25s",
        animation: loading ? "locPulse 1s ease infinite" : "none",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      title="Locate me"
    >
      {loading ? (
        <div
          style={{
            width: 18,
            height: 18,
            border: "2.5px solid #E5E7EB",
            borderTop: "2.5px solid #3B82F6",
            borderRadius: "50%",
            animation: "spin .7s linear infinite",
          }}
        />
      ) : (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="5.5" stroke="#3B82F6" strokeWidth="2" />
          <circle cx="11" cy="11" r="1.8" fill="#3B82F6" />
          <line
            x1="11"
            y1="1"
            x2="11"
            y2="5"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="11"
            y1="17"
            x2="11"
            y2="21"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="1"
            y1="11"
            x2="5"
            y2="11"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="17"
            y1="11"
            x2="21"
            y2="11"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

function TurnBanner({ inst, voiceOn, onToggleVoice }) {
  if (!inst) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 14,
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(255,255,255,.97)",
        borderRadius: 16,
        padding: "12px 16px 12px 12px",
        boxShadow: "0 4px 24px rgba(0,0,0,.14)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        zIndex: 12,
        minWidth: 300,
        animation: "slideDown .3s ease",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "#EFF6FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <IcoArrowR />
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#1D4ED8",
            lineHeight: 1,
          }}
        >
          {inst.dist}
        </div>
        <div style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>
          {inst.text}
        </div>
      </div>
      <button
        onClick={onToggleVoice}
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: `1.5px solid ${voiceOn ? "#3B82F6" : "#E5E7EB"}`,
          background: voiceOn ? "rgba(59,130,246,.08)" : "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          outline: "none",
          flexShrink: 0,
          transition: "all .2s",
        }}
      >
        {voiceOn ? <IcoSpeakOn /> : <IcoSpeakOff />}
      </button>
    </div>
  );
}

function NavBar({ dest, eta, dist, onCancel }) {
  const arr = new Date(Date.now() + parseInt(eta) * 60000).toLocaleTimeString(
    [],
    { hour: "2-digit", minute: "2-digit" },
  );
  return (
    <div
      style={{
        position: "absolute",
        bottom: 150,
        left: 12,
        right: 12,
        zIndex: 12,
        background: "rgba(255,255,255,.97)",
        borderRadius: 18,
        boxShadow: "0 -2px 20px rgba(0,0,0,.1)",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        animation: "slideUp .35s ease",
      }}
    >
      <button
        onClick={onCancel}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid #E5E7EB",
          background: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          outline: "none",
          transition: "all .2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#FEE2E2";
          e.currentTarget.style.borderColor = "#FECACA";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#fff";
          e.currentTarget.style.borderColor = "#E5E7EB";
        }}
      >
        <IcoX />
      </button>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#2563EB",
            lineHeight: 1,
          }}
        >
          {eta}
        </div>
        <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 3 }}>
          {dist} · Arrives {arr}
        </div>
      </div>
      <div style={{ textAlign: "right", maxWidth: 220 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#111827",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {dest}
        </div>
        <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
          Navigating
        </div>
      </div>
    </div>
  );
}

function FavModal({ onNavigate, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        background: "rgba(0,0,0,.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn .2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 22,
          width: "min(460px, 90%)",
          boxShadow: "0 20px 60px rgba(0,0,0,.22)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 18px 12px",
            borderBottom: "1px solid #F3F4F6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
                background: "#EFF6FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IcoBolt />
            </div>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>
              Favourite Stations
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#F9FAFB",
              border: "none",
              cursor: "pointer",
              borderRadius: "50%",
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              outline: "none",
            }}
          >
            <IcoX />
          </button>
        </div>
        {FAV_STATIONS.map((s, i) => (
          <div
            key={s.id}
            onClick={() => onNavigate(s)}
            style={{
              padding: "13px 18px",
              borderBottom:
                i < FAV_STATIONS.length - 1 ? "1px solid #F9FAFB" : "none",
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
              transition: "background .15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F0F9FF")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "#EFF6FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <IcoBolt />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>
                {s.name}
              </div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
                {s.address}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#3B82F6" }}>
                {s.dist}
              </div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>{s.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  { Icon: IcoDash, label: "Dashboard" },
  { Icon: IcoCharge, label: "Charge" },
  { Icon: IcoNavTab, label: "Navigate" },
  { Icon: IcoWeather, label: "Weather" },
  { Icon: IcoEmg, label: "Emergency" },
  { Icon: IcoSettings, label: "Settings" },
];

function BottomTabBar({ active, setActive }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 1148,
        height: 108,
        left: "calc(50% - 574px)",
        top: 662,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,0,0,0.06)",
        borderRadius: 35,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 20px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
        zIndex: 10,
      }}
    >
      {TABS.map(({ Icon, label }, i) => (
        <button
          key={i}
          onClick={() => setActive(i)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            padding: "8px 12px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            background: active === i ? "#2563EB" : "transparent",
            transition: "all .2s",
            outline: "none",
            minWidth: 62,
          }}
          onMouseEnter={(e) => {
            if (active !== i) e.currentTarget.style.background = "#F3F4F6";
          }}
          onMouseLeave={(e) => {
            if (active !== i) e.currentTarget.style.background = "transparent";
          }}
        >
          <Icon a={active === i} />
          <span
            style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: 0.4,
              color: active === i ? "#fff" : "#9CA3AF",
            }}
          >
            {label.toUpperCase()}
          </span>
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(2);
  const [speed, setSpeed] = useState(62);
  const [battery] = useState(78);
  const [searchTarget, setSearchTarget] = useState(null);
  const [isNav, setIsNav] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locErr, setLocErr] = useState("");
  const [showFavs, setShowFavs] = useState(false);
  const [bearing, setBearing] = useState(0);
  const [northLocked, setNorthLocked] = useState(false);
  const [turnInst, setTurnInst] = useState(null);
  const [voiceOn, setVoiceOn] = useState(true);
  const mapRef = useRef(null);

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

  useEffect(() => {
    if (!isNav || northLocked) return;
    const id = setInterval(() => setBearing((b) => (b + 0.5) % 360), 150);
    return () => clearInterval(id);
  }, [isNav, northLocked]);

  const speak = useCallback((inst, on = true) => {
    if (!on || !inst || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(`In ${inst.dist}, ${inst.text}`);
    u.lang = "en-MY";
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  }, []);

  const startNav = useCallback(
    (target) => {
      setSearchTarget(target);
      setIsNav(true);
      setShowFavs(false);
      const first = { dist: "750m", text: "Turn Right" };
      setTurnInst(first);
      speak(first, voiceOn);
      setTimeout(() => {
        const i = { dist: "1.2 km", text: "Keep Left" };
        setTurnInst(i);
        speak(i, voiceOn);
      }, 8000);
      setTimeout(() => {
        const i = { dist: "300m", text: "Turn Left" };
        setTurnInst(i);
        speak(i, voiceOn);
      }, 16000);
    },
    [voiceOn, speak],
  );

  const cancelNav = () => {
    setIsNav(false);
    setTurnInst(null);
    if (mapRef.current) {
      navigator.geolocation?.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) =>
          mapRef.current.setView([lat, lng], 15, { animate: true }),
        () => mapRef.current.setView([1.5533, 110.3592], 15, { animate: true }),
      );
    }
  };

  const handleToggleVoice = () => {
    const n = !voiceOn;
    setVoiceOn(n);
    if (!n) window.speechSynthesis?.cancel();
    else if (turnInst) speak(turnInst, true);
  };

  const handleLocate = () => {
    setLocErr("");
    if (!navigator.geolocation) {
      setLocErr("Geolocation not supported");
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
        setLocErr(
          err.code === 1 ? "Location access denied" : "Unable to get location",
        );
        setTimeout(() => setLocErr(""), 4000);
      },
      { timeout: 10000, enableHighAccuracy: true },
    );
  };

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
      <LiveMap
        searchTarget={searchTarget}
        mapRef={mapRef}
        isNavigating={isNav}
      />

      {/* TOP ROW */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 14,
          right: 14,
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          zIndex: 10,
        }}
      >
        <BatteryCard rangeKm={217} pct={battery} />
        <SpeedGauge speed={speed} />
        {!isNav && <SearchBar onSearch={startNav} />}
        {!isNav && (
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => setShowFavs((v) => !v)}
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(255,255,255,.97)",
                border: showFavs
                  ? "2px solid #EF4444"
                  : "1.5px solid rgba(0,0,0,.08)",
                boxShadow: showFavs
                  ? "0 0 0 3px rgba(239,68,68,.15),0 2px 12px rgba(0,0,0,.12)"
                  : "0 2px 12px rgba(0,0,0,.12)",
                cursor: "pointer",
                outline: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all .25s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.08)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              title="Favourites"
            >
              <IcoHeart f={showFavs} />
            </button>
            <button
              onClick={() =>
                searchTarget
                  ? startNav(searchTarget)
                  : alert("Search a destination first.")
              }
              style={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                background: "#2563EB",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 18px rgba(37,99,235,.45)",
                outline: "none",
                flexShrink: 0,
                transition: "transform .15s,box-shadow .15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(37,99,235,.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 18px rgba(37,99,235,.45)";
              }}
              title="Navigate"
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M22 4L3 11l7 4 4 7 8-18z" fill="#fff" />
                <path
                  d="M10 15L22 4"
                  stroke="rgba(255,255,255,.4)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {isNav && (
        <TurnBanner
          inst={turnInst}
          voiceOn={voiceOn}
          onToggleVoice={handleToggleVoice}
        />
      )}

      <div
        style={{
          position: "absolute",
          right: 14,
          bottom: 250,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 11,
        }}
      >
        <Compass
          bearing={bearing}
          locked={northLocked}
          onClick={() => {
            setNorthLocked((l) => !l);
            setBearing(0);
          }}
        />
        <LocateBtn loading={locating} onClick={handleLocate} />
      </div>

      {locErr && (
        <div
          style={{
            position: "absolute",
            bottom: 154,
            right: 14,
            zIndex: 15,
            background: "#FEF2F2",
            border: "1px solid #FCA5A5",
            borderRadius: 10,
            padding: "9px 14px",
            fontSize: 12,
            color: "#B91C1C",
            maxWidth: 260,
          }}
        >
          {locErr}
        </div>
      )}
      {isNav && (
        <NavBar
          dest={
            searchTarget?.name?.split(",").slice(0, 2).join(",") ||
            "Destination"
          }
          eta="18 min"
          dist="34 km"
          onCancel={cancelNav}
        />
      )}
      {showFavs && (
        <FavModal
          onNavigate={(s) => startNav({ lat: s.lat, lng: s.lng, name: s.name })}
          onClose={() => setShowFavs(false)}
        />
      )}
      <BottomTabBar active={activeTab} setActive={setActiveTab} />

      <style>{`
        @keyframes spin      { to{transform:rotate(360deg);} }
        @keyframes fadeIn    { from{opacity:0;}to{opacity:1;} }
        @keyframes slideUp   { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);} }
        @keyframes slideDown { from{opacity:0;transform:translate(-50%,-8px);}to{opacity:1;transform:translate(-50%,0);} }
        @keyframes locPulse  { 0%,100%{box-shadow:0 0 0 0 rgba(59,130,246,.3);}50%{box-shadow:0 0 0 7px rgba(59,130,246,0);} }
        .leaflet-control-attribution{font-size:9px!important;}
        .leaflet-control-zoom{margin-right:78px!important;margin-bottom:160px!important;}
        .leaflet-control-zoom a{width:30px!important;height:30px!important;line-height:30px!important;font-size:15px!important;}
      `}</style>
    </div>
  );
}
