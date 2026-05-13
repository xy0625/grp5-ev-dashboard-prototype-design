import React, { useState } from 'react';
import BottomNav from "./BottomNav";

export default function AccountPage({ navActive, setNavActive }) {
  const [isEditing, setIsEditing] = useState(false);

  const gold      = "#C9A84C";
  const goldDark  = "#8a6010";
  const goldLight = "rgba(201,168,76,0.12)";
  const cardBg    = "rgba(255,255,255,0.82)";
  const border    = `1px solid rgba(201,168,76,0.28)`;
  const textMain  = "#1a1a1a";
  const textMuted = "#888";

  // ── 样式定义 ──────────────────
  const lbl = {
    display: "block", 
    fontSize: 13,
    fontWeight: 800, 
    letterSpacing: "2px", 
    color: textMuted, 
    marginBottom: 10,
    textAlign: "center"
  };
  
  const fieldBox = {
    background: "rgba(0,0,0,0.05)", 
    borderRadius: 14,
    padding: "18px 20px", 
    fontSize: 18,
    fontWeight: 700, 
    color: textMain, 
    border: "1px solid rgba(0,0,0,0.04)",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "30px"
  };

  const inputStyle = {
    width: "100%", 
    boxSizing: "border-box",
    background: "#fff", 
    borderRadius: 14,
    padding: "18px 20px", 
    fontSize: 18, 
    fontWeight: 600,
    color: textMain, 
    border: `2.5px solid ${gold}`,
    outline: "none", 
    fontFamily: "inherit",
    textAlign: "center"
  };

  const outlineBtn = {
    padding: "12px 28px", 
    borderRadius: 30, 
    background: "#fff", 
    border: `1.8px solid ${gold}`,
    color: goldDark, 
    fontWeight: 800, 
    fontSize: 15,
    cursor: "pointer", 
    letterSpacing: "0.5px",
  };

  const goldBtn = {
    ...outlineBtn,
    background: `linear-gradient(135deg, ${gold}, ${goldDark})`,
    color: "#fff", 
    border: "none",
  };

  return (
    <div style={{
      position: "relative",
      width: 1280, height: 800,
      background: "linear-gradient(150deg, #f5edd8 0%, #ede5d0 60%, #c9a84c44 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      overflow: "hidden",
    }}>

      {/* 背景纹理 */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: `repeating-linear-gradient(118deg, transparent, transparent 80px, rgba(255,255,255,0.16) 80px, rgba(255,255,255,0.16) 81px)`,
      }} />

      {/* TOP BAR */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 60,
        background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)",
        borderBottom: border, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 40px", zIndex: 20,
      }}>
        {/* 左侧区域：已移除 EVSA 文字，仅保留图标 */}
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
          </svg>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "1.5px", color: textMuted }}>DRIVER PROFILE</span>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: goldLight, border: `2px solid ${gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👤</div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={{
        position: "absolute",
        width: 1120,
        height: 580,
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "grid",
        gridTemplateColumns: "320px 1fr", 
        gap: 30,
        zIndex: 5,
      }}>

        {/* ═══ 左边栏 ═══ */}
        <div style={{
          background: cardBg, backdropFilter: "blur(24px)", borderRadius: 32, border,
          boxShadow: "0 15px 45px rgba(140,100,20,0.15)",
          display: "flex", flexDirection: "column", alignItems: "center",
          padding: "35px 24px", gap: 15, overflow: "hidden",
        }}>
          <div style={{
            width: 120, height: 120, borderRadius: "50%", border: `5px solid ${gold}`,
            background: "#dcd0b8", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 0 10px ${goldLight}`, flexShrink: 0, overflow: "hidden"
          }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ marginTop: 12 }}>
              <circle cx="50" cy="35" r="23" fill="#9e8e66"/>
              <path d="M15 90 Q50 60 85 90" fill="#9e8e66" />
            </svg>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: textMain }}>USER NAME</div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              marginTop: 10, padding: "8px 22px", borderRadius: 20,
              background: `linear-gradient(135deg, ${gold}, ${goldDark})`,
              fontSize: 14, fontWeight: 900, color: "#fff", letterSpacing: "1.5px",
            }}>
              <span>⭐</span> PREMIUM
            </div>
          </div>

          <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 5 }}>
            {[{ L: "Trips", V: "128" }, { L: "km", V: "4,820" }, { L: "Score", V: "94" }, { L: "Active", V: "231" }].map(s => (
              <div key={s.L} style={{ background: "#fff", borderRadius: 16, padding: "15px 10px", textAlign: "center", border: `1px solid rgba(201,168,76,0.2)` }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: goldDark }}>{s.V}</div>
                <div style={{ fontSize: 10, color: textMuted, fontWeight: 800 }}>{s.L}</div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }} />
          
          {!isEditing && (
            <button style={{
              width: "100%", height: 52, borderRadius: 26, background: "#fff", border: "2.5px solid #eee",
              fontSize: 15, fontWeight: 900, color: "#333", cursor: "pointer", letterSpacing: "2px"
            }}>LOG OUT</button>
          )}
        </div>

        {/* ═══ 右边内容 ═══ */}
        <div style={{
          background: cardBg, backdropFilter: "blur(24px)", borderRadius: 32, border,
          boxShadow: "0 15px 45px rgba(140,100,20,0.15)",
          display: "flex", flexDirection: "column", padding: "35px 40px", gap: 20,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <div>
              <div style={{ fontSize: 30, fontWeight: 900, color: textMain }}>Account Details</div>
              <div style={{ fontSize: 14, color: textMuted, marginTop: 4 }}>Manage your personal EV information</div>
            </div>
            {!isEditing && (
              <div style={{ display: "flex", gap: 15 }}>
                <button style={outlineBtn} onClick={() => setIsEditing(true)}>Edit Profile</button>
                <button style={outlineBtn}>Vehicle Info</button>
              </div>
            )}
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 25 }}>
              <div><span style={lbl}>DRIVER NAME</span>{isEditing ? <input defaultValue="USER NAME" style={inputStyle}/> : <div style={fieldBox}>USER NAME</div>}</div>
              <div><span style={lbl}>EMAIL ADDRESS</span>{isEditing ? <input defaultValue="user@example.com" style={inputStyle}/> : <div style={fieldBox}>user@example.com</div>}</div>
              <div><span style={lbl}>LICENSE ID</span>{isEditing ? <input defaultValue="ABC-12345" style={inputStyle}/> : <div style={fieldBox}>ABC-12345</div>}</div>
              <div><span style={lbl}>EMERGENCY CONTACT</span>{isEditing ? <input defaultValue="+60 12-345 6789" style={inputStyle}/> : <div style={fieldBox}>+60 12-345 6789</div>}</div>
            </div>

            {!isEditing && (
              <div style={{ 
                background: "rgba(201,168,76,0.08)", 
                borderRadius: 20, 
                border: `1.5px solid rgba(201,168,76,0.3)`, 
                padding: "20px 30px", 
                display: "flex", 
                alignItems: "center", 
                gap: 30,
                marginTop: 5
              }}>
                <span style={{ fontSize: 40 }}>🚗</span>
                <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                  {[{ L: "CAR MODEL", V: "Borneo X1" }, { L: "PLATE NO.", V: "QA 1234 B" }, { L: "BATTERY", V: "82 kWh" }].map(v => (
                    <div key={v.L}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: goldDark, marginBottom: 4 }}>{v.L}</div>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>{v.V}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ flex: 1 }} />

            {isEditing && (
              <div style={{ display: "flex", gap: 20, justifyContent: "flex-end" }}>
                <button onClick={() => setIsEditing(false)} style={{ ...outlineBtn, border: "none", color: "#666" }}>Discard</button>
                <button onClick={() => setIsEditing(false)} style={{ ...goldBtn, padding: "14px 45px", fontSize: 16 }}>Save Changes</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav active={navActive} setActive={setNavActive} />
    </div>
  );
}