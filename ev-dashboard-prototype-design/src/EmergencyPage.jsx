import { useState } from "react";
import BottomNav from "./BottomNav";

// EmergencyPage.jsx — redesigned to match WeatherPage glass aesthetic

/* ─── Press Effect Hook ──────────────────────────────────────────────────── */
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

/* ─── SVG Icons ──────────────────────────────────────────────────────────── */
const WifiIcon = () => (
  <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
    <path d="M16 20a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fill="#1E1E1E" />
    <path
      d="M8 13.5C10.2 11.2 12.9 10 16 10s5.8 1.2 8 3.5"
      stroke="#1E1E1E"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M2 7C5.8 3.1 10.6 1 16 1s10.2 2.1 14 6"
      stroke="#1E1E1E"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const BluetoothIcon = () => (
  <svg width="22" height="32" viewBox="0 0 22 32" fill="none">
    <path
      d="M3 8L19 16 3 24"
      stroke="#1E1E1E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 8L3 16l16 8"
      stroke="#1E1E1E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="10" r="5.5" stroke="#9AA1B1" strokeWidth="2" />
    <path
      d="M3 26c0-6.1 4.9-11 11-11s11 4.9 11 11"
      stroke="#9AA1B1"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

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

const ContactsIcon = () => (
  <svg width="36" height="36" viewBox="0 0 45 45" fill="none">
    <circle
      cx="18"
      cy="17"
      r="6"
      stroke="#9AA1B1"
      strokeWidth="2.5"
      fill="none"
    />
    <path
      d="M6 38c0-7 5.4-12 12-12s12 5 12 12"
      stroke="#9AA1B1"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M30 20c2.5 0 4.5 2 4.5 4.5S32.5 29 30 29"
      stroke="#9AA1B1"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M34 36c2-1.5 3-3.5 3-6"
      stroke="#9AA1B1"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

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

/* ─── Map Placeholder ────────────────────────────────────────────────────── */
function MapPlaceholder() {
  return (
    <div
      style={{
        width: "100%",
        flex: 1,
        borderRadius: "18px",
        overflow: "hidden",
        position: "relative",
        background:
          "linear-gradient(160deg, #a8d8ea 0%, #72bcd4 40%, #5aacca 60%, #4a9ab8 80%, #c8e6c9 85%, #a5d6a7 100%)",
        minHeight: "160px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "60%",
          height: "100%",
          background: "linear-gradient(180deg, #7ec8e3 0%, #5aacca 100%)",
          clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "55%",
          height: "100%",
          background:
            "linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 50%, #81c784 100%)",
          clipPath:
            "polygon(0% 0%, 85% 0%, 60% 40%, 80% 70%, 50% 100%, 0% 100%)",
        }}
      />
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        viewBox="0 0 313 177"
      >
        <path
          d="M80 30 Q120 60 150 90 Q180 120 160 177"
          stroke="#fff"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M0 80 Q60 85 100 100 Q150 115 200 110 Q250 105 300 120"
          stroke="#fff"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <text x="75" y="95" fontSize="9" fill="#555" fontFamily="sans-serif">
          Lundu
        </text>
        <text
          x="130"
          y="88"
          fontSize="10"
          fill="#333"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          Kuching
        </text>
        <text x="245" y="80" fontSize="8" fill="#666" fontFamily="sans-serif">
          Sebuyau
        </text>
        <circle cx="155" cy="83" r="6" fill="#EC221F" />
        <circle cx="155" cy="83" r="3" fill="#fff" />
        <circle cx="155" cy="83" r="10" fill="#EC221F" fillOpacity="0.25" />
      </svg>
    </div>
  );
}

/* ─── Small Toggle ───────────────────────────────────────────────────────── */
function SmallToggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: "56px",
        height: "30px",
        background: checked
          ? "linear-gradient(270deg, #FF0E00 11%, #EC756E 76%)"
          : "#D1D1D6",
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

/* ─── Turn Off Confirm Modal ─────────────────────────────────────────────── */
function TurnOffConfirmModal({ onKeepOn, onTurnOff }) {
  const pressTurnOff = usePressEffect();
  const pressKeepOn = usePressEffect();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        background: "rgba(0,0,0,0.45)",
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
            {...pressTurnOff}
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
              fontFamily: "'Inter', sans-serif",
              outline: "none",
              transition: "transform 0.1s, opacity 0.1s",
            }}
          >
            Turn Off
          </button>
          <button
            onClick={onKeepOn}
            {...pressKeepOn}
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
              fontFamily: "'Inter', sans-serif",
              outline: "none",
              transition: "transform 0.1s, opacity 0.1s",
            }}
          >
            Keep On
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── SOS Modal ──────────────────────────────────────────────────────────── */
function SOSModal({ onClose }) {
  const pressCall = usePressEffect();
  const pressCancel = usePressEffect();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        background: "rgba(0,0,0,0.5)",
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
            {...pressCall}
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
              fontFamily: "'Inter', sans-serif",
              boxShadow: "0px 15px 50px rgba(255,21,0,0.4)",
              outline: "none",
              transition: "transform 0.1s, opacity 0.1s",
            }}
          >
            Call Now
          </button>
          <button
            onClick={onClose}
            {...pressCancel}
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
              fontFamily: "'Inter', sans-serif",
              outline: "none",
              transition: "transform 0.1s, opacity 0.1s",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Add Contact Modal ──────────────────────────────────────────────────── */
function AddContactModal({ onClose, onAdd }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1.5px solid #ddd",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "36px 40px",
          width: "380px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "#1E1E1E",
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
              border: "2px solid #ddd",
              background: "#f5f5f5",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              color: "#333",
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

/* ─── Call Modal ─────────────────────────────────────────────────────────── */
function CallModal({ contact, onClose }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "40px 48px",
          width: "380px",
          textAlign: "center",
          boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "#CFF7D3",
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
            color: "#1E1E1E",
            margin: "0 0 6px",
          }}
        >
          {contact.name}
        </h2>
        <p style={{ fontSize: "15px", color: "#767676", margin: "0 0 24px" }}>
          {contact.phone}
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={onClose}
            style={{
              padding: "14px 32px",
              borderRadius: "12px",
              border: "2px solid #ddd",
              background: "#f5f5f5",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
              color: "#333",
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

/* ─── EmergencyPage ──────────────────────────────────────────────────────── */
export default function EmergencyPage({ navActive, setNavActive }) {
  const [autoEmergency, setAutoEmergency] = useState(true);
  const [confirmTurnOff, setConfirmTurnOff] = useState(false);
  const [sosModal, setSosModal] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [callModal, setCallModal] = useState(null);
  const [locationSent, setLocationSent] = useState(false);
  const [contacts, setContacts] = useState([
    { name: "Mom", phone: "+60 12 345 6789" },
    { name: "Alice", phone: "+60 12 345 6789" },
    { name: "John (Brother)", phone: "+60 12 345 6789" },
  ]);

  const handleAutoEmergencyToggle = (newVal) => {
    if (!newVal) setConfirmTurnOff(true);
    else setAutoEmergency(true);
  };

  const handleSendLocation = () => {
    setLocationSent(true);
    setTimeout(() => setLocationSent(false), 2500);
  };

  const pressSend = usePressEffect();
  const pressSOS = usePressEffect();
  const pressAdd = usePressEffect();

  // Long-press state: which contact index is in "edit mode" (showing remove button)
  const [editingIdx, setEditingIdx] = useState(null);
  const longPressTimers = {};

  const handleContactMouseDown = (idx) => {
    longPressTimers[idx] = setTimeout(() => {
      setEditingIdx(idx);
    }, 600);
  };
  const handleContactMouseUp = (idx) => {
    clearTimeout(longPressTimers[idx]);
  };
  const handleContactClick = (idx, contact) => {
    if (editingIdx !== null) {
      // tap anywhere outside to exit edit mode
      setEditingIdx(null);
      return;
    }
    setCallModal(contact);
  };
  const handleRemoveContact = (e, idx) => {
    e.stopPropagation();
    setContacts((prev) => prev.filter((_, i) => i !== idx));
    setEditingIdx(null);
  };

  const glassCard = {
    background: "rgba(255,255,255,0.65)",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
    borderRadius: "38px",
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "0 25px 60px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div
      style={{
        position: "relative",
        width: "1280px",
        height: "800px",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        userSelect: "none",
        background:
          "linear-gradient(135deg, #E6F3F0 0%, #EBF6F5 50%, #EFF3F8 100%)",
      }}
    >
      {/* Background accents */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background: "rgba(255,255,255,0.35)",
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
          background: "rgba(236,34,31,0.05)",
          borderRadius: "50%",
          bottom: "60px",
          left: "80px",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Top Status Bar */}
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
        <WifiIcon />
        <BluetoothIcon />
      </div>
      <div
        style={{
          position: "absolute",
          top: "25px",
          right: "60px",
          zIndex: 5,
          width: "50px",
          height: "50px",
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.6)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}
      >
        <UserIcon />
      </div>

      {/* ── 3 Cards Layout ── */}
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
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <LocationPinIcon color="#2F80ED" size={22} />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#9AA1B1",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              VEHICLE LOCATION
            </span>
          </div>

          {/* Map */}
          <div
            style={{
              flex: 1,
              borderRadius: "18px",
              overflow: "hidden",
              position: "relative",
              background:
                "linear-gradient(160deg, #a8d8ea 0%, #72bcd4 40%, #5aacca 60%, #4a9ab8 80%, #c8e6c9 85%, #a5d6a7 100%)",
              minHeight: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "60%",
                height: "100%",
                background: "linear-gradient(180deg, #7ec8e3 0%, #5aacca 100%)",
                clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "55%",
                height: "100%",
                background:
                  "linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 50%, #81c784 100%)",
                clipPath:
                  "polygon(0% 0%, 85% 0%, 60% 40%, 80% 70%, 50% 100%, 0% 100%)",
              }}
            />
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
              viewBox="0 0 313 240"
            >
              <path
                d="M80 40 Q120 80 150 120 Q180 160 160 240"
                stroke="#fff"
                strokeWidth="2"
                fill="none"
                opacity="0.7"
              />
              <path
                d="M0 110 Q60 115 100 130 Q150 148 200 143 Q250 138 300 155"
                stroke="#fff"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
              />
              <text
                x="75"
                y="125"
                fontSize="9"
                fill="#555"
                fontFamily="sans-serif"
              >
                Lundu
              </text>
              <text
                x="130"
                y="115"
                fontSize="10"
                fill="#333"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                Kuching
              </text>
              <text
                x="245"
                y="105"
                fontSize="8"
                fill="#666"
                fontFamily="sans-serif"
              >
                Sebuyau
              </text>
              <circle cx="155" cy="110" r="7" fill="#EC221F" />
              <circle cx="155" cy="110" r="3.5" fill="#fff" />
              <circle
                cx="155"
                cy="110"
                r="13"
                fill="#EC221F"
                fillOpacity="0.22"
              />
            </svg>
          </div>

          {/* Address */}
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#555",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <LocationPinIcon color="#9AA1B1" size={13} />
            Jalan Setia Raja, Kuching, Sarawak
          </div>

          {/* Send Location button */}
          <button
            onClick={handleSendLocation}
            {...pressSend}
            style={{
              width: "100%",
              height: "48px",
              background: locationSent
                ? "linear-gradient(135deg, #22C55E, #16A34A)"
                : "linear-gradient(135deg, #2F80ED, #56CCF2)",
              border: "none",
              borderRadius: "16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              transition: "transform 0.1s, opacity 0.1s, background 0.3s",
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
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ContactsIcon />
            <span
              style={{
                flex: 1,
                fontSize: "11px",
                fontWeight: 700,
                color: "#9AA1B1",
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
                transition: "transform 0.1s, opacity 0.1s",
                boxShadow: "0 4px 12px rgba(170, 170, 170, 0.3)",
              }}
            >
              +
            </button>
          </div>

          {/* Hint text when editing */}
          {editingIdx !== null && (
            <div
              style={{
                fontSize: "11px",
                color: "#9AA1B1",
                fontWeight: 600,
                textAlign: "center",
                marginBottom: "-4px",
              }}
            >
              Tap the − to remove, or tap elsewhere to cancel
            </div>
          )}

          {/* Contact list */}
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
                onMouseDown={() => handleContactMouseDown(idx)}
                onMouseUp={() => handleContactMouseUp(idx)}
                onTouchStart={() => handleContactMouseDown(idx)}
                onTouchEnd={() => handleContactMouseUp(idx)}
                style={{
                  position: "relative",
                  width: "100%",
                  background:
                    editingIdx === idx
                      ? "rgba(255,107,107,0.08)"
                      : "rgba(211, 255, 222, 0.9)",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 16px",
                  boxSizing: "border-box",
                  gap: "12px",
                  border:
                    editingIdx === idx
                      ? "1px solid rgba(255,107,107,0.25)"
                      : "1px solid rgba(255,255,255,0.7)",
                  cursor: "pointer",
                  transition: "background 0.2s, border 0.2s, transform 0.1s",
                  flexShrink: 0,
                }}
              >
                {/* Remove button — appears on long press */}
                {editingIdx === idx && (
                  <button
                    onClick={(e) => handleRemoveContact(e, idx)}
                    style={{
                      position: "absolute",
                      top: "-8px",
                      left: "-8px",
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

                {/* Avatar */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #93ffc9, #e3ffbc)",
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
                      color: "#006a19",
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
                      color: "#303030",
                    }}
                  >
                    {contact.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#9AA1B1",
                    }}
                  >
                    {contact.phone}
                  </div>
                </div>
                {/* Phone icon on right — decorative, row is clickable */}
                <PhoneIcon
                  color={editingIdx === idx ? "#FF3B30" : "#009951"}
                  size={18}
                />
              </div>
            ))}
          </div>
          <style>{`@keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
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
              color: "#9AA1B1",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            EMERGENCY CONTROLS
          </span>

          {/* Auto Emergency Assistance */}
          <div
            style={{
              background: "rgba(244,247,250,0.9)",
              borderRadius: "22px",
              border: "1px solid rgba(255,107,107,0.18)",
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
                background: "rgba(253,211,208,0.55)",
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
                  color: "#303030",
                  lineHeight: 1.35,
                  marginBottom: "3px",
                }}
              >
                Auto Emergency
                <br />
                Assistance
              </div>
              <div
                style={{ fontSize: "11px", fontWeight: 500, color: "#9AA1B1" }}
              >
                Activates on severe crash detection.
              </div>
            </div>
            <SmallToggle
              checked={autoEmergency}
              onChange={handleAutoEmergencyToggle}
            />
          </div>

          {/* SOS Emergency button */}
          <button
            onClick={() => setSosModal(true)}
            {...pressSOS}
            style={{
              width: "100%",
              flex: "0 0 auto",
              height: "200px",
              background:
                "linear-gradient(145deg, #EC221F 0%, #FF5252 60%, #FF7676 100%)",
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
              transition: "transform 0.1s, opacity 0.1s",
            }}
          >
            {/* Pulsing ring */}
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
            <style>{`@keyframes pulse { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.35);opacity:0} }`}</style>
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav active={navActive} setActive={setNavActive} />

      {/* Modals */}
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
        />
      )}
      {callModal && (
        <CallModal contact={callModal} onClose={() => setCallModal(null)} />
      )}
    </div>
  );
}
