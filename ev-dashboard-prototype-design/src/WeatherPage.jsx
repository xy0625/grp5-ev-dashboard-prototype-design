import React, { useState } from 'react';
import BottomNav from "./BottomNav";
import TopBar from "./TopBar";

/* ── Theme tokens ──────────────────────────────────────────────── */
function tk(theme) {
  const dark = theme === "dark";
  return {
    pageBg:        dark ? "#0F1117" : "linear-gradient(135deg, #E6F3F0 0%, #EBF6F5 100%)",
    accentBlob:    dark ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.3)",
    cardBg:        dark ? "rgba(28,31,42,0.92)" : "rgba(255,255,255,0.65)",
    cardBorder:    dark ? "1px solid #2C2F3E" : "1px solid rgba(255,255,255,0.6)",
    cardShadow:    dark ? "0 25px 60px rgba(0,0,0,0.5)" : "0 25px 60px rgba(0,0,0,0.06)",
    colDivider:    dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
    textMain:      dark ? "#E8EAF0" : "#444",
    textMuted:     dark ? "#9CA3AF" : "#9AA1B1",
    labelColor:    dark ? "#6B7280" : "#9AA1B1",
    circleBg:      dark ? "linear-gradient(145deg,#1E2235,#252836)" : "linear-gradient(145deg,#EBEEF3,#FFFFFF)",
    circleShadow:  dark ? "8px 8px 16px #0a0c12,-8px -8px 16px #2a2f42" : "8px 8px 16px #D1D9E6,-8px -8px 16px #FFFFFF",
    adjustBg:      dark ? "#3A3F52" : "#333",
    adjustColor:   "#fff",
    autoOffBg:     dark ? "#2A1F4A" : "#F3E8FF",
    autoOffColor:  dark ? "#A78BFA" : "#7371FC",
    autoOffBorder: dark ? "#4C3D8A" : "#DCD1FF",
    fanActiveBg:   dark ? "#252836" : "#FFFFFF",
    fanActiveBorder: "#D4AF37",
    fanActiveColor:"#D4AF37",
    fanInactiveBg: dark ? "rgba(40,38,20,0.4)" : "rgba(253,248,225,0.6)",
    fanInactiveBorder: dark ? "#3A3820" : "#FDF8E1",
    fanInactiveColor: dark ? "#6B6040" : "#A8A082",
    defrostOffBg:  dark ? "#2A1A0A" : "#FFF4E6",
    defrostOffBorder: dark ? "#4A3020" : "#FFE4CC",
    weatherBg:     dark ? "linear-gradient(135deg,#1a2a3a,#1E2E42)" : "linear-gradient(135deg,#F0F9FF,#E0F2FE)",
    weatherColor:  dark ? "#60A5FA" : "#2F80ED",
    weatherBorder: dark ? "1px solid #2C3E50" : "1px solid rgba(47,128,237,0.1)",
    schedOffBg:    dark ? "#1a2a3a" : "#E8F2FE",
    schedOffColor: dark ? "#60A5FA" : "#1a73e8",
    dayItemBg:     dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.5)",
    dayItemColor:  dark ? "#E8EAF0" : "#444",
    schedCardBg:   dark ? "#1E2235" : "#fff",
    schedInnerBg:  dark ? "#252836" : "#F4F7FA",
    shadow:        dark ? "0 8px 20px rgba(0,0,0,0.4)" : "0 8px 20px rgba(0,0,0,0.02)",
  };
}

export default function WeatherPage({ navActive, setNavActive, theme = "light", onGoToAccount }) {
  const [temp, setTemp]                 = useState(24);
  const [fanSpeed, setFanSpeed]         = useState('MEDIUM');
  const [showSchedule, setShowSchedule] = useState(false);
  const [isAuto, setIsAuto]             = useState(false);
  const [isDefrost, setIsDefrost]       = useState(false);
  const [checkedDays, setCheckedDays]   = useState([]);
  const [s1Active, setS1Active]         = useState(true);
  const [s2Active, setS2Active]         = useState(false);

  const t = tk(theme);

  const handleTemp = (type) => {
    setIsAuto(false);
    if (type === 'plus'  && temp < 30) setTemp(temp + 1);
    if (type === 'minus' && temp > 16) setTemp(temp - 1);
  };
  const handleAutoClick = () => { setIsAuto(!isAuto); if (!isAuto) setTemp(24); };
  const toggleCheck = (day) => {
    setCheckedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const fanBtn = (active) => ({
    width: '280px', padding: '30px', borderRadius: '20px',
    border: active ? `4px solid ${t.fanActiveBorder}` : `1px solid ${t.fanInactiveBorder}`,
    backgroundColor: active ? t.fanActiveBg : t.fanInactiveBg,
    fontSize: '28px', fontWeight: '900',
    color: active ? t.fanActiveColor : t.fanInactiveColor,
    cursor: 'pointer', transition: 'all 0.3s ease',
    boxShadow: active ? '0 10px 20px rgba(212,175,55,0.2)' : '0 4px 10px rgba(0,0,0,0.02)',
    transform: active ? 'scale(1.05)' : 'scale(1)',
  });

  const adjustBtn = {
    width: '55px', height: '55px', borderRadius: '50%', border: 'none',
    background: t.adjustBg, color: t.adjustColor, cursor: 'pointer',
    fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
  };

  const autoBtn = {
    marginTop: '20px',
    padding: isAuto ? '15px 55px' : '12px 40px',
    fontSize: isAuto ? '22px' : '18px',
    borderRadius: '35px',
    border: isAuto ? 'none' : `2px solid ${t.autoOffBorder}`,
    background: isAuto ? 'linear-gradient(135deg,#8E2DE2,#4A00E0)' : t.autoOffBg,
    color: isAuto ? '#FFF' : t.autoOffColor,
    fontWeight: 'bold', cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.175,0.885,0.32,1.275)',
    boxShadow: isAuto ? '0 10px 20px rgba(74,0,224,0.3)' : 'none',
  };

  const getToggle = (active) => ({
    width: '54px', height: '30px',
    background: active ? '#4CD964' : (theme === 'dark' ? '#3A3F52' : '#D1D1D6'),
    borderRadius: '15px', position: 'relative', cursor: 'pointer', transition: 'background 0.3s',
  });

  const getSchedCard = (active) => ({
    background: t.schedCardBg, borderRadius: '24px', padding: '25px',
    boxShadow: t.shadow, opacity: active ? 1 : 0.5, transition: 'all 0.3s',
  });

  const colStyle = {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'space-between', flex: 1, padding: '10px 0',
  };

  return (
    <div style={{
      position: "relative", width: 1280, height: 800,
      background: t.pageBg, overflow: "hidden",
      fontFamily: "Inter, sans-serif", transition: "background 0.3s",
    }}>

      {/* blob */}
      <div style={{
        position: "absolute", width: "600px", height: "600px",
        background: t.accentBlob, borderRadius: "50%",
        top: "-100px", right: "-100px", filter: "blur(80px)", pointerEvents: "none",
      }} />

      {/* ── SHARED TOP BAR ── replaces old wifi/bt/avatar divs */}
      <TopBar theme={theme} onGoToAccount={onGoToAccount} />

      {/* ── MAIN GLASS CARD ── */}
      <div style={{
        position: "absolute", left: "50%", top: "48%",
        transform: "translate(-50%, -55%)",
        background: t.cardBg, backdropFilter: "blur(25px)",
        borderRadius: '45px', border: t.cardBorder,
        padding: '40px 20px', width: '1000px', height: '520px',
        display: 'flex', justifyContent: 'space-between',
        boxShadow: t.cardShadow, transition: "background 0.3s",
      }}>
        {!showSchedule ? (
          <>
            {/* ── COL 1: Temperature ── */}
            <div style={colStyle}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: t.labelColor, letterSpacing: '1.5px' }}>TEMPERATURE</span>

              <div style={{
                width: '200px', height: '200px', borderRadius: '50%',
                background: t.circleBg, display: 'flex', justifyContent: 'center', alignItems: 'center',
                fontSize: '48px', fontWeight: '700', color: t.textMain,
                boxShadow: t.circleShadow, margin: '10px 0',
              }}>{temp}°C</div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button onClick={() => handleTemp('minus')} style={{ ...adjustBtn, opacity: temp === 16 ? 0.3 : 1 }}>-</button>
                <div style={{ width: '140px', height: '8px', background: 'linear-gradient(to right,#2196F3,#F44336)', borderRadius: '4px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: `${((temp-16)/14)*100}%`, top: -4, width: 16, height: 16, background: theme === 'dark' ? '#E8EAF0' : '#fff', borderRadius: '50%' }}/>
                </div>
                <button onClick={() => handleTemp('plus')} style={{ ...adjustBtn, opacity: temp === 30 ? 0.3 : 1 }}>+</button>
              </div>

              <button onClick={handleAutoClick} style={autoBtn}>AUTO</button>
            </div>

            {/* ── COL 2: Fan Speed ── */}
            <div style={{ ...colStyle, borderLeft: `1px solid ${t.colDivider}`, borderRight: `1px solid ${t.colDivider}`, padding: '10px 20px' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: t.labelColor, letterSpacing: '1.5px' }}>FAN SPEED</span>
              <button onClick={() => setFanSpeed('HIGH')}   style={fanBtn(fanSpeed === 'HIGH')}>HIGH</button>
              <button onClick={() => setFanSpeed('MEDIUM')} style={fanBtn(fanSpeed === 'MEDIUM')}>MEDIUM</button>
              <button onClick={() => setFanSpeed('LOW')}    style={fanBtn(fanSpeed === 'LOW')}>LOW</button>
            </div>

            {/* ── COL 3: Safety / Rain ── */}
            <div style={{ ...colStyle }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: t.labelColor, letterSpacing: '1.5px' }}>SAFETY / RAIN</span>

              <div onClick={() => setIsDefrost(!isDefrost)} style={{
                background: isDefrost ? 'linear-gradient(135deg,#F2994A,#F2C94C)' : t.defrostOffBg,
                borderRadius: '28px', textAlign: 'center', width: '250px', height: '150px',
                boxShadow: isDefrost ? '0 15px 35px rgba(242,153,74,0.4)' : '0 10px 30px rgba(0,0,0,0.03)',
                border: isDefrost ? '1px solid rgba(255,255,255,0.8)' : `2px solid ${t.defrostOffBorder}`,
                cursor: 'pointer', transition: 'all 0.4s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}>
                <svg width="40" height="30" viewBox="0 0 24 24" fill="none" stroke={isDefrost ? "#FFF" : "#F2994A"} strokeWidth="2.5">
                  <path d="M2 20h20a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z"/>
                  <path d="M7 16v-4a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4M13 16v-4a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4"/>
                  <path d="M10 5V3M14 5V3"/>
                </svg>
                <p style={{ fontSize: '18px', fontWeight: '900', color: isDefrost ? '#FFF' : '#F2994A', margin: 0 }}>MAX DEFROST</p>
              </div>

              <div style={{
                width: '250px', height: '150px', padding: '0 25px', borderRadius: '28px',
                background: t.weatherBg, color: t.weatherColor,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                boxShadow: '0 12px 25px rgba(47,128,237,0.1)', border: t.weatherBorder, boxSizing: 'border-box',
              }}>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', opacity: 0.7, fontWeight: 'bold' }}>Kuching</p>
                  <p style={{ margin: 0, fontSize: '32px', fontWeight: '900' }}>24°</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <img src="https://img.icons8.com/fluency/48/000000/sun.png" alt="sun" style={{ width: '40px', filter: theme === 'dark' ? 'brightness(0.85)' : 'none' }}/>
                  <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold' }}>Sunny</p>
                </div>
              </div>

              <button onClick={() => setShowSchedule(true)} style={{
                backgroundColor: showSchedule ? '#1a73e8' : t.schedOffBg,
                border: '2px solid #1a73e8',
                color: showSchedule ? '#fff' : t.schedOffColor,
                padding: '18px 0', borderRadius: '16px', fontWeight: 'bold',
                cursor: 'pointer', fontSize: '18px', width: '240px', transition: 'all 0.2s',
              }}>SCHEDULE SETTINGS</button>
            </div>
          </>
        ) : (
          /* ── SCHEDULE PANEL ── */
          <div style={{ display: 'flex', width: '100%', padding: '10px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', borderRight: `1px solid ${t.colDivider}`, paddingRight: '20px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <button onClick={() => setShowSchedule(false)} style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: '#1a73e8' }}>←</button>
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: t.textMain }}>Weekly Schedule</span>
              </div>
              {[{ day:'Sun',date:'18' },{ day:'Mon',date:'19' },{ day:'Tue',date:'20' },
                { day:'Wed',date:'21' },{ day:'Thu',date:'22' },{ day:'Fri',date:'23' },{ day:'Sat',date:'24' }
              ].map(item => (
                <div key={item.day} onClick={() => toggleCheck(item.day)} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px 25px', background: t.dayItemBg, borderRadius: '15px',
                  fontSize: '18px', fontWeight: '600', color: t.dayItemColor, cursor: 'pointer',
                }}>
                  <div style={{ display: 'flex', width: '100px', justifyContent: 'space-between' }}>
                    <span style={{ width: '45px' }}>{item.day}</span>
                    <span style={{ fontWeight: '800' }}>{item.date}</span>
                  </div>
                  <span style={{ color: checkedDays.includes(item.day) ? '#4CD964' : '#1a73e8', fontSize: '24px', fontWeight: 'bold' }}>
                    {checkedDays.includes(item.day) ? '✔' : '+'}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ flex: 1.5, paddingLeft: '30px', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
              {/* Schedule 1 */}
              <div style={getSchedCard(s1Active)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{ fontWeight: '800', fontSize: '20px', color: s1Active ? t.textMain : t.textMuted }}>Schedule 1</span>
                  <div style={getToggle(s1Active)} onClick={() => setS1Active(!s1Active)}>
                    <div style={{ position: 'absolute', left: s1Active ? '27px' : '3px', top: 3, width: 24, height: 24, background: '#fff', borderRadius: '50%', transition: 'left 0.3s' }}/>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  {[{ l:'PRE-HEAT', v:'7:45 AM to 22°C' },{ l:'PRE-VENT', v:'5:30 PM to 19°C' }].map(i => (
                    <div key={i.l} style={{ flex: 1, background: t.schedInnerBg, padding: '18px', borderRadius: '16px' }}>
                      <p style={{ margin: 0, color: s1Active ? t.textMuted : t.labelColor, fontSize: '13px', fontWeight: 'bold' }}>{i.l}</p>
                      <p style={{ margin: '8px 0 0 0', fontWeight: '800', fontSize: '17px', color: s1Active ? t.textMain : t.textMuted }}>{i.v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule 2 */}
              <div style={getSchedCard(s2Active)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{ fontWeight: '800', fontSize: '20px', color: s2Active ? t.textMain : t.textMuted }}>Schedule 2</span>
                  <div style={getToggle(s2Active)} onClick={() => setS2Active(!s2Active)}>
                    <div style={{ position: 'absolute', left: s2Active ? '27px' : '3px', top: 3, width: 24, height: 24, background: '#fff', borderRadius: '50%', transition: 'left 0.3s' }}/>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  {[{ l:'PRE-HEAT', v:'7:45 AM to 25°C' },{ l:'PRE-VENT', v:'5:30 PM to 21°C' }].map(i => (
                    <div key={i.l} style={{ flex: 1, background: t.schedInnerBg, padding: '18px', borderRadius: '16px' }}>
                      <p style={{ margin: 0, color: s2Active ? t.textMuted : t.labelColor, fontSize: '13px', fontWeight: 'bold' }}>{i.l}</p>
                      <p style={{ margin: '8px 0 0 0', fontWeight: '800', fontSize: '17px', color: s2Active ? t.textMain : t.textMuted }}>{i.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNav active={navActive} setActive={setNavActive} theme={theme} />
    </div>
  );
}