import { useState, useEffect, useRef } from "react";
import BottomNav from "./BottomNav";

/* ── Leaflet CSS injected once ────────────────────────────────────── */
const LEAFLET_CSS =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
const LEAFLET_JS =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";

function injectLeaflet(cb) {
  if (window._leafletReady) {
    cb();
    return;
  }
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = LEAFLET_CSS;
  document.head.appendChild(link);
  const script = document.createElement("script");
  script.src = LEAFLET_JS;
  script.onload = () => {
    window._leafletReady = true;
    cb();
  };
  document.head.appendChild(script);
}

/* ── Theme tokens ─────────────────────────────────────────────────── */
function tk(theme) {
  const dark = theme === "dark";
  return {
    pageBg: dark
      ? "#0F1117"
      : "linear-gradient(135deg, #E6F3F0 0%, #EBF6F5 50%, #EFF3F8 100%)",
    cardBg: dark ? "rgba(28,31,42,0.92)" : "rgba(255,255,255,0.65)",
    cardBorder: dark ? "1px solid #2C2F3E" : "1px solid rgba(255,255,255,0.6)",
    cardBackdrop: "blur(25px)",
    cardShadow: dark
      ? "0 25px 60px rgba(0,0,0,0.5)"
      : "0 25px 60px rgba(0,0,0,0.06)",
    textPrimary: dark ? "#E8EAF0" : "#303030",
    textSecond: dark ? "#9CA3AF" : "#9AA1B1",
    textMuted: dark ? "#6B7280" : "#9AA1B1",
    iconStroke: dark ? "#9CA3AF" : "#9AA1B1",
    divider: dark ? "#2C2F3E" : "rgba(154,161,177,0.12)",
    inputBg: dark ? "#252836" : "#fff",
    inputBorder: dark ? "1px solid #3A3F52" : "1.5px solid #ddd",
    inputColor: dark ? "#E8EAF0" : "#1E1E1E",
    shadow: dark
      ? "0px 6px 20px rgba(0,0,0,0.5)"
      : "0px 6px 20px rgba(0,0,0,0.1)",
    blobA: dark ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.35)",
    blobB: dark ? "rgba(236,34,31,0.06)" : "rgba(236,34,31,0.05)",
    avatarBg: dark ? "rgba(30,33,48,0.85)" : "rgba(255,255,255,0.7)",
    avatarBorder: dark
      ? "1px solid #2C2F3E"
      : "1px solid rgba(255,255,255,0.6)",
    avatarShadow: dark
      ? "0 4px 12px rgba(0,0,0,0.4)"
      : "0 4px 12px rgba(0,0,0,0.1)",
    autoEmergBg: dark ? "rgba(35,28,38,0.9)" : "rgba(244,247,250,0.9)",
    autoEmergBorder: dark
      ? "1px solid rgba(255,107,107,0.25)"
      : "1px solid rgba(255,107,107,0.18)",
    autoEmergIconBg: dark ? "rgba(100,20,20,0.4)" : "rgba(253,211,208,0.55)",
    contactBg: dark ? "rgba(20,50,30,0.7)" : "rgba(211,255,222,0.9)",
    contactBorder: dark
      ? "1px solid rgba(0,153,81,0.25)"
      : "1px solid rgba(255,255,255,0.7)",
    contactEditBg: dark ? "rgba(80,20,20,0.5)" : "rgba(255,107,107,0.08)",
    contactEditBorder: dark
      ? "1px solid rgba(255,107,107,0.35)"
      : "1px solid rgba(255,107,107,0.25)",
    contactName: dark ? "#D1FAE5" : "#303030",
    contactPhone: dark ? "#6B7280" : "#9AA1B1",
    avatarGradient: dark
      ? "linear-gradient(135deg, #064e3b, #065f46)"
      : "linear-gradient(135deg, #93ffc9, #e3ffbc)",
    avatarText: dark ? "#ffffff" : "#006a19",
    modalBg: dark ? "rgba(20,22,32,0.97)" : "#fff",
    modalBorder: dark ? "1px solid #2C2F3E" : "none",
    modalShadow: dark
      ? "0 24px 60px rgba(0,0,0,0.6)"
      : "0 24px 60px rgba(0,0,0,0.25)",
    modalTitle: dark ? "#E8EAF0" : "#1E1E1E",
    modalSubtext: dark ? "#9CA3AF" : "#767676",
    cancelBtnBg: dark ? "#252836" : "#f5f5f5",
    cancelBtnBorder: dark ? "2px solid #3A3F52" : "2px solid #ddd",
    cancelBtnText: dark ? "#9CA3AF" : "#333",
    addresText: dark ? "#9CA3AF" : "#555",
    toggleOff: dark ? "#3A3F52" : "#D1D1D6",
  };
}

/* ── Press Effect Hook ───────────────────────────────────────────── */
function usePressEffect() {
  return {
    onMouseDown: (e) => {
      e.currentTarget.style.transform = "scale(0.94)";
      e.currentTarget.style.opacity = "0.82";
    },
    onMouseUp: (e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.opacity = "1";
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.opacity = "1";
    },
    onTouchStart: (e) => {
      e.currentTarget.style.transform = "scale(0.94)";
      e.currentTarget.style.opacity = "0.82";
    },
    onTouchEnd: (e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.opacity = "1";
    },
  };
}

/* ── SVG Icons ───────────────────────────────────────────────────── */
const WifiIcon = ({ theme }) => {
  const c = tk(theme).iconStroke;
  return (
    <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
      <path d="M16 20a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fill={c} />
      <path
        d="M8 13.5C10.2 11.2 12.9 10 16 10s5.8 1.2 8 3.5"
        stroke={c}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M2 7C5.8 3.1 10.6 1 16 1s10.2 2.1 14 6"
        stroke={c}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
const BluetoothIcon = ({ theme }) => {
  const c = tk(theme).iconStroke;
  return (
    <svg width="22" height="32" viewBox="0 0 22 32" fill="none">
      <path
        d="M3 8L19 16 3 24"
        stroke={c}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 8L3 16l16 8"
        stroke={c}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const UserIcon = ({ theme }) => {
  const c = tk(theme).iconStroke;
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="10" r="5.5" stroke={c} strokeWidth="2" />
      <path
        d="M3 26c0-6.1 4.9-11 11-11s11 4.9 11 11"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
const PhoneIcon = ({ color = "#fff", size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
      fill={color}
    />
  </svg>
);
const LocationPinIcon = ({ color = "#2F80ED", size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 28 32" fill="none">
    <path
      d="M14 1C8.5 1 3 6 3 12.5c0 9 11 18.5 11 18.5s11-9.5 11-18.5C25 6 19.5 1 14 1z"
      fill={color}
    />
    <circle cx="14" cy="12.5" r="4" fill="#fff" />
  </svg>
);
const CarEmergencyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 72 72" fill="none">
    <path d="M12 38l5-14h38l5 14v12H12V38z" fill="#970000" />
    <path d="M20 38l3-10h26l3 10H20z" fill="#C84040" opacity="0.6" />
    <circle cx="22" cy="50" r="6" fill="#333" />
    <circle cx="50" cy="50" r="6" fill="#333" />
    <circle cx="22" cy="50" r="3" fill="#666" />
    <circle cx="50" cy="50" r="3" fill="#666" />
    <rect x="26" y="22" width="8" height="6" rx="2" fill="#FF4444" />
    <rect
      x="38"
      y="22"
      width="8"
      height="6"
      rx="2"
      fill="#4444FF"
      opacity="0.8"
    />
    <path
      d="M30 18l-3-5M36 17v-6M42 18l3-5"
      stroke="#FF6666"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const ContactsIcon = ({ theme }) => {
  const c = tk(theme).iconStroke;
  return (
    <svg width="36" height="36" viewBox="0 0 45 45" fill="none">
      <circle cx="18" cy="17" r="6" stroke={c} strokeWidth="2.5" fill="none" />
      <path
        d="M6 38c0-7 5.4-12 12-12s12 5 12 12"
        stroke={c}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M30 20c2.5 0 4.5 2 4.5 4.5S32.5 29 30 29"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M34 36c2-1.5 3-3.5 3-6"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
const SendIcon = ({ color = "#fff", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M22 2L11 13"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 2L15 22l-4-9-9-4 20-7z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const WarningIcon = () => (
  <svg width="100" height="100" viewBox="0 0 117 117" fill="none">
    <path d="M58.5 10L108 100H9L58.5 10z" fill="#970000" />
    <rect x="53" y="42" width="11" height="32" rx="5" fill="#fff" />
    <rect x="53" y="82" width="11" height="11" rx="5" fill="#fff" />
  </svg>
);

/* ── Small Toggle ────────────────────────────────────────────────── */
function SmallToggle({ checked, onChange, theme }) {
  const t = tk(theme);
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: "56px",
        height: "30px",
        background: checked
          ? "linear-gradient(270deg,#FF0E00 11%,#EC756E 76%)"
          : t.toggleOff,
        borderRadius: "100px",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.3s",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.12)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "2px",
          left: checked ? "calc(100% - 28px)" : "2px",
          width: "26px",
          height: "26px",
          background: "#fff",
          borderRadius: "50%",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          transition: "left 0.3s cubic-bezier(.4,0,.2,1)",
        }}
      />
    </div>
  );
}

/* ── TurnOff Confirm Modal ───────────────────────────────────────── */
function TurnOffConfirmModal({ onKeepOn, onTurnOff }) {
  const p1 = usePressEffect();
  const p2 = usePressEffect();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "80px",
          width: "100%",
          padding: "0 80px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "80px",
              background: "#FDD3D0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WarningIcon />
          </div>
          <div
            style={{
              width: "480px",
              fontSize: "40px",
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            Turn Off Auto Emergency Assistance?
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "100px",
            alignItems: "center",
          }}
        >
          <button
            onClick={onTurnOff}
            {...p1}
            style={{
              width: "422px",
              height: "130px",
              background: "#D52011",
              border: "none",
              borderRadius: "50px",
              fontSize: "40px",
              fontWeight: 500,
              color: "#FFFFFF",
              cursor: "pointer",
              fontFamily: "'Inter',sans-serif",
              outline: "none",
              transition: "transform 0.1s,opacity 0.1s",
            }}
          >
            Turn Off
          </button>
          <button
            onClick={onKeepOn}
            {...p2}
            style={{
              width: "422px",
              height: "130px",
              background: "#FFFFFF",
              border: "5px solid #14AE5C",
              boxShadow: "0px 15px 50px rgba(0,255,140,0.5)",
              borderRadius: "50px",
              fontSize: "40px",
              fontWeight: 500,
              color: "#009951",
              cursor: "pointer",
              fontFamily: "'Inter',sans-serif",
              outline: "none",
              transition: "transform 0.1s,opacity 0.1s",
            }}
          >
            Keep On
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── SOS Modal ───────────────────────────────────────────────────── */
function SOSModal({ onClose }) {
  const p1 = usePressEffect();
  const p2 = usePressEffect();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "80px",
          width: "100%",
          padding: "0 80px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "36px",
          }}
        >
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "80px",
              background: "#FDD3D0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PhoneIcon color="#EC221F" size={100} />
          </div>
          <div
            style={{
              width: "480px",
              fontSize: "40px",
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            SOS Emergency?
          </div>
          <p
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#ffe7e7",
              margin: "0",
              lineHeight: 1.5,
              textAlign: "center",
            }}
          >
            This will immediately call emergency services
            <br />
            and share your current location.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "100px",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => {
              onClose();
              alert("SOS call initiated — emergency services notified.");
            }}
            {...p1}
            style={{
              width: "422px",
              height: "130px",
              background: "#D52011",
              border: "none",
              borderRadius: "50px",
              fontSize: "40px",
              fontWeight: 600,
              color: "#FFFFFF",
              cursor: "pointer",
              fontFamily: "'Inter',sans-serif",
              boxShadow: "0px 15px 50px rgba(255,21,0,0.4)",
              outline: "none",
              transition: "transform 0.1s,opacity 0.1s",
            }}
          >
            Call Now
          </button>
          <button
            onClick={onClose}
            {...p2}
            style={{
              width: "422px",
              height: "130px",
              background: "#FFFFFF",
              border: "5px solid #a9a9a9",
              borderRadius: "50px",
              fontSize: "40px",
              fontWeight: 500,
              color: "#949494",
              cursor: "pointer",
              fontFamily: "'Inter',sans-serif",
              outline: "none",
              transition: "transform 0.1s,opacity 0.1s",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Add Contact Modal ───────────────────────────────────────────── */
function AddContactModal({ onClose, onAdd, theme }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const t = tk(theme);
  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: t.inputBorder,
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    background: t.inputBg,
    color: t.inputColor,
  };
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: t.modalBg,
          border: t.modalBorder,
          borderRadius: "24px",
          padding: "36px 40px",
          width: "360px",
          boxShadow: t.modalShadow,
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: t.modalTitle,
            margin: "0 0 20px",
          }}
        >
          Add Trusted Contact
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <input
            style={inputStyle}
            placeholder="Name (e.g. Mom)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={inputStyle}
            placeholder="Phone (e.g. +60 12 345 6789)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "12px",
              border: t.cancelBtnBorder,
              background: t.cancelBtnBg,
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              color: t.cancelBtnText,
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (name.trim() && phone.trim()) {
                onAdd({ name: name.trim(), phone: phone.trim() });
                onClose();
              }
            }}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "12px",
              border: "none",
              background: "#009951",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
              color: "#fff",
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Call Modal ──────────────────────────────────────────────────── */
function CallModal({ contact, onClose, theme }) {
  const t = tk(theme);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: t.modalBg,
          border: t.modalBorder,
          borderRadius: "24px",
          padding: "40px 48px",
          width: "380px",
          textAlign: "center",
          boxShadow: t.modalShadow,
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: theme === "dark" ? "rgba(0,153,81,0.2)" : "#CFF7D3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <PhoneIcon color="#009951" size={32} />
        </div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 800,
            color: t.modalTitle,
            margin: "0 0 6px",
          }}
        >
          {contact.name}
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: t.modalSubtext,
            margin: "0 0 24px",
          }}
        >
          {contact.phone}
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={onClose}
            style={{
              padding: "14px 32px",
              borderRadius: "12px",
              border: t.cancelBtnBorder,
              background: t.cancelBtnBg,
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              color: t.cancelBtnText,
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              alert(`Calling ${contact.name} at ${contact.phone}…`);
            }}
            style={{
              padding: "14px 32px",
              borderRadius: "12px",
              border: "none",
              background: "#009951",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
              color: "#fff",
            }}
          >
            Call
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Live Map Component ──────────────────────────────────────────── */
function LiveMap({ theme, onLocationUpdate }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    injectLeaflet(() => {
      if (!mapRef.current || mapInstanceRef.current) return;
      const L = window.L;

      // default center: Kuching
      const defaultCoords = [1.5533, 110.3592];

      const tileUrl =
        theme === "dark"
          ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

      const map = L.map(mapRef.current, {
        center: defaultCoords,
        zoom: 15,
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: false,
      });

      L.tileLayer(tileUrl, { maxZoom: 19 }).addTo(map);

      // Custom blue marker
      const blueIcon = L.divIcon({
        className: "",
        html: `<div style="width:16px;height:16px;background:#2F80ED;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 4px rgba(47,128,237,0.3),0 2px 8px rgba(0,0,0,0.4);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      const marker = L.marker(defaultCoords, { icon: blueIcon }).addTo(map);
      mapInstanceRef.current = map;
      markerRef.current = marker;

      // Geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude: lat, longitude: lng } = pos.coords;
            map.setView([lat, lng], 16);
            marker.setLatLng([lat, lng]);
            onLocationUpdate(lat, lng);
            setLoading(false);
          },
          () => {
            // fallback to default Kuching
            onLocationUpdate(defaultCoords[0], defaultCoords[1]);
            setLoading(false);
          },
          { enableHighAccuracy: true, timeout: 8000 },
        );
      } else {
        onLocationUpdate(defaultCoords[0], defaultCoords[1]);
        setLoading(false);
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update tile layer on theme change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !window.L) return;
    const L = window.L;
    map.eachLayer((layer) => {
      if (layer._url) map.removeLayer(layer);
    });
    const tileUrl =
      theme === "dark"
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
    L.tileLayer(tileUrl, { maxZoom: 19 }).addTo(map);
  }, [theme]);

  return (
    <div
      style={{
        flex: 1,
        borderRadius: "18px",
        overflow: "hidden",
        position: "relative",
        minHeight: 0,
      }}
    >
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "18px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                border: "3px solid rgba(255,255,255,0.3)",
                borderTopColor: "#fff",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <span style={{ color: "#fff", fontSize: "12px", fontWeight: 600 }}>
              Locating…
            </span>
          </div>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

/* ── EmergencyPage ───────────────────────────────────────────────── */
export default function EmergencyPage({ navActive, setNavActive, theme }) {
  const [autoEmergency, setAutoEmergency] = useState(true);
  const [confirmTurnOff, setConfirmTurnOff] = useState(false);
  const [sosModal, setSosModal] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [callModal, setCallModal] = useState(null);
  const [locationSent, setLocationSent] = useState(false);
  const [address, setAddress] = useState("Locating…");
  const [contacts, setContacts] = useState([
    { name: "Mom", phone: "+60 12 345 6789" },
    { name: "Alice", phone: "+60 12 345 6789" },
    { name: "John (Brother)", phone: "+60 12 345 6789" },
  ]);
  // editingIdx: which contact row is in "delete mode"
  const [editingIdx, setEditingIdx] = useState(null);
  // longpress timer refs per contact index
  const longPressTimers = useRef({});

  const t = tk(theme);

  /* Reverse geocode lat/lng → address string */
  const handleLocationUpdate = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        { headers: { "Accept-Language": "en" } },
      );
      const data = await res.json();
      const { road, suburb, city, town, state, country } = data.address || {};
      const parts = [road, suburb || town, city, state].filter(Boolean);
      setAddress(
        parts.slice(0, 3).join(", ") ||
          data.display_name ||
          `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      );
    } catch {
      setAddress("Jalan Setia Raja, Kuching, Sarawak");
    }
  };

  const handleAutoEmergencyToggle = (newVal) => {
    if (!newVal) setConfirmTurnOff(true);
    else setAutoEmergency(true);
  };

  const handleSendLocation = () => {
    setLocationSent(true);
    setTimeout(() => setLocationSent(false), 2500);
  };

  /* ── Contact long-press to reveal delete badge ── */
  const handleContactPointerDown = (e, idx) => {
    // prevent text selection
    e.currentTarget.style.transform = "scale(0.96)";
    e.currentTarget.style.opacity = "0.85";
    longPressTimers.current[idx] = setTimeout(() => {
      setEditingIdx(idx);
    }, 550);
  };
  const handleContactPointerUp = (e, idx) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.opacity = "1";
    clearTimeout(longPressTimers.current[idx]);
  };
  const handleContactPointerLeave = (e, idx) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.opacity = "1";
    clearTimeout(longPressTimers.current[idx]);
  };

  const handleContactClick = (idx, contact) => {
    if (editingIdx === idx) return; // don't open call while in edit mode
    setCallModal(contact);
  };

  const handleRemoveContact = (e, idx) => {
    e.stopPropagation();
    setContacts((prev) => prev.filter((_, i) => i !== idx));
    setEditingIdx(null);
  };

  const pressSend = usePressEffect();
  const pressSOS = usePressEffect();
  const pressAdd = usePressEffect();

  const glassCard = {
    background: t.cardBg,
    backdropFilter: t.cardBackdrop,
    WebkitBackdropFilter: t.cardBackdrop,
    borderRadius: "38px",
    border: t.cardBorder,
    boxShadow: t.cardShadow,
    display: "flex",
    flexDirection: "column",
    transition: "background 0.3s, border 0.3s",
  };

  return (
    <div
      style={{
        position: "relative",
        width: "1280px",
        height: "800px",
        fontFamily: "'Inter',sans-serif",
        overflow: "hidden",
        userSelect: "none",
        background: t.pageBg,
        transition: "background 0.3s",
      }}
    >
      {/* Blobs */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background: t.blobA,
          borderRadius: "50%",
          top: "-100px",
          right: "-100px",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "380px",
          height: "380px",
          background: t.blobB,
          borderRadius: "50%",
          bottom: "60px",
          left: "80px",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Status bar */}
      <div
        style={{
          position: "absolute",
          top: "25px",
          left: "60px",
          display: "flex",
          alignItems: "center",
          gap: "25px",
          zIndex: 5,
        }}
      >
        <WifiIcon theme={theme} />
        <BluetoothIcon theme={theme} />
      </div>
      <div
        style={{
          position: "absolute",
          top: "25px",
          right: "60px",
          zIndex: 5,
          width: "50px",
          height: "50px",
          background: t.avatarBg,
          backdropFilter: "blur(10px)",
          border: t.avatarBorder,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: t.avatarShadow,
          cursor: "pointer",
        }}
      >
        <UserIcon theme={theme} />
      </div>

      {/* 3-card layout */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -52%)",
          display: "flex",
          gap: "20px",
          alignItems: "stretch",
          width: "1160px",
        }}
      >
        {/* ── CARD 1: Vehicle Location ── */}
        <div
          style={{
            ...glassCard,
            flex: 1,
            padding: "28px 24px",
            gap: "14px",
            height: "420px",
          }}
        >
          {/* Header — centered like "Emergency Controls" */}
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: t.textMuted,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            VEHICLE LOCATION
          </span>

          {/* Live Map */}
          <LiveMap theme={theme} onLocationUpdate={handleLocationUpdate} />

          {/* Address */}
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: t.addresText,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <LocationPinIcon color={t.textMuted} size={13} />
            {address}
          </div>

          {/* Send Location */}
          <button
            onClick={handleSendLocation}
            {...pressSend}
            style={{
              width: "100%",
              height: "48px",
              background: locationSent
                ? "linear-gradient(135deg,#22C55E,#16A34A)"
                : "linear-gradient(135deg,#2F80ED,#56CCF2)",
              border: "none",
              borderRadius: "16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              transition: "transform 0.1s,opacity 0.1s,background 0.3s",
              outline: "none",
              boxShadow: locationSent
                ? "0 8px 20px rgba(34,197,94,0.3)"
                : "0 8px 20px rgba(47,128,237,0.3)",
              flexShrink: 0,
            }}
          >
            <SendIcon color="#fff" size={17} />
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>
              {locationSent ? "Location Sent!" : "Send Location"}
            </span>
          </button>
        </div>

        {/* ── CARD 2: Trusted Contacts ── */}
        <div
          style={{
            ...glassCard,
            flex: 1,
            padding: "28px 22px",
            gap: "14px",
            height: "420px",
          }}
          onClick={() => {
            if (editingIdx !== null) setEditingIdx(null);
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ContactsIcon theme={theme} />
            <span
              style={{
                flex: 1,
                fontSize: "11px",
                fontWeight: 700,
                color: t.textMuted,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              TRUSTED CONTACTS
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setAddContactModal(true);
              }}
              {...pressAdd}
              style={{
                width: "32px",
                height: "32px",
                background: "#aeaeae",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1,
                flexShrink: 0,
                outline: "none",
                transition: "transform 0.1s,opacity 0.1s",
                boxShadow: "0 4px 12px rgba(170,170,170,0.3)",
              }}
            >
              +
            </button>
          </div>

          {editingIdx !== null && (
            <div
              style={{
                fontSize: "11px",
                color: t.textMuted,
                fontWeight: 600,
                textAlign: "center",
                marginBottom: "-4px",
              }}
            >
              Tap − to remove, or tap elsewhere to cancel
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              flex: 1,
              overflowY: "auto",
            }}
          >
            {contacts.map((contact, idx) => (
              <div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  handleContactClick(idx, contact);
                }}
                onPointerDown={(e) => handleContactPointerDown(e, idx)}
                onPointerUp={(e) => handleContactPointerUp(e, idx)}
                onPointerLeave={(e) => handleContactPointerLeave(e, idx)}
                style={{
                  position: "relative",
                  width: "100%",
                  background:
                    editingIdx === idx ? t.contactEditBg : t.contactBg,
                  border:
                    editingIdx === idx ? t.contactEditBorder : t.contactBorder,
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 16px",
                  boxSizing: "border-box",
                  gap: "12px",
                  cursor: "pointer",
                  transition:
                    "background 0.2s,border 0.2s,transform 0.12s,opacity 0.12s",
                  flexShrink: 0,
                }}
              >
                {/* Delete badge — shows when this row is in edit mode; stays until tapped */}
                {editingIdx === idx && (
                  <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => handleRemoveContact(e, idx)}
                    style={{
                      position: "absolute",
                      top: "-1px",
                      left: "-1px",
                      width: "24px",
                      height: "24px",
                      background: "#FF3B30",
                      border: "2px solid #fff",
                      borderRadius: "50%",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                      boxShadow: "0 2px 8px rgba(255,59,48,0.4)",
                      outline: "none",
                      animation: "popIn 0.18s ease",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 2l6 6M8 2l-6 6"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                )}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "14px",
                    background: t.avatarGradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "17px",
                      fontWeight: 800,
                      color: t.avatarText,
                    }}
                  >
                    {contact.name[0]}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: t.contactName,
                    }}
                  >
                    {contact.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: t.contactPhone,
                    }}
                  >
                    {contact.phone}
                  </div>
                </div>
                <PhoneIcon
                  color={editingIdx === idx ? "#FF3B30" : "#009951"}
                  size={18}
                />
              </div>
            ))}
          </div>
          <style>{`@keyframes popIn{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}`}</style>
        </div>

        {/* ── CARD 3: Emergency Controls ── */}
        <div
          style={{
            ...glassCard,
            flex: 1,
            padding: "28px 24px",
            gap: "16px",
            height: "420px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: t.textMuted,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            EMERGENCY CONTROLS
          </span>

          {/* Auto Emergency Assistance */}
          <div
            style={{
              background: t.autoEmergBg,
              borderRadius: "22px",
              border: t.autoEmergBorder,
              padding: "18px 18px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "54px",
                height: "54px",
                flexShrink: 0,
                background: t.autoEmergIconBg,
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CarEmergencyIcon />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: t.textPrimary,
                  lineHeight: 1.35,
                  marginBottom: "3px",
                }}
              >
                Auto Emergency
                <br />
                Assistance
              </div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  color: t.textMuted,
                }}
              >
                Activates on severe crash detection.
              </div>
            </div>
            <SmallToggle
              checked={autoEmergency}
              onChange={handleAutoEmergencyToggle}
              theme={theme}
            />
          </div>

          {/* SOS Button */}
          <button
            onClick={() => setSosModal(true)}
            {...pressSOS}
            style={{
              width: "100%",
              flex: "0 0 auto",
              height: "200px",
              background:
                "linear-gradient(145deg,#EC221F 0%,#FF5252 60%,#FF7676 100%)",
              border: "none",
              borderRadius: "28px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              boxShadow: "0 14px 40px rgba(236,34,31,0.38)",
              outline: "none",
              transition: "transform 0.1s,opacity 0.1s",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "72px",
                height: "72px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PhoneIcon color="#fff" size={34} />
              </div>
            </div>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "3px",
              }}
            >
              SOS EMERGENCY
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.72)",
                letterSpacing: "0.5px",
              }}
            >
              Tap to call emergency services
            </span>
            <style>{`@keyframes pulse{0%,100%{transform:scale(1);opacity:0.6}50%{transform:scale(1.35);opacity:0}}`}</style>
          </button>
        </div>
      </div>

      <BottomNav active={navActive} setActive={setNavActive} theme={theme} />

      {sosModal && <SOSModal onClose={() => setSosModal(false)} />}
      {confirmTurnOff && (
        <TurnOffConfirmModal
          onKeepOn={() => setConfirmTurnOff(false)}
          onTurnOff={() => {
            setAutoEmergency(false);
            setConfirmTurnOff(false);
          }}
        />
      )}
      {addContactModal && (
        <AddContactModal
          onClose={() => setAddContactModal(false)}
          onAdd={(c) => setContacts((p) => [...p, c])}
          theme={theme}
        />
      )}
      {callModal && (
        <CallModal
          contact={callModal}
          onClose={() => setCallModal(null)}
          theme={theme}
        />
      )}
    </div>
  );
}
