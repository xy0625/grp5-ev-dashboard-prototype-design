import React, { useState } from 'react';
import BottomNav from "./BottomNav";

/* ── Theme tokens ──────────────────────────────────────────────── */
function tk(theme) {
  const dark = theme === "dark";
  return {
    pageBg:      dark ? "#0F1117" : "linear-gradient(150deg, #f5edd8 0%, #ede5d0 60%, #c9a84c44 100%)",
    cardBg:      dark ? "rgba(28,31,42,0.95)" : "rgba(255,255,255,0.82)",
    cardBorder:  dark ? "1px solid #2C2F3E" : "1px solid rgba(201,168,76,0.28)",
    textPrimary: dark ? "#E8EAF0" : "#1a1a1a",
    textSecond:  dark ? "#9CA3AF" : "#666",
    inputBg:     dark ? "#252836" : "#fff",
    inputBorder: dark ? "2.5px solid #3A3F52" : "2.5px solid #C9A84C",
    fieldBg:     dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
    fieldBorder: dark ? "1px solid #2C2F3E" : "1px solid rgba(0,0,0,0.04)",
    statBg:      dark ? "#1E2235" : "#fff",
    statBorder:  dark ? "1px solid #2C2F3E" : "1px solid rgba(201,168,76,0.15)",
    topBarBg:    dark ? "rgba(15,17,23,0.9)" : "rgba(255,255,255,0.6)",
    topBarBorder:dark ? "1px solid #2C2F3E" : "1px solid rgba(201,168,76,0.28)",
    vehicleBg:   dark ? "rgba(201,168,76,0.08)" : "rgba(201,168,76,0.06)",
    vehicleBorder:dark? "1px solid #2C2F3E" : "1px solid rgba(201,168,76,0.25)",
    securityBg:  dark ? "#252836" : "#fff",
    divider:     dark ? "#2C2F3E" : "rgba(201,168,76,0.2)",
    logoutBorder:dark ? "1px solid #2C2F3E" : "2px solid #eee",
    logoutColor: dark ? "#E8EAF0" : "#333",
    logoutBg:    dark ? "#1E2235" : "#fff",
    shadow:      dark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 32px rgba(140,100,20,0.09)",
    stripeBg:    dark
      ? "repeating-linear-gradient(118deg,transparent,transparent 80px,rgba(255,255,255,0.02) 80px,rgba(255,255,255,0.02) 81px)"
      : "repeating-linear-gradient(118deg,transparent,transparent 80px,rgba(255,255,255,0.1) 80px,rgba(255,255,255,0.1) 81px)",
  };
}

export default function AccountPage({ navActive, setNavActive, onLogout, theme = "light" }) {
  const [editMode, setEditMode] = useState("none");
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  const [userData, setUserData] = useState({
    name: "USER NAME", email: "user@example.com",
    licenseId: "ABC-12345", phone: "+60 12-345 6789"
  });
  const [vehicleData, setVehicleData] = useState({
    model: "Borneo X1", plate: "QA 1234 B", battery: "82 kWh"
  });
  const [tempProfile, setTempProfile] = useState({ ...userData });
  const [tempVehicle, setTempVehicle] = useState({ ...vehicleData });

  const t = tk(theme);

  const gold     = "#C9A84C";
  const goldDark = "#8a6010";
  const goldLight = "rgba(201,168,76,0.12)";

  const handleEditProfile = () => { setTempProfile({ ...userData }); setEditMode("profile"); };
  const handleEditVehicle = () => { setTempVehicle({ ...vehicleData }); setEditMode("vehicle"); };
  const handleSave        = () => { if (editMode === "profile") setUserData({ ...tempProfile }); if (editMode === "vehicle") setVehicleData({ ...tempVehicle }); setEditMode("none"); };
  const handleDiscard     = () => setEditMode("none");

  /* ── Shared style objects (use t.* tokens) ─────────────────── */
  const lbl = {
    display: "block", fontSize: 13, fontWeight: 800,
    letterSpacing: "1.5px", color: t.textSecond,
    marginBottom: 8, textAlign: "center",
  };
  const fieldBox = {
    background: t.fieldBg, borderRadius: 12,
    padding: "14px 15px", fontSize: 18, fontWeight: 700,
    color: t.textPrimary, border: t.fieldBorder,
    textAlign: "center", display: "flex",
    alignItems: "center", justifyContent: "center", minHeight: "28px",
  };
  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    background: t.inputBg, borderRadius: 12,
    padding: "14px 15px", fontSize: 18, fontWeight: 600,
    color: t.textPrimary, border: t.inputBorder,
    outline: "none", textAlign: "center", fontFamily: "inherit",
  };
  const outlineBtn = {
    padding: "12px 24px", borderRadius: 30,
    background: theme === "dark" ? "#1E2235" : "#fff",
    border: `2px solid ${gold}`,
    color: goldDark, fontWeight: 800, fontSize: 15, cursor: "pointer",
  };
  const goldBtn = {
    ...outlineBtn,
    background: `linear-gradient(135deg, ${gold}, ${goldDark})`,
    color: "#fff", border: "none",
  };

  return (
    <div style={{
      position: "relative", width: 1280, height: 800,
      background: t.pageBg,
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      overflow: "hidden",
      transition: "background 0.3s",
    }}>

      {/* Stripe texture */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: t.stripeBg }} />

      {/* ── TOP BAR ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 55,
        background: t.topBarBg, backdropFilter: "blur(10px)",
        borderBottom: t.topBarBorder,
        display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 30px", zIndex: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <svg width="22" height="17" viewBox="0 0 26 20" fill="none">
            <circle cx="13" cy="17" r="2.3" fill={t.textSecond}/>
            <path d="M7 11.5a8.5 8.5 0 0112 0" stroke={t.textSecond} strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 7.5A13.5 13.5 0 0123 7.5" stroke={t.textSecond} strokeWidth="2" strokeLinecap="round"/>
            <path d="M0 3.5A18 18 0 0126 3.5" stroke={t.textSecond} strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <svg width="13" height="20" viewBox="0 0 16 24" fill="none">
            <path d="M3 6l10 12-5 5V1l5 5L3 18" stroke={t.textSecond} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "1.2px", color: t.textSecond }}>
          DRIVER PROFILE
        </span>
      </div>

      {/* ── MAIN CARD GRID ── */}
      <div style={{
        position: "absolute",
        width: 1100, height: 560,
        top: "43%", left: "50%", transform: "translate(-50%, -50%)",
        display: "grid", gridTemplateColumns: "280px 1fr",
        gap: 20, zIndex: 5,
      }}>

        {/* ═══ LEFT SIDEBAR ═══ */}
        <div style={{
          background: t.cardBg, backdropFilter: "blur(24px)",
          borderRadius: 24, border: t.cardBorder,
          boxShadow: t.shadow,
          display: "flex", flexDirection: "column",
          alignItems: "center", padding: "30px 20px", gap: 15,
        }}>

          {/* Avatar */}
          <div style={{
            width: 110, height: 110, borderRadius: "50%",
            border: `5px solid ${gold}`,
            background: theme === "dark" ? "#2A2340" : "#dcd0b8",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 0 8px ${goldLight}`, flexShrink: 0, overflow: "hidden",
          }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ marginTop: 10 }}>
              <circle cx="50" cy="35" r="23" fill={theme === "dark" ? "#5a4e7a" : "#9e8e66"}/>
              <path d="M15 90 Q50 60 85 90" fill={theme === "dark" ? "#5a4e7a" : "#9e8e66"}/>
            </svg>
          </div>

          {/* Name + badge */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: t.textPrimary }}>{userData.name}</div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              marginTop: 8, padding: "6px 18px", borderRadius: 15,
              background: `linear-gradient(135deg, ${gold}, ${goldDark})`,
              fontSize: 13, fontWeight: 900, color: "#fff",
            }}>⭐ PREMIUM</div>
          </div>

          {/* Stats */}
          <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[{ L: "Trips", V: "128" }, { L: "km", V: "4.8k" }, { L: "Score", V: "94" }, { L: "Active", V: "231" }].map(s => (
              <div key={s.L} style={{
                background: t.statBg, borderRadius: 12,
                padding: "12px 5px", textAlign: "center",
                border: t.statBorder,
              }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: goldDark }}>{s.V}</div>
                <div style={{ fontSize: 11, color: t.textSecond, fontWeight: 800 }}>{s.L}</div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {/* Log Out */}
          {editMode === "none" && (
            <button onClick={onLogout} style={{
              width: "100%", height: 48, borderRadius: 24,
              background: t.logoutBg, border: t.logoutBorder,
              fontSize: 14, fontWeight: 900, cursor: "pointer",
              color: t.logoutColor,
            }}>LOG OUT</button>
          )}
        </div>

        {/* ═══ RIGHT CONTENT ═══ */}
        <div style={{
          background: t.cardBg, backdropFilter: "blur(24px)",
          borderRadius: 24, border: t.cardBorder,
          boxShadow: t.shadow,
          display: "flex", flexDirection: "column",
          padding: "30px 40px", gap: 20,
        }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 900, color: t.textPrimary }}>
                {editMode === "vehicle" ? "Vehicle Settings" : "Account Details"}
              </div>
              <div style={{ fontSize: 15, color: t.textSecond }}>
                {editMode === "vehicle" ? "Update your EV specifications" : "Manage security and profile settings"}
              </div>
            </div>
            {editMode === "none" && (
              <div style={{ display: "flex", gap: 12 }}>
                <button style={outlineBtn} onClick={handleEditVehicle}>Edit Vehicle</button>
                <button style={goldBtn} onClick={handleEditProfile}>Edit Profile</button>
              </div>
            )}
          </div>

          {/* Fields Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {editMode === "vehicle" ? (
              <>
                <div><span style={lbl}>CAR MODEL</span><input value={tempVehicle.model} onChange={e => setTempVehicle({ ...tempVehicle, model: e.target.value })} style={inputStyle}/></div>
                <div><span style={lbl}>PLATE NUMBER</span><input value={tempVehicle.plate} onChange={e => setTempVehicle({ ...tempVehicle, plate: e.target.value })} style={inputStyle}/></div>
                <div><span style={lbl}>BATTERY CAPACITY</span><input value={tempVehicle.battery} onChange={e => setTempVehicle({ ...tempVehicle, battery: e.target.value })} style={inputStyle}/></div>
                <div style={{ opacity: 0.5 }}><span style={lbl}>REGISTRATION</span><div style={fieldBox}>Active</div></div>
              </>
            ) : (
              <>
                <div><span style={lbl}>DRIVER NAME</span>{editMode === "profile" ? <input value={tempProfile.name} onChange={e => setTempProfile({ ...tempProfile, name: e.target.value })} style={inputStyle}/> : <div style={fieldBox}>{userData.name}</div>}</div>
                <div><span style={lbl}>EMAIL ADDRESS</span>{editMode === "profile" ? <input value={tempProfile.email} onChange={e => setTempProfile({ ...tempProfile, email: e.target.value })} style={inputStyle}/> : <div style={fieldBox}>{userData.email}</div>}</div>
                <div><span style={lbl}>LICENSE ID</span>{editMode === "profile" ? <input value={tempProfile.licenseId} onChange={e => setTempProfile({ ...tempProfile, licenseId: e.target.value })} style={inputStyle}/> : <div style={fieldBox}>{userData.licenseId}</div>}</div>
                <div><span style={lbl}>EMERGENCY CONTACT</span>{editMode === "profile" ? <input value={tempProfile.phone} onChange={e => setTempProfile({ ...tempProfile, phone: e.target.value })} style={inputStyle}/> : <div style={fieldBox}>{userData.phone}</div>}</div>
              </>
            )}
          </div>

          {/* Security Section */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 900, color: goldDark, letterSpacing: "1.5px", marginBottom: 12, borderBottom: `1px solid ${t.divider}`, paddingBottom: 6 }}>
              SECURITY
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.3fr", gap: 15 }}>
              <button style={{ ...fieldBox, padding: "12px", fontSize: 15, background: t.securityBg, cursor: "pointer", color: t.textPrimary }}>🔑 Change PIN</button>
              <button style={{ ...fieldBox, padding: "12px", fontSize: 15, background: t.securityBg, cursor: "pointer", color: t.textPrimary }}>🔒 Password</button>
              <div style={{ ...fieldBox, padding: "0 20px", background: biometricEnabled ? goldLight : t.securityBg }}>
                <span style={{ fontSize: 20, marginRight: 10 }}>🧬</span>
                <span style={{ fontSize: 14, fontWeight: 800, flex: 1, textAlign: "left", color: t.textPrimary }}>Biometrics</span>
                <div onClick={() => setBiometricEnabled(!biometricEnabled)} style={{ width: 40, height: 20, borderRadius: 10, background: biometricEnabled ? gold : "#555", position: "relative", cursor: "pointer" }}>
                  <div style={{ position: "absolute", top: 2, left: biometricEnabled ? 22 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "0.2s" }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1 }} />

          {/* Footer */}
          {editMode !== "none" ? (
            <div style={{ display: "flex", gap: 20, justifyContent: "flex-end" }}>
              <button onClick={handleDiscard} style={{ ...outlineBtn, border: "none", background: "transparent", color: t.textSecond }}>Discard</button>
              <button onClick={handleSave} style={{ ...goldBtn, padding: "14px 45px", fontSize: 16 }}>Save Changes</button>
            </div>
          ) : (
            <div style={{ background: t.vehicleBg, borderRadius: 20, border: t.vehicleBorder, padding: "15px 30px", display: "flex", alignItems: "center", gap: 25 }}>
              <span style={{ fontSize: 32 }}>🚗</span>
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 15 }}>
                {[{ L: "MODEL", V: vehicleData.model }, { L: "PLATE", V: vehicleData.plate }, { L: "BATT", V: vehicleData.battery }].map(v => (
                  <div key={v.L}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: goldDark }}>{v.L}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: t.textPrimary }}>{v.V}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav active={navActive} setActive={setNavActive} />
    </div>
  );
}