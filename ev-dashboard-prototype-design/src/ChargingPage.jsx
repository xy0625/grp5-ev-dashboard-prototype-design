import { useState, useEffect, useRef } from "react";
import BottomNav from "./BottomNav";

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS  = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

const CHARGE_STATIONS_MAP = [
  { name: "Station A", lat: 1.5072, lng: 110.3651, available: 2, total: 4 },
  { name: "Station B", lat: 1.5188, lng: 110.3842, available: 1, total: 2 },
  { name: "Station C", lat: 1.5295, lng: 110.3574, available: 1, total: 2 },
  { name: "Station D", lat: 1.5397, lng: 110.3502, available: 0, total: 4 },
];

const ALL_STATIONS = [
  { name: "Vivacity Megamall EV Charger",    address: "Jalan Wan Alwi, Kuching",         lat: 1.5072, lng: 110.3651 },
  { name: "The Spring Shopping Mall EV",     address: "Jalan Pending, Kuching",           lat: 1.5188, lng: 110.3842 },
  { name: "Kuching Waterfront EV Hub",       address: "Waterfront Promenade, Kuching",    lat: 1.5573, lng: 110.3439 },
  { name: "AEON Mall Kuching Central EV",    address: "Jalan Simpang Tiga, Kuching",      lat: 1.5295, lng: 110.3574 },
  { name: "Bintang Megamall EV Charger",     address: "Jalan Rubber, Kuching",            lat: 1.5397, lng: 110.3502 },
  { name: "Hikmah Exchange EV Station",      address: "Jalan Tun Abg Hj Openg, Kuching",  lat: 1.5560, lng: 110.3490 },
  { name: "Sarawak Plaza EV Point",          address: "Jalan Tunku Abdul Rahman, Kuching", lat: 1.5580, lng: 110.3450 },
  { name: "Boulevard Shopping Mall EV",      address: "Jalan Wan Alwi, Kuching",          lat: 1.5100, lng: 110.3700 },
];

const FONT = "'DM Sans', 'Inter', sans-serif";
const GREEN = "#1DB954";
const GREEN_DARK = "#15803d";
const GREEN_BG = "#e8fdf0";
const AMBER = "#F59E0B";
const RED = "#EF4444";
const INDIGO = "#6366F1";
const GRAY = "#6B7280";
const CARD_SHADOW = "0 2px 12px rgba(0,0,0,0.07)";
const CARD_SHADOW_DARK = "0 2px 16px rgba(0,0,0,0.45)";

/* ── Theme tokens ────────────────────────────────────────────────── */
function tk(theme) {
  const dark = theme === "dark";
  return {
    pageBg:        dark ? "#0F1117" : "linear-gradient(135deg,#e8f5fd 0%,#eaf6f0 55%,#f0f4ff 100%)",
    topBarBg:      dark ? "rgba(15,17,23,0.9)"  : "rgba(255,255,255,0.75)",
    topBarBorder:  dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.06)",
    cardBg:        dark ? "#1C1F2A" : "#fff",
    cardBorder:    dark ? "1.5px solid #2C2F3E" : "1.5px solid #E5E7EB",
    cardShadow:    dark ? CARD_SHADOW_DARK : CARD_SHADOW,
    textPrimary:   dark ? "#E8EAF0" : "#111",
    textSecond:    dark ? "#9CA3AF" : GRAY,
    textMuted:     dark ? "#6B7280" : "#B0B5BF",
    inputBg:       dark ? "#252836" : "#F3F4F6",
    divider:       dark ? "#2C2F3E" : "#E5E7EB",
    iconMuted:     dark ? "#6B7280" : "#9CA3AF",
    iconStroke:    dark ? "#9CA3AF" : "#111",
    searchBg:      dark ? "rgba(28,31,42,0.95)" : "#fff",
    searchText:    dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.55)",
    weatherBg:     dark ? "rgba(59,130,246,0.18)" : "rgba(59,130,246,0.13)",
    weatherText:   dark ? "#93C5FD" : "#1d4ed8",
    nearestBorder: dark ? `2px solid ${GREEN}` : `2px solid ${GREEN}`,
    preCondBg:     dark ? "rgba(99,102,241,0.12)" : "rgba(243,237,255,0.92)",
    preCondBorder: dark ? "1.5px solid rgba(99,102,241,0.3)" : "1.5px solid #E9D5FF",
    preCondTitle:  dark ? "#A78BFA" : "#5B21B6",
    preCondSub:    dark ? "#7C3AED" : "#A78BFA",
    greenBg:       dark ? "rgba(29,185,84,0.12)" : GREEN_BG,
    greenText:     dark ? "#4ADE80" : GREEN_DARK,
    redBg:         dark ? "rgba(239,68,68,0.12)" : "#FEF2F2",
    ambBlob1:      dark ? "rgba(30,40,60,0.6)"   : "rgba(186,230,253,0.38)",
    ambBlob2:      dark ? "rgba(20,40,30,0.5)"   : "rgba(209,250,229,0.32)",
    toggleOffBg:   dark ? "#252836" : "#fff",
    toggleOffBorder: dark ? "1.5px solid #2C2F3E" : "1.5px solid #E5E7EB",
    toggleOffIcon: dark ? "#252836" : "#F3F4F6",
    reachableBg:   dark ? "rgba(29,185,84,0.12)" : GREEN_BG,
    reachableText: dark ? "#4ADE80" : GREEN_DARK,
    nearestTag:    dark ? GREEN : GREEN,
    heartOff:      dark ? "#4B5563" : "#D1D5DB",
    mapOverlay:    dark ? 0.55 : 1,
    battPillBg:    dark ? "#1C1F2A" : "#fff",
    battPillBorder: (c) => dark ? `1.5px solid ${c}55` : `1.5px solid ${c}33`,
  };
}

/* ── Top Bar ─────────────────────────────────────────────────────── */
function TopBar({ battery, range, theme }) {
  const t = tk(theme);
  const battColor = battery < 20 ? RED : battery < 40 ? AMBER : GREEN;
  const filled = Math.max(2, Math.round(32 * battery / 100));

  return (
    <div style={{
      position: "absolute", left: 0, top: 0, width: 1280, height: 58,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", boxSizing: "border-box",
      background: t.topBarBg, backdropFilter: "blur(10px)",
      borderBottom: t.topBarBorder, zIndex: 5,
    }}>
      {/* Left: connectivity */}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <svg width="28" height="22" viewBox="0 0 34 28" fill="none">
          <path d="M17 22a2 2 0 110 4 2 2 0 010-4z" fill={t.iconStroke} />
          <path d="M10 16.5a9.9 9.9 0 0114 0" stroke={t.iconStroke} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M4 10.5a17.5 17.5 0 0126 0" stroke={t.iconStroke} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <svg width="20" height="28" viewBox="0 0 24 36" fill="none" stroke={t.iconStroke} strokeWidth="2.5" strokeLinecap="round">
          <path d="M6 9l12 9-6 5V3l6 5-12 9" />
        </svg>
      </div>

      {/* Center: battery pill */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: t.battPillBg, borderRadius: 30, padding: "6px 20px",
        boxShadow: t.cardShadow,
        border: t.battPillBorder(battColor),
      }}>
        <svg width="38" height="20" viewBox="0 0 42 24">
          <rect x="1" y="3" width="36" height="18" rx="3" stroke={battColor} strokeWidth="2" fill="none" />
          <rect x="37" y="8" width="4" height="8" rx="2" fill={battColor} />
          <rect x="3" y="5" width={filled} height="14" rx="1" fill={battColor} />
        </svg>
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 17, color: battColor }}>{battery}%</span>
        <span style={{ fontFamily: FONT, fontSize: 16, color: t.divider }}>·</span>
        <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 17, color: t.textPrimary }}>{range} km left</span>
        {battery < 20 && (
          <span style={{
            background: RED, color: "#fff", fontSize: 11, fontWeight: 700,
            borderRadius: 6, padding: "2px 8px", marginLeft: 4, letterSpacing: "0.03em",
          }}>LOW</span>
        )}
      </div>

      {/* Right: profile */}
      <div style={{
        width: 44, height: 44,
        background: theme === "dark" ? "rgba(99,102,241,0.2)" : "#F3EDFF",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={INDIGO} strokeWidth="2">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
    </div>
  );
}

function MapView({ theme, onStationSelect, onNavigate  }) {
  const t = tk(theme);
  const dark = theme === "dark";
  const containerRef = useRef(null);
  const mapRef       = useRef(null);
  const tileRef      = useRef(null);
  const [ready, setReady] = useState(false);

  // 搜索状态
  const [query, setQuery]           = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused]       = useState(false);
  const inputRef = useRef(null);

  const filtered = query.trim().length === 0
    ? ALL_STATIONS
    : ALL_STATIONS.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.address.toLowerCase().includes(query.toLowerCase())
      );

  const [selectedStation, setSelectedStation] = useState(null);

  const handleSelect = (station) => {
    setQuery(station.name);
    setSuggestions([]);
    setFocused(false);
    setSelectedStation(station);
    inputRef.current?.blur();
    if (mapRef.current) {
      mapRef.current.setView([station.lat, station.lng], 16, { animate: true });
      window.L?.popup()
        .setLatLng([station.lat, station.lng])
        .setContent(`<div style="font-family:Inter,sans-serif"><b>${station.name}</b><br/><span style="font-size:12px;color:#666">${station.address}</span></div>`)
        .openOn(mapRef.current);
    }
    onStationSelect?.(station);
  };

  const handleFocus = () => {
    setFocused(true);
    setSuggestions(filtered);
  };

  const handleChange = (e) => {
    const v = e.target.value;
    setQuery(v);
    setSuggestions(
      v.trim().length === 0
        ? ALL_STATIONS
        : ALL_STATIONS.filter(s =>
            s.name.toLowerCase().includes(v.toLowerCase()) ||
            s.address.toLowerCase().includes(v.toLowerCase())
          )
    );
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions(ALL_STATIONS);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css"; link.rel = "stylesheet"; link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }
    if (window.L) { setReady(true); return; }
    const script = document.createElement("script");
    script.src = LEAFLET_JS;
    script.onload = () => setReady(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!ready || !containerRef.current || mapRef.current) return;
    const L = window.L;
    const map = L.map(containerRef.current, {
      center: [1.5295, 110.3592], zoom: 13,
      zoomControl: false, attributionControl: true,
    });
    const tileUrl = dark
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    tileRef.current = L.tileLayer(tileUrl, { attribution: "© OpenStreetMap", maxZoom: 19 }).addTo(map);
    L.control.zoom({ position: "bottomright" }).addTo(map);

    CHARGE_STATIONS_MAP.forEach((s) => {
      const color = s.available === 0 ? "#EF4444" : s.available === 1 ? "#F59E0B" : "#1DB954";
      const icon = L.divIcon({
        html: `<div style="width:36px;height:36px;border-radius:50%;background:${color};border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M12 2L4 12H10L8 18L16 8H10L12 2Z" fill="#fff"/></svg>
        </div>`,
        iconSize: [36, 36], iconAnchor: [18, 18], className: "",
      });
      L.marker([s.lat, s.lng], { icon }).addTo(map)
        .bindPopup(`<div style="font-family:Inter,sans-serif;min-width:140px"><b style="font-size:14px">${s.name}</b><br/><span style="font-size:12px;color:#666">${s.available}/${s.total} chargers available</span></div>`);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude: lat, longitude: lng } }) => {
        const youIcon = L.divIcon({
          html: `<div style="width:16px;height:16px;border-radius:50%;background:#2B8FFF;border:3px solid #fff;box-shadow:0 0 8px rgba(43,143,255,0.6)"></div>`,
          iconSize: [16, 16], iconAnchor: [8, 8], className: "",
        });
        L.marker([lat, lng], { icon: youIcon }).addTo(map);
        map.setView([lat, lng], 14, { animate: true });
      }, () => {});
    }
    mapRef.current = map;
  }, [ready]);

  useEffect(() => {
    if (!mapRef.current || !tileRef.current) return;
    const L = window.L;
    mapRef.current.removeLayer(tileRef.current);
    const tileUrl = dark
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    tileRef.current = L.tileLayer(tileUrl, { attribution: "© OpenStreetMap", maxZoom: 19 }).addTo(mapRef.current);
  }, [dark]);

  return (
    <div style={{
      position: "absolute", left: 24, top: 74, width: 640, height: 390,
      borderRadius: 20, overflow: "hidden", boxShadow: t.cardShadow,
    }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {/* ── Search bar overlay ── */}
      <div style={{
        position: "absolute", top: 16, left: 16, width: 280, zIndex: 1000,
      }}>
        {/* Input pill */}
        <div style={{
          height: 42, background: t.searchBg, borderRadius: focused ? "14px 14px 0 0" : 21,
          display: "flex", alignItems: "center", gap: 8, padding: "0 12px",
          boxShadow: focused ? "0 4px 20px rgba(0,0,0,0.18)" : t.cardShadow,
          border: dark ? "1px solid #2C2F3E" : focused ? "1px solid #6366F1" : "1px solid #E5E7EB",
          transition: "all 0.18s",
        }}>
          {/* bolt icon — 充电站专属 */}
          <svg width="15" height="15" viewBox="0 0 20 20" fill={focused ? "#6366F1" : t.searchText}>
            <path d="M12 2L4 12H10L8 18L16 8H10L12 2Z"/>
          </svg>

          <input
            ref={inputRef}
            value={query}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={() => setTimeout(() => { setFocused(false); setSuggestions([]); }, 160)}
            placeholder="Search charging stations…"
            style={{
              flex: 1, border: "none", outline: "none", background: "transparent",
              fontFamily: FONT, fontSize: 13, fontWeight: 500,
              color: dark ? "#E8EAF0" : "#111",
            }}
          />

          {/* clear button */}
          {query.length > 0 && (
            <button onClick={handleClear} style={{
              background: "none", border: "none", cursor: "pointer",
              color: t.searchText, fontSize: 16, padding: 0, lineHeight: 1,
              display: "flex", alignItems: "center",
            }}>✕</button>
          )}
        </div>

        {/* Dropdown */}
        {focused && suggestions.length > 0 && (
          <div style={{
            background: dark ? "#1C1F2A" : "#fff",
            border: dark ? "1px solid #2C2F3E" : "1px solid #E5E7EB",
            borderTop: "none",
            borderRadius: "0 0 14px 14px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.16)",
            overflow: "hidden", maxHeight: 220, overflowY: "auto",
          }}>
            {suggestions.map((s, i) => (
              <div
                key={i}
                onMouseDown={() => handleSelect(s)}
                style={{
                  padding: "10px 14px",
                  borderBottom: i < suggestions.length - 1
                    ? `1px solid ${dark ? "#2C2F3E" : "#F3F4F6"}`
                    : "none",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                  transition: "background 0.12s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = dark ? "#252836" : "#F5F8FF"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                {/* coloured bolt */}
                <div style={{
                  width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                  background: dark ? "rgba(99,102,241,0.15)" : "#EEF2FF",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="#6366F1">
                    <path d="M12 2L4 12H10L8 18L16 8H10L12 2Z"/>
                  </svg>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontFamily: FONT, fontWeight: 600, fontSize: 13,
                    color: dark ? "#E8EAF0" : "#111",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>{s.name}</div>
                  <div style={{
                    fontFamily: FONT, fontSize: 11, color: dark ? "#6B7280" : "#9CA3AF",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>{s.address}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Navigate button — 选中充电站后显示 */}
{selectedStation && !focused && (
  <div style={{
    marginTop: 8,
    background: dark ? "#1C1F2A" : "#fff",
    border: dark ? "1.5px solid #2C2F3E" : "1.5px solid #E5E7EB",
    borderRadius: 14,
    padding: "10px 14px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.14)",
    animation: "fadeInNav 0.2s ease",
  }}>
    {/* Station info row */}
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      <div style={{
        width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
        background: dark ? "rgba(99,102,241,0.15)" : "#EEF2FF",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="12" height="12" viewBox="0 0 20 20" fill="#6366F1">
          <path d="M12 2L4 12H10L8 18L16 8H10L12 2Z"/>
        </svg>
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{
          fontFamily: FONT, fontWeight: 600, fontSize: 12,
          color: dark ? "#E8EAF0" : "#111",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{selectedStation.name}</div>
        <div style={{
          fontFamily: FONT, fontSize: 10, color: dark ? "#6B7280" : "#9CA3AF",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{selectedStation.address}</div>
      </div>
      {/* Clear selection */}
      <button
        onClick={() => { setSelectedStation(null); setQuery(""); }}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: dark ? "#6B7280" : "#9CA3AF", fontSize: 14,
          padding: "2px 4px", flexShrink: 0,
        }}
      >✕</button>
    </div>

        {/* Navigate button */}
        <button
          onClick={() => onNavigate?.(selectedStation)}
          style={{
            width: "100%", height: 38,
            background: "linear-gradient(135deg,#1DB954,#16A34A)",
            border: "none", borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(29,185,84,0.35)",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11"/>
          </svg>
          <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 13, color: "#fff" }}>
            Navigate to {selectedStation.name.split(" ").slice(0, 2).join(" ")}
          </span>
        </button>
      </div>
    )}
        {/* No results */}
        {focused && query.length > 0 && suggestions.length === 0 && (
          <div style={{
            background: dark ? "#1C1F2A" : "#fff",
            border: dark ? "1px solid #2C2F3E" : "1px solid #E5E7EB",
            borderTop: "none", borderRadius: "0 0 14px 14px",
            padding: "14px", textAlign: "center",
            fontFamily: FONT, fontSize: 13, color: dark ? "#6B7280" : "#9CA3AF",
          }}>
            No charging stations found
          </div>
        )}
        
      </div>

      {/* Weather badge */}
      <div style={{
        position: "absolute", top: 20, right: 16, zIndex: 1000,
        background: t.weatherBg, backdropFilter: "blur(6px)",
        borderRadius: 12, padding: "6px 12px",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="#3b82f6">
          <path d="M18 10a6 6 0 10-11.95.85A4 4 0 006 18h12a4 4 0 000-8z" />
        </svg>
        <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: t.weatherText }}>Rain likely</span>
      </div>

      {/* Legend */}
      <div style={{
        position: "absolute", bottom: 14, left: 14, zIndex: 1000,
        display: "flex", gap: 8, alignItems: "center",
        background: dark ? "rgba(15,17,23,0.82)" : "rgba(255,255,255,0.88)",
        borderRadius: 10, padding: "6px 12px",
        backdropFilter: "blur(6px)",
        border: dark ? "1px solid #2C2F3E" : "none",
        boxShadow: t.cardShadow,
      }}>
        {[
          { color: "#1DB954", label: "Available" },
          { color: "#F59E0B", label: "1 left" },
          { color: "#EF4444", label: "Full" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
            <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 500, color: dark ? "#9CA3AF" : "#555" }}>{label}</span>
          </div>
        ))}
      </div>

      <style>{`
        .leaflet-control-zoom { margin-right:10px !important; margin-bottom:10px !important; }
        .leaflet-control-zoom a { width:30px !important; height:30px !important; line-height:30px !important; font-size:16px !important; }
        .leaflet-control-attribution { font-size:9px !important; }
        .leaflet-map-pane { z-index:1 !important; }
        .leaflet-tile-pane { z-index:1 !important; }
        @keyframes fadeInNav {
          from { opacity:0; transform:translateY(-6px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ── Quick Toggle Card ───────────────────────────────────────────── */
function QuickToggle({ label, icon, on, onToggle, activeColor, activeBg, theme }) {
  const t = tk(theme);
  return (
    <button
      onClick={onToggle}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 8, width: "100%", minHeight: 106,
        background: on ? activeBg : t.toggleOffBg,
        borderRadius: 18,
        border: on ? `2px solid ${activeColor}` : t.toggleOffBorder,
        cursor: "pointer", transition: "all 0.18s",
        boxShadow: on ? `0 0 0 3px ${activeColor}20` : t.cardShadow,
        padding: 0,
      }}
    >
      <div style={{
        width: 46, height: 46, borderRadius: "50%",
        background: on ? activeColor : t.toggleOffIcon,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 0.18s",
      }}>
        {icon(on)}
      </div>
      <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 13, color: on ? activeColor : t.textPrimary }}>{label}</span>
      <span style={{
        fontFamily: FONT, fontWeight: 500, fontSize: 12,
        color: on ? activeColor : t.textSecond,
        background: on ? `${activeColor}18` : t.inputBg,
        borderRadius: 8, padding: "2px 10px",
      }}>{on ? "ON" : "OFF"}</span>
    </button>
  );
}

/* ── Range Card ─────────────────────────────────────────────────── */
function RangeCard({ range, theme }) {
  const t = tk(theme);
  return (
    <div style={{
      background: t.cardBg, borderRadius: 18, padding: "5px 16px",
      boxShadow: t.cardShadow, border: t.cardBorder,
    }}>
      <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 13, color: t.textSecond, marginBottom: 2 }}>Estimated Range</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
        <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 34, color: t.textPrimary, lineHeight: 1 }}>{range}</span>
        <span style={{ fontFamily: FONT, fontWeight: 500, fontSize: 15, color: t.textSecond }}>km</span>
      </div>
      <div style={{ fontFamily: FONT, fontSize: 10, color: t.textMuted, marginBottom: 6 }}>Based on current settings</div>
      <svg width="100%" height="50" viewBox="0 0 200 50">
        <line x1="18" y1="8"  x2="195" y2="8"  stroke={t.divider} strokeWidth="1" />
        <line x1="18" y1="26" x2="195" y2="26" stroke={t.divider} strokeWidth="1" />
        <line x1="18" y1="44" x2="195" y2="44" stroke={t.divider} strokeWidth="1" />
        <path d="M18 44 Q70 34 108 22 Q140 14 195 10 L195 44 Z" fill="rgba(29,185,84,0.12)" />
        <path d="M18 44 Q70 34 108 22 Q140 14 195 10" stroke={GREEN} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {["Now", "+1h", "+2h"].map((label, i) => (
          <text key={i} x={[18,108,195][i]} y="50" fontSize="9" fill={t.textMuted} fontFamily="Inter,sans-serif" textAnchor="middle">{label}</text>
        ))}
        {["120","60","0"].map((v, i) => (
          <text key={i} x="14" y={[9,27,45][i]} fontSize="8" fill={t.textMuted} fontFamily="Inter,sans-serif" textAnchor="end">{v}</text>
        ))}
      </svg>
    </div>
  );
}

/* ── Pre-condition Card ─────────────────────────────────────────── */
function PreCondCard({ theme }) {
  const t = tk(theme);
  return (
    <div style={{
      background: t.preCondBg, borderRadius: 18,
      padding: "14px 16px", boxShadow: t.cardShadow,
      border: t.preCondBorder,
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      minHeight: 106,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill={INDIGO}>
          <path d="M15 13V5a3 3 0 10-6 0v8a5 5 0 106 0zm-3 5a3 3 0 110-6 3 3 0 010 6z" />
        </svg>
        <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 13, color: t.preCondTitle }}>Pre-condition</span>
      </div>
      <div>
        <div style={{ fontFamily: FONT, fontSize: 11, color: t.preCondSub, marginBottom: 4 }}>Schedule at</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={INDIGO} strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 3M9 2h6M12 2v3" />
          </svg>
          <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 20, color: INDIGO }}>10:00</span>
          <span style={{ fontFamily: FONT, fontSize: 14, color: t.preCondSub }}>PM</span>
        </div>
      </div>
    </div>
  );
}

/* ── Station Card ────────────────────────────────────────────────── */
function StationCard({ name, distance, available, total, power, canReach, isNearest, onNavigate, theme }) {
  const t = tk(theme);
  const [liked, setLiked] = useState(false);
  const availColor = available === 0 ? RED : available === 1 ? AMBER : GREEN;
  const availBg    = available === 0
    ? t.redBg
    : available === 1
      ? (theme === "dark" ? "rgba(245,158,11,0.12)" : "#FFFBEB")
      : t.greenBg;
  const navActive = canReach && available > 0;

  return (
    <div style={{
      background: t.cardBg, borderRadius: 18, padding: "18px 16px", minHeight: 130,
      boxShadow: isNearest ? `0 4px 20px rgba(29,185,84,0.18)` : t.cardShadow,
      border: isNearest ? t.nearestBorder : t.cardBorder,
      position: "relative", transition: "box-shadow 0.2s",
    }}>
      {isNearest && (
        <div style={{
          position: "absolute", top: -1, left: 16,
          background: GREEN, color: "#fff", fontSize: 10, fontWeight: 700,
          borderRadius: "0 0 8px 8px", padding: "2px 10px", letterSpacing: "0.04em",
        }}>NEAREST</div>
      )}

      <button
        onClick={() => setLiked(v => !v)}
        style={{
          position: "absolute", top: 12, right: 12, background: "none", border: "none",
          cursor: "pointer", padding: 4, minWidth: 36, minHeight: 36,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24"
          fill={liked ? RED : "none"} stroke={liked ? RED : t.heartOff} strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      </button>

      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 17, color: t.textPrimary, marginBottom: 8, paddingRight: 32 }}>{name}</div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 0 }}>

          {/* Badges */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ background: t.greenBg, color: t.greenText, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>Fast</span>
            {canReach
              ? <span style={{ background: t.greenBg, color: t.greenText, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill={t.greenText}><path d="M20 6L9 17l-5-5" stroke={t.greenText} strokeWidth="3" strokeLinecap="round" fill="none" /></svg>
                  Reachable
                </span>
              : <span style={{ background: t.redBg, color: RED, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>Out of range</span>
            }
          </div>

          {/* Distance · availability */}
          <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "nowrap" }}>
            <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 13, color: t.textPrimary, whiteSpace: "nowrap" }}>{distance}</span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: t.divider, display: "inline-block", flexShrink: 0 }} />
            <span style={{ background: availBg, borderRadius: 8, padding: "2px 8px", fontFamily: FONT, fontWeight: 600, fontSize: 13, color: availColor, whiteSpace: "nowrap" }}>
              {available}/{total} available
            </span>
          </div>

          {/* Power */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={GREEN}><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 12, color: t.textSecond }}>Up to {power}</span>
          </div>
        </div>

        {/* Navigate button */}
        <div
          onClick={navActive ? onNavigate : undefined}
          style={{
            width: 130, height: 82,
            background: navActive ? GREEN : (theme === "dark" ? "#252836" : "#E5E7EB"),
            borderRadius: 14, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 4,
            cursor: navActive ? "pointer" : "not-allowed",
            boxShadow: navActive ? `0 4px 14px rgba(29,185,84,0.35)` : "none",
            flexShrink: 0, transition: "all 0.18s",
          }}
          onMouseEnter={e => { if (navActive) e.currentTarget.style.opacity = "0.88"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke={navActive ? "#fff" : t.iconMuted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Nearby Stations Panel ───────────────────────────────────────── */
function NearbyStations({ range, onStartSession, theme }) {
  const t = tk(theme);
  const stations = [
    { name: "Station A", distance: "12 km away",  available: 2, total: 4, power: "120 kW", reachKm: 12  },
    { name: "Station B", distance: "28 km away",  available: 1, total: 2, power: "60 kW",  reachKm: 28  },
    { name: "Station C", distance: "75 km away",  available: 1, total: 2, power: "120 kW", reachKm: 75  },
    { name: "Station D", distance: "120 km away", available: 0, total: 4, power: "120 kW", reachKm: 120 },
  ];
  const reachableCount = stations.filter(s => s.reachKm <= range && s.available > 0).length;

  return (
    <div style={{ position: "absolute", left: 688, top: 70, width: 568, bottom: 35, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 20, color: t.textPrimary }}>Nearby Stations</span>
        <span style={{
          fontFamily: FONT, fontSize: 13, fontWeight: 600,
          color: reachableCount > 0 ? t.greenText : t.textSecond,
          background: reachableCount > 0 ? t.reachableBg : t.inputBg,
          borderRadius: 20, padding: "3px 12px",
        }}>{reachableCount} reachable</span>
      </div>
      <div style={{
        height: "100%", overflowY: "auto", display: "flex", flexDirection: "column",
        gap: 14, paddingRight: 6, paddingBottom: 120,
        scrollbarWidth: "thin",
        scrollbarColor: theme === "dark" ? "#2C2F3E transparent" : "#c9d0e0 transparent",
      }}>
        {stations.map((s, i) => (
          <StationCard
            key={s.name} {...s}
            canReach={s.reachKm <= range}
            isNearest={i === 0}
            onNavigate={onStartSession}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Page Root ───────────────────────────────────────────────────── */
export default function ChargingPage({ battery = 22, range = 95, navActive, setNavActive, onStartSession, theme = "light" }) {
  const t = tk(theme);
  const [ac, setAc]   = useState(false);
  const [eco, setEco] = useState(false);
  const effectiveRange = eco ? Math.round(range * 1.12) : range;

  return (
    <div style={{
      position: "relative", width: 1280, height: 800,
      background: t.pageBg,
      overflow: "hidden", fontFamily: FONT,
      transition: "background 0.3s",
    }}>
      {/* Ambient blobs */}
      <div style={{ position: "absolute", width: 580, height: 580, left: -90, top: -90, borderRadius: "50%", background: `radial-gradient(circle,${t.ambBlob1} 0%,transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 480, height: 480, right: -70, bottom: -70, borderRadius: "50%", background: `radial-gradient(circle,${t.ambBlob2} 0%,transparent 70%)`, pointerEvents: "none" }} />

      <TopBar battery={battery} range={effectiveRange} theme={theme} />
      <MapView theme={theme} onStationSelect={(s) => console.log("Selected:", s.name)}   onNavigate={(station) => {setNavActive(2);}}/>

      {/* Quick controls row */}
      <div style={{
        position: "absolute", left: 24, top: 480, width: 640,
        display: "grid", gridTemplateColumns: "1fr 1fr 2fr 1.55fr", gap: 12,
      }}>
        <QuickToggle
          label="A/C" on={ac} onToggle={() => setAc(v => !v)}
          activeColor="#0ea5e9" activeBg={theme === "dark" ? "rgba(14,165,233,0.15)" : "#e0f7ff"}
          theme={theme}
          icon={on => (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={on ? "#fff" : t.iconMuted} strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
          )}
        />
        <QuickToggle
          label="Eco" on={eco} onToggle={() => setEco(v => !v)}
          activeColor={GREEN} activeBg={theme === "dark" ? "rgba(29,185,84,0.15)" : GREEN_BG}
          theme={theme}
          icon={on => (
            <svg width="22" height="22" viewBox="0 0 24 24" fill={on ? "#fff" : t.iconMuted}>
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
        />
        <RangeCard range={effectiveRange} theme={theme} />
        <PreCondCard theme={theme} />
      </div>

      <NearbyStations range={effectiveRange} onStartSession={() => setNavActive(2)}  theme={theme} />

      <BottomNav active={navActive} setActive={setNavActive} theme={theme} />
    </div>
  );
}