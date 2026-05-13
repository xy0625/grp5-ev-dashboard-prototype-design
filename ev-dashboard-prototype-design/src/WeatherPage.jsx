import React, { useState } from 'react';
import BottomNav from "./BottomNav";

export default function WeatherPage({ navActive, setNavActive }) {
  const [temp, setTemp] = useState(24);
  const [fanSpeed, setFanSpeed] = useState('MEDIUM');
  const [showSchedule, setShowSchedule] = useState(false);
  
  const [isAuto, setIsAuto] = useState(false);
  const [isDefrost, setIsDefrost] = useState(false);

  const [checkedDays, setCheckedDays] = useState([]);
  const [s1Active, setS1Active] = useState(true);
  const [s2Active, setS2Active] = useState(false);

  const handleTemp = (type) => {
    setIsAuto(false); 
    if (type === 'plus' && temp < 30) setTemp(temp + 1);
    if (type === 'minus' && temp > 16) setTemp(temp - 1);
  };

  const handleAutoClick = () => {
    setIsAuto(!isAuto);
    if (!isAuto) setTemp(24);
  };

  const toggleCheck = (day) => {
    if (checkedDays.includes(day)) {
      setCheckedDays(checkedDays.filter(d => d !== day));
    } else {
      setCheckedDays([...checkedDays, day]);
    }
  };

  const s = {
    container: {
      position: "relative",
      width: 1280,
      height: 800,
      background: "linear-gradient(135deg, #E6F3F0 0%, #EBF6F5 100%)", 
      overflow: "hidden",
      fontFamily: "Inter, sans-serif",
    },
    backgroundAccent: {
      position: "absolute",
      width: "600px",
      height: "600px",
      background: "rgba(255, 255, 255, 0.3)",
      borderRadius: "50%",
      top: "-100px",
      right: "-100px",
      filter: "blur(80px)",
      pointerEvents: "none"
    },
    topStatus: {
      position: 'absolute',
      top: 25,
      left: 60,
      display: 'flex',
      alignItems: 'center',
      gap: '25px',
      color: '#333',
    },
    userIcon: {
      position: 'absolute',
      top: 25,
      right: 60,
      cursor: 'pointer',
      zIndex: 10 // 确保图标在顶层可点击
    },
    glassCard: {
      position: "absolute",
      left: "50%",
      top: "48%",
      transform: "translate(-50%, -55%)",
      background: "rgba(255, 255, 255, 0.65)",
      backdropFilter: "blur(25px)",
      borderRadius: '45px',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      padding: '40px 20px',
      width: '1000px',
      height: '520px',
      display: 'flex',
      justifyContent: 'space-between',
      boxShadow: '0 25px 60px rgba(0,0,0,0.06)'
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
      padding: '10px 0' 
    },
    rightColumn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between', 
      flex: 1,
      padding: '10px 0', 
    },
    label: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#9AA1B1',
      letterSpacing: '1.5px',
      height: '24px', 
      display: 'flex',
      alignItems: 'center'
    },
    tempCircle: {
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      background: 'linear-gradient(145deg, #EBEEF3, #FFFFFF)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '48px',
      fontWeight: '700',
      color: '#444',
      boxShadow: '8px 8px 16px #D1D9E6, -8px -8px 16px #FFFFFF',
      margin: '10px 0'
    },
    autoBtn: {
      marginTop: '20px',
      padding: isAuto ? '15px 55px' : '12px 40px',
      fontSize: isAuto ? '22px' : '18px',
      borderRadius: '35px',
      border: isAuto ? 'none' : '2px solid #DCD1FF',
      background: isAuto ? 'linear-gradient(135deg, #8E2DE2, #4A00E0)' : '#F3E8FF',
      color: isAuto ? '#FFF' : '#7371FC',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: isAuto ? '0 10px 20px rgba(74, 0, 224, 0.3)' : 'none'
    },
    fanBtn: (active) => ({
      width: '280px',
      padding: '30px',
      borderRadius: '20px',
      border: active ? '4px solid #D4AF37' : '1px solid #FDF8E1',
      backgroundColor: active ? '#FFFFFF' : 'rgba(253, 248, 225, 0.6)', 
      fontSize: '28px',
      fontWeight: '900',
      color: active ? '#D4AF37' : '#A8A082',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: active ? '0 10px 20px rgba(212, 175, 55, 0.2)' : '0 4px 10px rgba(0,0,0,0.02)',
      transform: active ? 'scale(1.05)' : 'scale(1)',
    }),
    defrostCard: {
      background: isDefrost ? 'linear-gradient(135deg, #F2994A, #F2C94C)' : '#FFF4E6',
      borderRadius: '28px',
      textAlign: 'center',
      width: '250px', 
      height: '150px', 
      boxShadow: isDefrost ? '0 15px 35px rgba(242, 153, 74, 0.4)' : '0 10px 30px rgba(0,0,0,0.03)',
      border: isDefrost ? '1px solid rgba(255,255,255,1)' : '2px solid #FFE4CC',
      cursor: 'pointer',
      transition: 'all 0.4s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    weatherDisplay: {
      width: '250px', 
      height: '150px', 
      padding: '0 25px',
      borderRadius: '28px',
      background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)', 
      color: '#2F80ED', 
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 12px 25px rgba(47, 128, 237, 0.1)',
      border: '1px solid rgba(47, 128, 237, 0.1)',
      boxSizing: 'border-box'
    },
    scheduleBtn: {
      backgroundColor: showSchedule ? '#1a73e8' : '#E8F2FE',
      border: '2px solid #1a73e8',
      color: showSchedule ? '#fff' : '#1a73e8',
      padding: '18px 0',
      borderRadius: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '18px',
      width: '240px', 
      transition: 'all 0.2s ease'
    },
    adjustBtn: {
      width: '55px', height: '55px', borderRadius: '50%', border: 'none',
      background: '#333', color: '#fff', cursor: 'pointer', fontSize: '28px',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    depthLeft: {
      flex: 1, display: 'flex', flexDirection: 'column', gap: '10px',
      borderRight: '1px solid rgba(0,0,0,0.05)', paddingRight: '20px', justifyContent: 'center'
    },
    dayItem: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 25px', background: 'rgba(255,255,255,0.5)', borderRadius: '15px',
      fontSize: '18px', fontWeight: '600', color: '#444', cursor: 'pointer'
    },
    getCardStyle: (active) => ({
      background: '#fff', borderRadius: '24px', padding: '25px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.02)', opacity: active ? 1 : 0.5, transition: 'all 0.3s ease'
    }),
    getToggleStyle: (active) => ({
      width: '54px', height: '30px', background: active ? '#4CD964' : '#D1D1D6', 
      borderRadius: '15px', position: 'relative', cursor: 'pointer', transition: 'background 0.3s ease'
    })
  };

  return (
    <div style={s.container}>
      <div style={s.backgroundAccent} />
      
      <div style={s.topStatus}>
        <img src="/wifi.png" alt="WIFI" style={{ width: '35px' }} />
        <img src="/bluetooth.png" alt="BT" style={{ width: '25px' }} />
      </div>

      {/* 修改点：给用户头像加上点击事件跳转到索引 6 (AccountPage) */}
      <div style={s.userIcon} onClick={() => setNavActive(6)}>
        <img src="/profile.png" alt="User" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
      </div>

      <div style={s.glassCard}>
        {!showSchedule ? (
          <>
            {/* Column 1: Temperature */}
            <div style={s.column}>
              <span style={s.label}>TEMPERATURE</span>
              <div style={s.tempCircle}>{temp}°C</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button onClick={() => handleTemp('minus')} style={{...s.adjustBtn, opacity: temp === 16 ? 0.3 : 1}}>-</button>
                <div style={{ width: '140px', height: '8px', background: 'linear-gradient(to right, #2196F3, #F44336)', borderRadius: '4px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: `${((temp-16)/14)*100}%`, top: -4, width: 16, height: 16, background: '#fff', borderRadius: '50%' }}/>
                </div>
                <button onClick={() => handleTemp('plus')} style={{...s.adjustBtn, opacity: temp === 30 ? 0.3 : 1}}>+</button>
              </div>
              <button onClick={handleAutoClick} style={s.autoBtn}>AUTO</button>
            </div>

            {/* Column 2: Fan Speed */}
            <div style={{ ...s.column, borderLeft: '1px solid rgba(0,0,0,0.04)', borderRight: '1px solid rgba(0,0,0,0.04)', padding: '10px 20px' }}>
              <span style={s.label}>FAN SPEED</span>
              <button onClick={() => setFanSpeed('HIGH')} style={s.fanBtn(fanSpeed === 'HIGH')}>HIGH</button>
              <button onClick={() => setFanSpeed('MEDIUM')} style={s.fanBtn(fanSpeed === 'MEDIUM')}>MEDIUM</button>
              <button onClick={() => setFanSpeed('LOW')} style={s.fanBtn(fanSpeed === 'LOW')}>LOW</button>
            </div>

            {/* Column 3: Safety / Rain */}
            <div style={s.rightColumn}>
              <span style={s.label}>SAFETY / RAIN</span>
              
              <div style={s.defrostCard} onClick={() => setIsDefrost(!isDefrost)}>
                <svg width="40" height="30" viewBox="0 0 24 24" fill="none" stroke={isDefrost ? "#FFF" : "#F2994A"} strokeWidth="2.5">
                    <path d="M2 20h20a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2z" />
                    <path d="M7 16v-4a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4M13 16v-4a2 2 0 0 1 2-2 2 2 0 0 1 2 2v4" />
                    <path d="M10 5V3M14 5V3" />
                </svg>
                <p style={{ fontSize: '18px', fontWeight: '900', color: isDefrost ? '#FFF' : '#F2994A', margin: 0 }}>MAX DEFROST</p>
              </div>

              <div style={s.weatherDisplay}>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', opacity: 0.7, fontWeight: 'bold' }}>Kuching</p>
                  <p style={{ margin: 0, fontSize: '32px', fontWeight: '900' }}>24°</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <img src="https://img.icons8.com/fluency/48/000000/sun.png" alt="sun" style={{ width: '40px' }} />
                  <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold' }}>Sunny</p>
                </div>
              </div>

              <button onClick={() => setShowSchedule(true)} style={s.scheduleBtn}>SCHEDULE SETTINGS</button>
            </div>
          </>
        ) : (
          /* Schedule Settings */
          <div style={{ display: 'flex', width: '100%', padding: '10px' }}>
            <div style={s.depthLeft}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <button onClick={() => setShowSchedule(false)} style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: '#1a73e8' }}>←</button>
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#333' }}>Weekly Schedule</span>
              </div>
              {[
                { day: 'Sun', date: '18' }, { day: 'Mon', date: '19' }, { day: 'Tue', date: '20' },
                { day: 'Wed', date: '21' }, { day: 'Thu', date: '22' }, { day: 'Fri', date: '23' },
                { day: 'Sat', date: '24' }
              ].map((item) => (
                <div key={item.day} style={s.dayItem} onClick={() => toggleCheck(item.day)}>
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
              <div style={s.getCardStyle(s1Active)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{ fontWeight: '800', fontSize: '20px', color: s1Active ? '#333' : '#9AA1B1' }}>Schedule 1</span>
                  <div style={s.getToggleStyle(s1Active)} onClick={() => setS1Active(!s1Active)}>
                    <div style={{ position: 'absolute', left: s1Active ? '27px' : '3px', top: 3, width: 24, height: 24, background: '#fff', borderRadius: '50%', transition: 'left 0.3s' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ flex: 1, background: '#F4F7FA', padding: '18px', borderRadius: '16px' }}>
                    <p style={{ margin: 0, color: s1Active ? '#9AA1B1' : '#BCC3D0', fontSize: '13px', fontWeight: 'bold' }}>PRE-HEAT</p>
                    <p style={{ margin: '8px 0 0 0', fontWeight: '800', fontSize: '17px', color: s1Active ? '#333' : '#9AA1B1' }}>7:45 AM to 22°C</p>
                  </div>
                  <div style={{ flex: 1, background: '#F4F7FA', padding: '18px', borderRadius: '16px' }}>
                    <p style={{ margin: 0, color: s1Active ? '#9AA1B1' : '#BCC3D0', fontSize: '13px', fontWeight: 'bold' }}>PRE-VENT</p>
                    <p style={{ margin: '8px 0 0 0', fontWeight: '800', fontSize: '17px', color: s1Active ? '#333' : '#9AA1B1' }}>5:30 PM to 19°C</p>
                  </div>
                </div>
              </div>

              <div style={s.getCardStyle(s2Active)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{ fontWeight: '800', fontSize: '20px', color: s2Active ? '#333' : '#9AA1B1' }}>Schedule 2</span>
                  <div style={s.getToggleStyle(s2Active)} onClick={() => setS2Active(!s2Active)}>
                    <div style={{ position: 'absolute', left: s2Active ? '27px' : '3px', top: 3, width: 24, height: 24, background: '#fff', borderRadius: '50%', transition: 'left 0.3s' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ flex: 1, background: '#F4F7FA', padding: '18px', borderRadius: '16px' }}>
                    <p style={{ margin: 0, color: s2Active ? '#9AA1B1' : '#BCC3D0', fontSize: '13px', fontWeight: 'bold' }}>PRE-HEAT</p>
                    <p style={{ margin: '8px 0 0 0', fontWeight: '800', fontSize: '17px', color: s2Active ? '#333' : '#9AA1B1' }}>7:45 AM to 25°C</p>
                  </div>
                  <div style={{ flex: 1, background: '#F4F7FA', padding: '18px', borderRadius: '16px' }}>
                    <p style={{ margin: 0, color: s2Active ? '#9AA1B1' : '#BCC3D0', fontSize: '13px', fontWeight: 'bold' }}>PRE-VENT</p>
                    <p style={{ margin: '8px 0 0 0', fontWeight: '800', fontSize: '17px', color: s2Active ? '#333' : '#9AA1B1' }}>5:30 PM to 21°C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNav active={navActive} setActive={setNavActive} />
    </div>
  );
}