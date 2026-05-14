import React, { useState } from 'react';
import BottomNav from "./BottomNav";

export default function AccountPage({ navActive, setNavActive, onLogout }) {
  // Manage whether the UI is in 'none', 'profile' editing, or 'vehicle' editing mode
  const [editMode, setEditMode] = useState("none"); 
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  
  // User Profile Data
  const [userData, setUserData] = useState({
    name: "USER NAME",
    email: "user@example.com",
    licenseId: "ABC-12345",
    phone: "+60 12-345 6789"
  });

  // Vehicle Profile Data
  const [vehicleData, setVehicleData] = useState({
    model: "Borneo X1",
    plate: "QA 1234 B",
    battery: "82 kWh"
  });

  // Temporary states to hold changes before saving
  const [tempProfile, setTempProfile] = useState({ ...userData });
  const [tempVehicle, setTempVehicle] = useState({ ...vehicleData });

  // Theme Colors
  const gold      = "#C9A84C";
  const goldDark  = "#8a6010";
  const goldLight = "rgba(201,168,76,0.12)";
  const cardBg    = "rgba(255,255,255,0.82)";
  const border    = `1px solid rgba(201,168,76,0.28)`;
  const textMain  = "#1a1a1a";
  const textMuted = "#666";

  // Handlers for switching modes
  const handleEditProfile = () => {
    setTempProfile({ ...userData });
    setEditMode("profile");
  };

  const handleEditVehicle = () => {
    setTempVehicle({ ...vehicleData });
    setEditMode("vehicle");
  };

  const handleSave = () => {
    if (editMode === "profile") setUserData({ ...tempProfile });
    if (editMode === "vehicle") setVehicleData({ ...tempVehicle });
    setEditMode("none");
  };

  const handleDiscard = () => setEditMode("none");

  // --- Styles with enlarged fonts for readability ---
  const lbl = { display: "block", fontSize: 13, fontWeight: 800, letterSpacing: "1.5px", color: textMuted, marginBottom: 8, textAlign: "center" };
  const fieldBox = { background: "rgba(0,0,0,0.05)", borderRadius: 12, padding: "14px 15px", fontSize: 18, fontWeight: 700, color: textMain, border: "1px solid rgba(0,0,0,0.04)", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "28px" };
  const inputStyle = { width: "100%", boxSizing: "border-box", background: "#fff", borderRadius: 12, padding: "14px 15px", fontSize: 18, fontWeight: 600, color: textMain, border: `2.5px solid ${gold}`, outline: "none", textAlign: "center" };
  const outlineBtn = { padding: "12px 24px", borderRadius: 30, background: "#fff", border: `2px solid ${gold}`, color: goldDark, fontWeight: 800, fontSize: 15, cursor: "pointer", transition: "0.2s" };
  const goldBtn = { ...outlineBtn, background: `linear-gradient(135deg, ${gold}, ${goldDark})`, color: "#fff", border: "none" };

  return (
    <div style={{
      position: "relative", width: 1280, height: 800,
      background: "linear-gradient(150deg, #f5edd8 0%, #ede5d0 60%, #c9a84c44 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif", overflow: "hidden",
    }}>

      {/* Decorative Background Patterns */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, background: `repeating-linear-gradient(118deg, transparent, transparent 80px, rgba(255,255,255,0.1) 80px, rgba(255,255,255,0.1) 81px)` }} />

      {/* Top Status Bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 55,
        background: "rgba(255,255,255,0.6)", backdropFilter: "blur(10px)",
        borderBottom: border, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 30px", zIndex: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <span style={{ fontSize: 20 }}>📡</span>
          <span style={{ fontSize: 18 }}>📶</span>
        </div>
        <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "1.2px", color: textMuted }}>DRIVER PROFILE</span>
      </div>

      <div style={{
        position: "absolute", width: 1100, height: 560, top: "43%", left: "50%", transform: "translate(-50%, -50%)",
        display: "grid", gridTemplateColumns: "280px 1fr", gap: 20, zIndex: 5,
      }}>

        {/* Sidebar Profile Summary */}
        <div style={{
          background: cardBg, backdropFilter: "blur(24px)", borderRadius: 24, border,
          display: "flex", flexDirection: "column", alignItems: "center",
          padding: "30px 20px", gap: 15,
        }}>
          <div style={{
            width: 110, height: 110, borderRadius: "50%", border: `5px solid ${gold}`,
            background: "#dcd0b8", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 0 8px ${goldLight}`, flexShrink: 0, overflow: "hidden"
          }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ marginTop: 10 }}>
              <circle cx="50" cy="35" r="23" fill="#9e8e66"/><path d="M15 90 Q50 60 85 90" fill="#9e8e66" />
            </svg>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: textMain }}>{userData.name}</div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8, padding: "6px 18px",
              borderRadius: 15, background: `linear-gradient(135deg, ${gold}, ${goldDark})`,
              fontSize: 13, fontWeight: 900, color: "#fff",
            }}>
              ⭐ PREMIUM
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[{ L: "Trips", V: "128" }, { L: "km", V: "4.8k" }, { L: "Score", V: "94" }, { L: "Active", V: "231" }].map(s => (
              <div key={s.L} style={{ background: "#fff", borderRadius: 12, padding: "12px 5px", textAlign: "center", border: `1px solid rgba(201,168,76,0.15)` }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: goldDark }}>{s.V}</div>
                <div style={{ fontSize: 11, color: textMuted, fontWeight: 800 }}>{s.L}</div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }} />
          {editMode === "none" && <button onClick={onLogout} style={{ width: "100%", height: 48, borderRadius: 24, background: "#fff", border: "2px solid #eee", fontSize: 14, fontWeight: 900, cursor: "pointer" }}>LOG OUT</button>}
        </div>

        {/* Main Interaction Area */}
        <div style={{
          background: cardBg, backdropFilter: "blur(24px)", borderRadius: 24, border,
          display: "flex", flexDirection: "column", padding: "30px 40px", gap: 20,
        }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 900, color: textMain }}>
                {editMode === "vehicle" ? "Vehicle Settings" : "Account Details"}
              </div>
              <div style={{ fontSize: 15, color: textMuted }}>
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

          {/* Dynamic Content Grid based on Edit Mode */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {editMode === "vehicle" ? (
              <>
                <div><span style={lbl}>CAR MODEL</span><input value={tempVehicle.model} onChange={(e) => setTempVehicle({...tempVehicle, model: e.target.value})} style={inputStyle}/></div>
                <div><span style={lbl}>PLATE NUMBER</span><input value={tempVehicle.plate} onChange={(e) => setTempVehicle({...tempVehicle, plate: e.target.value})} style={inputStyle}/></div>
                <div><span style={lbl}>BATTERY CAPACITY</span><input value={tempVehicle.battery} onChange={(e) => setTempVehicle({...tempVehicle, battery: e.target.value})} style={inputStyle}/></div>
                <div style={{ opacity: 0.5 }}><span style={lbl}>REGISTRATION</span><div style={fieldBox}>Active</div></div>
              </>
            ) : (
              <>
                <div><span style={lbl}>DRIVER NAME</span>{editMode === "profile" ? <input value={tempProfile.name} onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})} style={inputStyle}/> : <div style={fieldBox}>{userData.name}</div>}</div>
                <div><span style={lbl}>EMAIL ADDRESS</span>{editMode === "profile" ? <input value={tempProfile.email} onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})} style={inputStyle}/> : <div style={fieldBox}>{userData.email}</div>}</div>
                <div><span style={lbl}>LICENSE ID</span>{editMode === "profile" ? <input value={tempProfile.licenseId} onChange={(e) => setTempProfile({...tempProfile, licenseId: e.target.value})} style={inputStyle}/> : <div style={fieldBox}>{userData.licenseId}</div>}</div>
                <div><span style={lbl}>EMERGENCY CONTACT</span>{editMode === "profile" ? <input value={tempProfile.phone} onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})} style={inputStyle}/> : <div style={fieldBox}>{userData.phone}</div>}</div>
              </>
            )}
          </div>

          {/* Security Management Section */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 900, color: goldDark, letterSpacing: "1.5px", marginBottom: 12, borderBottom: `1px solid ${goldLight}`, paddingBottom: 6 }}>SECURITY</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.3fr", gap: 15 }}>
              <button style={{ ...fieldBox, padding: "12px", fontSize: 15, background: "#fff", cursor: "pointer" }}>🔑 Change PIN</button>
              <button style={{ ...fieldBox, padding: "12px", fontSize: 15, background: "#fff", cursor: "pointer" }}>🔒 Password</button>
              
              <div style={{ ...fieldBox, padding: "0 20px", background: biometricEnabled ? "rgba(201,168,76,0.1)" : "rgba(0,0,0,0.05)" }}>
                <span style={{ fontSize: 20, marginRight: 10 }}>🧬</span>
                <span style={{ fontSize: 14, fontWeight: 800, flex: 1, textAlign: 'left' }}>Biometrics</span>
                <div onClick={() => setBiometricEnabled(!biometricEnabled)} style={{ width: 40, height: 20, borderRadius: 10, background: biometricEnabled ? gold : "#ccc", position: "relative", cursor: "pointer" }}>
                  <div style={{ position: "absolute", top: 2, left: biometricEnabled ? 22 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "0.2s" }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1 }} />

          {/* Footer: Action Buttons or Vehicle Display */}
          {editMode !== "none" ? (
            <div style={{ display: "flex", gap: 20, justifyContent: "flex-end" }}>
              <button onClick={handleDiscard} style={{ ...outlineBtn, border: "none" }}>Discard</button>
              <button onClick={handleSave} style={{ ...goldBtn, padding: "14px 45px", fontSize: 16 }}>Save Changes</button>
            </div>
          ) : (
             <div style={{ background: "rgba(201,168,76,0.06)", borderRadius: 20, border: `1px solid rgba(201,168,76,0.25)`, padding: "15px 30px", display: "flex", alignItems: "center", gap: 25 }}>
                <span style={{ fontSize: 32 }}>🚗</span>
                <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 15 }}>
                  {[{ L: "MODEL", V: vehicleData.model }, { L: "PLATE", V: vehicleData.plate }, { L: "BATT", V: vehicleData.battery }].map(v => (
                    <div key={v.L}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: goldDark }}>{v.L}</div>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>{v.V}</div>
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