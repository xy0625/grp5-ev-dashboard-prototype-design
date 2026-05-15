import { useState, useEffect, useRef } from "react";
import BottomNav from "./BottomNav";
import TopBar from "./TopBar";

// homePage — design tokens aligned with settingsPage

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS  = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

/* ── Theme tokens ─── aligned with settingsPage ──────────────────── */
function tk(theme) {
  const dark = theme === "dark";
  return {
    // Background — matches settingsPage exactly
    pageBg: dark
      ? "#0F1117"
      : "linear-gradient(135deg, #E6F3F0 0%, #EBF6F5 50%, #EFF3F8 100%)",

    // Cards — glassmorphism like settingsPage
    cardBg:     dark ? "rgba(28,31,42,0.92)" : "rgba(255,255,255,0.65)",
    cardBorder: dark ? "1px solid #2C2F3E"   : "1px solid rgba(255,255,255,0.6)",
    cardBackdrop: "blur(25px)",

    // Text — matches settingsPage
    textPrimary: dark ? "#E8EAF0" : "#444",
    textSecond:  dark ? "#9CA3AF" : "#9AA1B1",
    textMuted:   dark ? "#6B7280" : "#9AA1B1",
    iconStroke:  dark ? "#9CA3AF" : "#9AA1B1",
    divider:     dark ? "#2C2F3E" : "rgba(154,161,177,0.12)",

    // Inputs — matches settingsPage
    inputBg:     dark ? "#252836" : "rgba(244,247,250,0.85)",
    inputBorder: dark ? "1px solid #3A3F52" : "1px solid rgba(154,161,177,0.25)",

    // Shadows — matches settingsPage
    shadow: dark
      ? "0px 25px 60px rgba(0,0,0,0.5)"
      : "0px 25px 60px rgba(0,0,0,0.06)",

    // Top bar
    topBarBg: dark ? "rgba(15,17,23,0.85)" : "transparent",

    // AI Assistant pill
    aiBg:     dark ? "rgba(30,33,48,0.85)" : "rgba(255,255,255,0.65)",
    aiBorder: dark ? "1px solid #2C2F3E"   : "1px solid rgba(255,255,255,0.6)",
    aiText:   dark ? "#9CA3AF" : "#9AA1B1",

    // Profile avatar — matches settingsPage avatar
    profileBg:     dark ? "rgba(30,33,48,0.85)" : "rgba(255,255,255,0.7)",
    profileBorder: dark ? "1px solid #2C2F3E"   : "1px solid rgba(255,255,255,0.6)",

    // Trip badges
    tripAccentBg:  dark ? "rgba(47,128,237,0.2)"  : "rgba(230,241,251,0.9)",
    tripBadgeBg:   dark ? "rgba(28,31,42,0.85)"   : "rgba(255,255,255,0.65)",
    tripBadgeBorder: dark ? "1px solid #2C2F3E"   : "1px solid rgba(255,255,255,0.6)",

    // Charge CTA
    chargeBg:   dark ? "rgba(254,243,199,0.15)" : "rgba(254,243,199,0.8)",
    chargeText: "#F59E0B",

    // Accent — unified to settingsPage blue
    accent:     "#2F80ED",
    accentGrad: "linear-gradient(135deg, #2F80ED, #56CCF2)",

    // Background accent blobs — same as settingsPage
    blobA: dark ? "rgba(47,128,237,0.08)"  : "rgba(255,255,255,0.35)",
    blobB: dark ? "rgba(47,128,237,0.05)"  : "rgba(47,128,237,0.07)",

    // Menu items (for overlays/turns)
    menuBg:     dark ? "rgba(28,31,42,0.92)" : "rgba(255,255,255,0.65)",
    menuBorder: dark ? "1px solid #2C2F3E"   : "1px solid rgba(255,255,255,0.6)",
    menuShadow: dark ? "0 4px 12px rgba(0,0,0,0.4)" : "0 4px 12px rgba(0,0,0,0.04)",
  };
}

/* ── Press effect hook ───────────────────────────────────────────── */
function usePress() {
  return {
    onMouseDown:  e => { e.currentTarget.style.transform = "scale(0.93)"; e.currentTarget.style.opacity = "0.8"; },
    onMouseUp:    e => { e.currentTarget.style.transform = "scale(1)";    e.currentTarget.style.opacity = "1"; },
    onMouseLeave: e => { e.currentTarget.style.transform = "scale(1)";    e.currentTarget.style.opacity = "1"; },
    onTouchStart: e => { e.currentTarget.style.transform = "scale(0.93)"; e.currentTarget.style.opacity = "0.8"; },
    onTouchEnd:   e => { e.currentTarget.style.transform = "scale(1)";    e.currentTarget.style.opacity = "1"; },
  };
}

/* ── EV Assistant (Voice + Claude API) ──────────────────────────── */
function EVAssistant({ theme }) {
  const t = tk(theme);
  const dark = theme === "dark";
  const press = usePress();
 
  const [mode, setMode]             = useState("idle");
  const [transcript, setTranscript] = useState("");
  const [reply, setReply]           = useState("");
  const [errorMsg, setErrorMsg]     = useState("");
  const [expanded, setExpanded]     = useState(false);
 
  const recognitionRef = useRef(null);
  const synthRef       = useRef(window.speechSynthesis);
 
  const modeColor = { idle:t.accent, listening:"#10B981", thinking:"#F59E0B", speaking:t.accent, error:"#EF4444" };
  const accent = modeColor[mode];
 
  useEffect(() => {
    if (document.getElementById("ev-assistant-styles")) return;
    const style = document.createElement("style");
    style.id = "ev-assistant-styles";
    style.textContent = `
      @keyframes evPulse  { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.18);opacity:0.7} }
      @keyframes evDot    { 0%,80%,100%{transform:scaleY(0.4)} 40%{transform:scaleY(1.2)} }
      @keyframes evSpin   { to{transform:rotate(360deg)} }
      @keyframes evFadeIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
    `;
    document.head.appendChild(style);
  }, []);
 
  const reset = () => {
    recognitionRef.current?.stop(); synthRef.current?.cancel();
    setMode("idle"); setTranscript(""); setReply(""); setErrorMsg(""); setExpanded(false);
  };
 
  const askClaude = async (question) => {
    setMode("thinking"); setExpanded(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:`You are a smart in-car EV assistant. The driver is in Kuching, Sarawak, Malaysia.
Answer concisely (2-3 sentences max) in a friendly, natural tone.
Focus on: battery, range, charging stations, navigation, climate, traffic, weather.
Never say you can't do something — give a helpful answer always.`,
          messages:[{ role:"user", content:question }],
        }),
      });
      const data = await res.json();
      const text = data.content?.[0]?.text ?? "Sorry, I couldn't get a response.";
      setReply(text); setMode("speaking"); speakReply(text);
    } catch { setErrorMsg("Connection error. Please try again."); setMode("error"); }
  };
 
  const speakReply = (text) => {
    if (!synthRef.current) { setMode("idle"); return; }
    synthRef.current.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "en-MY"; utt.rate = 0.95; utt.pitch = 1.05;
    const voices = synthRef.current.getVoices();
    const pick = voices.find(v => /samantha|karen|google uk|daniel/i.test(v.name)) ?? voices.find(v => v.lang.startsWith("en")) ?? null;
    if (pick) utt.voice = pick;
    utt.onend = () => { setMode("idle"); setExpanded(false); };
    utt.onerror = () => setMode("idle");
    synthRef.current.speak(utt);
  };
 
  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setErrorMsg("Voice not supported in this browser."); setMode("error"); setExpanded(true); return; }
    synthRef.current?.cancel();
    setTranscript(""); setReply(""); setMode("listening"); setExpanded(true);
    const r = new SR(); r.lang="en-MY"; r.interimResults=true; r.maxAlternatives=1;
    recognitionRef.current = r;
    r.onresult = (e) => {
      const t2 = Array.from(e.results).map(x => x[0].transcript).join("");
      setTranscript(t2);
      if (e.results[e.results.length-1].isFinal) { r.stop(); askClaude(t2); }
    };
    r.onerror = (e) => { setErrorMsg(e.error==="not-allowed" ? "Mic access denied." : `Mic error: ${e.error}`); setMode("error"); };
    r.onend = () => { if (mode==="listening") setMode("idle"); };
    r.start();
  };
 
  const handleMicClick = () => {
    if (mode==="idle")       startListening();
    else if (mode==="speaking")  { synthRef.current?.cancel(); setMode("idle"); setExpanded(false); }
    else if (mode==="listening") { recognitionRef.current?.stop(); setMode("idle"); setExpanded(false); }
    else if (mode==="error") reset();
  };
 
  const WaveBars = () => (
    <div style={{ display:"flex", alignItems:"center", gap:3, height:20 }}>
      {[1,1.6,0.8,1.4,1,1.8,0.9].map((h,i) => (
        <div key={i} style={{ width:3, height:`${h*14}px`, borderRadius:2, background:accent,
          animation:`evDot ${0.6+i*0.07}s ease-in-out infinite`, animationDelay:`${i*0.08}s` }}/>
      ))}
    </div>
  );
 
  const Spinner = () => (
    <div style={{ width:18, height:18, border:`2.5px solid ${accent}33`,
      borderTop:`2.5px solid ${accent}`, borderRadius:"50%", animation:"evSpin 0.7s linear infinite" }}/>
  );
 
  const IdleDots = () => (
    <div style={{ display:"flex", gap:4, alignItems:"center" }}>
      {[0,1,2].map(i => <div key={i} style={{ width:6, height:6, borderRadius:"50%", background:t.accent, opacity:0.4+i*0.2 }}/>)}
    </div>
  );
 
  const labelMap = { idle:"Ask EV Assistant...", listening:transcript||"Listening…", thinking:"Thinking…", speaking:reply, error:errorMsg };
 
  return (
    <div style={{ position:"absolute", left:"50%", transform:"translateX(-50%)", top:7, zIndex:20 }}>
      <div style={{
        display:"flex", alignItems:"center", gap:12, padding:"0 16px 0 10px",
        height:48, borderRadius:999, background:t.aiBg, backdropFilter:t.cardBackdrop,
        border: mode==="idle" ? t.aiBorder : `1.5px solid ${accent}66`,
        boxShadow: mode!=="idle" ? `0 0 0 3px ${accent}22, 0px 4px 20px rgba(47,128,237,0.12)` : "0px 4px 20px rgba(47,128,237,0.12)",
        transition:"all 0.3s", minWidth:300, maxWidth:expanded?520:320, overflow:"hidden",
        cursor: mode==="idle"?"pointer":"default",
      }} onClick={() => { if (mode==="idle") startListening(); }}>
 
        <button {...press} onClick={e => { e.stopPropagation(); handleMicClick(); }}
          style={{ width:34, height:34, borderRadius:"50%", flexShrink:0, border:"none",
            background: mode==="idle" ? t.accentGrad : `linear-gradient(135deg,${accent},${accent}cc)`,
            display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", outline:"none",
            boxShadow: mode!=="idle" ? `0 0 14px ${accent}88` : `0px 0px 12px rgba(47,128,237,0.4)`,
            animation: mode==="listening" ? "evPulse 1s ease-in-out infinite" : "none",
            transition:"background 0.3s, box-shadow 0.3s" }}>
          {mode==="thinking" ? <Spinner />
            : mode==="speaking"
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M19.07 4.93a10 10 0 010 14.14"/>
                </svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M12 15a3 3 0 003-3V7a3 3 0 10-6 0v5a3 3 0 003 3z"/>
                  <path d="M19 11a7 7 0 01-14 0"/><line x1="12" y1="18" x2="12" y2="22"/>
                </svg>
          }
        </button>
 
        <div style={{ flex:1, overflow:"hidden", display:"flex", alignItems:"center", gap:10, animation:expanded?"evFadeIn 0.25s ease":"none" }}>
          {mode==="listening" ? <WaveBars /> : (
            <span style={{ fontFamily:"'Inter',sans-serif", fontWeight:mode==="idle"?500:600,
              fontSize:mode==="speaking"?13:15,
              color:mode==="idle"?t.aiText:mode==="error"?"#EF4444":t.textPrimary,
              whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
              maxWidth:expanded?440:220, transition:"max-width 0.3s" }}>
              {labelMap[mode]}
            </span>
          )}
        </div>
 
        <div style={{ flexShrink:0 }}>
          {mode==="idle" && <IdleDots />}
          {mode==="error" && <button {...press} onClick={reset} style={{ background:"none", border:"none", cursor:"pointer", fontSize:16, color:"#EF4444", transition:"transform 0.1s, opacity 0.1s" }}>✕</button>}
          {mode==="speaking" && (
            <button {...press} onClick={() => { synthRef.current?.cancel(); setMode("idle"); setExpanded(false); }}
              style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, color:accent, fontWeight:700, transition:"transform 0.1s, opacity 0.1s" }}>
              Stop
            </button>
          )}
        </div>
      </div>
 
      {mode==="speaking" && reply && (
        <div style={{
          position:"absolute", top:56, left:0, width:480,
          background:dark?"rgba(28,31,42,0.97)":"rgba(255,255,255,0.97)",
          border:`1.5px solid ${accent}33`, borderRadius:20, padding:"14px 18px",
          boxShadow:dark?"0 8px 28px rgba(0,0,0,0.4)":"0 8px 28px rgba(0,0,0,0.08)",
          backdropFilter:t.cardBackdrop, fontFamily:"'Inter',sans-serif", fontSize:14, lineHeight:1.6,
          color:dark?"#E8EAF0":"#444", animation:"evFadeIn 0.25s ease", zIndex:30,
        }}>
          <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" style={{ flexShrink:0, marginTop:2 }}>
              <path d="M12 15a3 3 0 003-3V7a3 3 0 10-6 0v5a3 3 0 003 3z"/>
              <path d="M19 11a7 7 0 01-14 0"/><line x1="12" y1="18" x2="12" y2="22"/>
            </svg>
            {reply}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Map Area ────────────────────────────────────────────────────── */
function MapArea({ theme }) {
  const t = tk(theme);
  const dark = theme === "dark";
  const containerRef = useRef(null);
  const mapRef       = useRef(null);
  const tileRef      = useRef(null);
  const [ready, setReady] = useState(false);

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
    const L   = window.L;
    const map = L.map(containerRef.current, { center:[1.5295,110.3592], zoom:15, zoomControl:false, attributionControl:true, dragging:true });
    const tileUrl = dark
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    tileRef.current = L.tileLayer(tileUrl, { attribution:"© OpenStreetMap", maxZoom:19 }).addTo(map);
    L.control.zoom({ position:"bottomright" }).addTo(map);

    const arrowIcon = L.divIcon({
      html: `<div style="width:0;height:0;border-left:12px solid transparent;border-right:12px solid transparent;border-bottom:30px solid ${t.accent};filter:drop-shadow(0 0 6px rgba(47,128,237,0.7));"></div>`,
      iconSize:[24,30], iconAnchor:[12,15], className:"",
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude:lat, longitude:lng } }) => { map.setView([lat,lng],16,{animate:true}); L.marker([lat,lng],{icon:arrowIcon}).addTo(map); },
        () => { L.marker([1.5295,110.3592],{icon:arrowIcon}).addTo(map); },
      );
    } else { L.marker([1.5295,110.3592],{icon:arrowIcon}).addTo(map); }
    mapRef.current = map;
  }, [ready]);

  useEffect(() => {
    if (!mapRef.current || !tileRef.current) return;
    const L = window.L;
    mapRef.current.removeLayer(tileRef.current);
    const tileUrl = dark
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    tileRef.current = L.tileLayer(tileUrl, { attribution:"© OpenStreetMap", maxZoom:19 }).addTo(mapRef.current);
  }, [dark]);

  return (
    <div style={{
      position:"absolute", width:442, height:593, left:45, top:62,
      boxShadow: t.shadow, borderRadius:24, overflow:"hidden",
      border: t.cardBorder,
    }}>
      <div ref={containerRef} style={{ width:"100%", height:"100%" }} />

      {/* turn overlay — glassmorphism */}
      <div style={{
        position:"absolute", width:234, top:22, left:28, zIndex:1000,
        background: t.menuBg,
        backdropFilter: t.cardBackdrop,
        border: t.menuBorder,
        boxShadow: t.shadow,
        borderRadius:20, display:"flex", alignItems:"center",
        gap:12, padding:"14px 16px",
      }}>
        <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
          <path d="M8 36V16L24 4" stroke={t.textPrimary} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 4h10v10" stroke={t.textPrimary} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight:700, fontSize:40, lineHeight:"48px", color:t.textPrimary }}>750m</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight:500, fontSize:16, color:t.textSecond }}>Turn Right</div>
        </div>
      </div>

      {/* speed overlay */}
      <div style={{
        position:"absolute", width:145, height:145,
        left:18, top:431, zIndex:1000,
        background: dark ? "rgba(28,31,42,0.92)" : "rgba(255,255,255,0.7)",
        backdropFilter: t.cardBackdrop,
        border: t.menuBorder,
        boxShadow: t.shadow,
        borderRadius:"50%",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
      }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight:800, fontSize:48, lineHeight:"58px", color:t.textPrimary }}>80</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight:500, fontSize:14, color:t.textSecond }}>km/h</div>
      </div>

      {/* max speed overlay */}
      <div style={{
        position:"absolute", width:75, height:75,
        left:183, top:473, zIndex:1000,
        background: dark ? "rgba(28,31,42,0.92)" : "rgba(255,255,255,0.7)",
        backdropFilter: t.cardBackdrop,
        border: t.menuBorder,
        boxShadow: t.shadow,
        borderRadius:20,
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
      }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight:600, fontSize:16, color:t.textSecond }}>MAX</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight:700, fontSize:24, color:t.textPrimary }}>90</div>
      </div>

      <style>{`
        .leaflet-map-pane       { z-index: 1 !important; }
        .leaflet-tile-pane      { z-index: 1 !important; }
        .leaflet-control-zoom   { margin-right:8px !important; margin-bottom:8px !important; }
        .leaflet-control-zoom a { width:28px !important; height:28px !important; line-height:28px !important; font-size:15px !important; }
        .leaflet-control-attribution { font-size:9px !important; }
      `}</style>
    </div>
  );
}

/* ── Battery Card ────────────────────────────────────────────────── */
function BatteryCard({ onGoToSession, setActive, theme }) {
  const t = tk(theme);
  const press = usePress();
  const [status, setStatus] = useState(0);
 
  const states = [
    { title:"Battery",  percent:78,  color:"#22C55E", subColor:"#22C55E", text:"312 km available",   bottom:"Not connected · Last charged 2h ago", charging:false, completed:false },
    { title:"Battery",  percent:100, color:"#22C55E", subColor:"#22C55E", charging:false, completed:true },
    { title:"Charging", percent:22,  color:"#EF4444", subColor:t.textPrimary, text:"95 km remaining", bottom:"Est. full charge in", eta:"1h 25m", charging:true, completed:false },
  ];
  const current = states[status];
 
  return (
    <div onClick={() => setStatus(s => (s+1)%states.length)} style={{
      position:"absolute", width:356, height:210, left:512, top:64,
      background:t.cardBg, backdropFilter:t.cardBackdrop, border:t.cardBorder,
      boxShadow:t.shadow, borderRadius:24, cursor:"pointer",
      transition:"transform 0.1s" }}>
 
      <div style={{ position:"absolute", left:30, top:18, fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:11, letterSpacing:"1.2px", textTransform:"uppercase", color:t.textSecond }}>{current.title}</div>
 
      {/* ··· button */}
      <button {...press} onClick={e => { e.stopPropagation(); setActive(1); }}
        style={{ position:"absolute", right:20, top:20, background:"none", border:"none",
          cursor:"pointer", color:t.textSecond, display:"flex", alignItems:"center", gap:3, padding:6,
          transition:"transform 0.1s, opacity 0.1s" }}>
        {[0,1,2].map(i => <div key={i} style={{ width:4, height:4, borderRadius:"50%", background:t.textSecond }}/>)}
      </button>
 
      {/* battery bar */}
      <div style={{ position:"absolute", left:30, top:55 }}>
        <svg width="120" height="60" viewBox="0 0 120 60">
          <rect x="2" y="8" width="104" height="44" rx="10" stroke={current.color} strokeWidth="4" fill="none"/>
          <rect x="106" y="20" width="10" height="20" rx="3" fill={current.color}/>
          <rect x="8" y="14" width={(current.percent/100)*88} height="32" rx="6" fill={current.color}
            style={{ transition:"0.4s ease", filter:current.charging?"drop-shadow(0 0 8px rgba(34,197,94,0.7))":"none" }}/>
        </svg>
      </div>
      <div style={{ position:"absolute", left:199, top:65, fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:36, color:t.textPrimary }}>{current.percent}%</div>
 
      {!current.completed && (
        <div style={{ position:"absolute", left:32, top:122, display:"flex", alignItems:"center", gap:8 }}>
          {current.charging
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="#22C55E"><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></svg>
            : <div style={{ width:7, height:7, borderRadius:"50%", background:current.color, flexShrink:0 }}/>
          }
          <span style={{ fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:15, color:current.subColor }}>{current.text}</span>
        </div>
      )}
 
      {current.completed && (
        <div style={{ position:"absolute", left:32, top:122, display:"flex", alignItems:"center", gap:7 }}>
          <div style={{ width:16, height:16, borderRadius:"50%", border:"2px solid #22C55E", flexShrink:0,
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span style={{ fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:15, color:"#22C55E" }}>Charge Completed</span>
        </div>
      )}
 
      <div style={{ position:"absolute", left:28, right:28, top:152, height:1, background:t.divider }}/>
 
      {!current.completed && !current.charging && (
        <div style={{ position:"absolute", left:28, right:28, top:164, display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
          <span style={{ fontSize:12, color:t.textSecond, fontWeight:500, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", flex:1 }}>{current.bottom}</span>
          <div {...press} onClick={e => { e.stopPropagation(); onGoToSession?.(); }}
            style={{ background:t.chargeBg, padding:"7px 14px", borderRadius:999,
              display:"flex", alignItems:"center", gap:6, cursor:"pointer", flexShrink:0,
              transition:"transform 0.1s, opacity 0.1s" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></svg>
            <span style={{ fontSize:11, fontWeight:700, color:t.chargeText }}>Tap to charge</span>
          </div>
        </div>
      )}
 
      {current.charging && (
        <div style={{ position:"absolute", left:32, top:164, display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:13, color:t.textMuted, fontWeight:500 }}>{current.bottom}</span>
          <span style={{ fontSize:16, color:t.accent, fontWeight:700 }}>{current.eta}</span>
        </div>
      )}
 
      {current.completed && (
        <div style={{ position:"absolute", left:28, right:28, top:162, display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:11, color:t.textSecond, fontWeight:500 }}>Last charge</div>
            <div style={{ fontSize:15, fontWeight:700, color:t.textPrimary, marginTop:2 }}>100%</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:15, fontWeight:700, color:t.textSecond }}>3h 20m</div>
            <div style={{ fontSize:11, color:t.textMuted, marginTop:2 }}>Today, 09:15 AM</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Climate Card ────────────────────────────────────────────────── */
function ClimateCard({ temp, setTemp, setActive, theme }) {
  const t = tk(theme);
  const press = usePress();
  const [activeBars, setActiveBars] = useState([true, false, false]);
  const [autoMode, setAutoMode]     = useState(true);
  const bars = [10, 14, 18];
 
  const toggleBar = (i) => { if (i===0) return; setAutoMode(false); setActiveBars(p => p.map((v,j) => j===i?!v:v)); };
  const handleAuto = () => { setAutoMode(true); setActiveBars([true,false,false]); setTemp(24); };
 
  return (
    <div style={{ position:"absolute", width:356, height:142, left:512, top:300,
      background:t.cardBg, backdropFilter:t.cardBackdrop, border:t.cardBorder, boxShadow:t.shadow, borderRadius:24 }}>
 
      <div style={{ position:"absolute", left:28, top:14, fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:11, letterSpacing:"1.2px", textTransform:"uppercase", color:t.textSecond }}>Climate</div>
      
      <button {...press} onClick={() => setActive(3)}
        style={{ position:"absolute", right:16, top:4, background:"none", border:"none",
          fontSize:26, color:t.textSecond, cursor:"pointer", padding:"4px 8px", lineHeight:1,
          transition:"transform 0.1s, opacity 0.1s" }}>›</button>
 
      {/* AUTO pill */}
      <button {...press} onClick={handleAuto}
        style={{ position:"absolute", left:26, top:42, height:28, padding:"0 14px",
          borderRadius:999, border:autoMode?`1.5px solid ${t.accent}`:t.inputBorder,
          background:autoMode?`${t.accent}18`:t.inputBg,
          color:autoMode?t.accent:t.textSecond,
          fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:12, cursor:"pointer",
          display:"flex", alignItems:"center", gap:6,
          transition:"transform 0.1s, opacity 0.1s, border 0.2s, background 0.2s" }}>
        <div style={{ width:6, height:6, borderRadius:"50%", background:autoMode?t.accent:t.textMuted, flexShrink:0 }}/>
        AUTO
      </button>
 
      {/* fan */}
      <div style={{ position:"absolute", left:26, top:80, width:94, height:44,
        background:t.inputBg, border:t.inputBorder, borderRadius:18,
        display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill={t.iconStroke}>
          <path d="M12 12c1.5-2 4-3 6-2s3 4 1 6-5 2-7 1c0 2-1 5-3 6s-5 0-5-3 2-5 4-6c-2-1-4-3-3-5s4-2 6-1c1-2 3-4 5-4s4 2 3 4-3 3-5 4h-2z"/>
        </svg>
        <div style={{ display:"flex", gap:3, alignItems:"flex-end" }}>
          {bars.map((h,i) => (
            <div key={i} onClick={()=>toggleBar(i)} style={{ width:4, height:h, borderRadius:2,
              cursor:i===0?"default":"pointer", background:activeBars[i]?t.accent:t.divider, transition:"background 0.2s" }}/>
          ))}
        </div>
      </div>
 
      {/* temp ─/+ */}
      <div style={{ position:"absolute", right:20, top:80, height:44, display:"flex", alignItems:"center", gap:10 }}>
        <button {...press} onClick={()=>{ setAutoMode(false); setTemp(v=>Math.max(16,v-1)); }}
          style={{ width:44, height:44, border:t.inputBorder, borderRadius:14,
            background:t.inputBg, fontSize:22, cursor:"pointer", color:t.textPrimary,
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"transform 0.1s, opacity 0.1s" }}>−</button>
        <span style={{ fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:20, minWidth:50, textAlign:"center", color:t.textPrimary }}>{temp}°</span>
        <button {...press} onClick={()=>{ setAutoMode(false); setTemp(v=>Math.min(30,v+1)); }}
          style={{ width:44, height:44, border:t.inputBorder, borderRadius:14,
            background:t.inputBg, fontSize:22, cursor:"pointer", color:t.textPrimary,
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"transform 0.1s, opacity 0.1s" }}>+</button>
      </div>
    </div>
  );
}

/* ── Trip Card ───────────────────────────────────────────────────── */
function TripCard({ setActive, theme }) {
  const t = tk(theme);
  return (
    <div style={{
      position:"absolute", width:356, height:180, left:512, top:470,
      background: t.cardBg,
      backdropFilter: t.cardBackdrop,
      border: t.cardBorder,
      boxShadow: t.shadow,
      borderRadius:24,
    }}>
      {/* Trip origin icon */}
      <div style={{ position:"absolute", width:40, height:40, left:21, top:8,
        background: t.tripAccentBg, borderRadius:"50%",
        display:"flex", alignItems:"center", justifyContent:"center" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={t.accent} strokeWidth="2" strokeLinecap="round">
          <path d="M3 17l6-12 6 12"/><path d="M21 7V17"/><path d="M17 7v10"/>
        </svg>
      </div>

      {/* Destination icon */}
      <div style={{ position:"absolute", width:40, height:40, left:21, top:57,
        background: theme === "dark" ? "rgba(16,185,129,0.15)" : "#E8F9EF",
        borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
      </div>

      <div style={{ position:"absolute", left:74, top:19, fontFamily: "'Inter', sans-serif", fontWeight:500, fontSize:15, color:t.textPrimary }}>Trip</div>
      <div style={{ position:"absolute", left:74, top:60, fontFamily: "'Inter', sans-serif", fontWeight:600, fontSize:14, color:t.textPrimary }}>Vivacity Mall</div>
      <div style={{ position:"absolute", left:74, top:78, fontFamily: "'Inter', sans-serif", fontWeight:400, fontSize:12, color:t.textSecond }}>Jalan Setia Raja</div>
      <button onClick={() => setActive(2)} style={{ position:"absolute", right:18, top:16, background:"none", border:"none", fontFamily: "'Inter', sans-serif", fontSize:22, cursor:"pointer", color:t.textPrimary }}>›</button>

      {[
        { left:21,  label:"ETA",      value:"03:12", sub:"PM",  accent:true  },
        { left:131, label:"Distance", value:"3.2",   sub:"km",  accent:false },
        { left:241, label:"Left",     value:"14",    sub:"min", accent:false },
      ].map(({ left, label, value, sub, accent: isAccent }) => (
        <div key={label} style={{
          position:"absolute", width:92, height:56, left, top:107,
          background: isAccent ? t.tripAccentBg : t.tripBadgeBg,
          border: t.tripBadgeBorder,
          boxShadow: t.menuShadow,
          backdropFilter: t.cardBackdrop,
          borderRadius:16,
        }}>
          <div style={{ position:"absolute", left:14, top:2, fontFamily: "'Inter', sans-serif", fontWeight:500, fontSize:10, color: isAccent ? t.accent : t.textMuted }}>{label}</div>
          <div style={{ position:"absolute", left:14, top:18, fontFamily: "'Inter', sans-serif", fontWeight:700, fontSize:15, color: t.accent }}>{value}</div>
          <div style={{ position:"absolute", left:14, top:35, fontFamily: "'Inter', sans-serif", fontWeight:500, fontSize:10, color:t.textMuted }}>{sub}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Clock Card ──────────────────────────────────────────────────── */
function ClockCard({ theme }) {
  const t = tk(theme);
  const [time, setTime] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(id); }, []);
  const days   = ["S","M","T","W","T","F","S"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const dow  = time.getDay();
  const hh   = time.getHours() % 12 || 12;
  const mm   = String(time.getMinutes()).padStart(2,"0");
  const ampm = time.getHours() >= 12 ? "PM" : "AM";

  return (
    <div style={{
      position:"absolute", width:332, height:164, left:897, top:64,
      background: t.cardBg,
      backdropFilter: t.cardBackdrop,
      border: t.cardBorder,
      boxShadow: t.shadow,
      borderRadius:24,
    }}>
      <div style={{ position:"absolute", left:33, top:20, fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:11, letterSpacing:"1.2px", color:"#F59E0B" }}>GOOD MORNING</div><div style={{ position:"absolute", left:33, top:48, fontFamily: "'Inter', sans-serif", fontWeight:700, fontSize:32, color:t.textPrimary }}>{String(hh).padStart(2,"0")}:{mm}</div>
      <div style={{ position:"absolute", left:120, top:55, fontFamily: "'Inter', sans-serif", fontWeight:500, fontSize:13, color:"#F59E0B" }}>{ampm}</div>
      {/* clock face */}
      <div style={{ position:"absolute", right:20, top:20 }}>
        <svg width="52" height="52" viewBox="0 0 52 52">
          <circle cx="26" cy="26" r="22" fill={theme === "dark" ? "rgba(45,50,65,0.9)" : "rgba(244,247,250,0.85)"} stroke={t.divider} strokeWidth="1"/>
          <circle cx="26" cy="26" r="2" fill={t.textPrimary}/>
          <line x1="26" y1="26" x2="26" y2="10" stroke={t.textPrimary} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="26" y1="26" x2="38" y2="26" stroke={t.textPrimary} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div style={{ position:"absolute", left:33, top:92, fontFamily: "'Inter', sans-serif", fontWeight:500, fontSize:13, color:t.textSecond }}>
        {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dow]}, {time.getDate()} {months[time.getMonth()]} {time.getFullYear()}
      </div>
      <div style={{ position:"absolute", left:33, top:118, display:"flex", gap:12 }}>
        {days.map((d,i) => (
          <div key={i} style={{
            width:25, height:27, display:"flex", alignItems:"center", justifyContent:"center",
            borderRadius:10,
            border: i===dow ? `2px solid ${t.accent}` : "none",
            background: i===dow ? (theme === "dark" ? `rgba(47,128,237,0.15)` : `rgba(47,128,237,0.08)`) : "transparent",
            fontFamily: "'Inter', sans-serif", fontWeight:500, fontSize:13,
            color: i===dow ? t.accent : t.textMuted,
          }}>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Weather Card ────────────────────────────────────────────────── */
function WeatherCard({ theme }) {
  const t = tk(theme);
  const dark = theme === "dark";

  const forecast = [
    { time: "Now",  icon: "cloudy", temp: 24 },
    { time: "12PM", icon: "sunny",  temp: 27 },
    { time: "3PM",  icon: "cloudy", temp: 26 },
    { time: "6PM",  icon: "rain",   temp: 23 },
    { time: "9PM",  icon: "cloudy", temp: 21 },
  ];

  const WeatherIcon = ({ type, size = 28 }) => {
    const gray = dark ? "rgba(156,163,175,0.7)" : "rgba(100,110,130,0.5)";
    if (type === "sunny") return (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="6" fill="#F59E0B"/>
        {[0,45,90,135,180,225,270,315].map((deg, i) => {
          const rad = deg * Math.PI / 180;
          return <line key={i} x1={14+9*Math.cos(rad)} y1={14+9*Math.sin(rad)}
            x2={14+12*Math.cos(rad)} y2={14+12*Math.sin(rad)}
            stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>;
        })}
      </svg>
    );
    if (type === "rain") return (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <ellipse cx="14" cy="11" rx="7" ry="5" fill={gray}/>
        <ellipse cx="9"  cy="13" rx="5" ry="4" fill={gray} opacity="0.7"/>
        <line x1="10" y1="19" x2="8"  y2="23" stroke={t.accent} strokeWidth="2" strokeLinecap="round"/>
        <line x1="14" y1="19" x2="12" y2="23" stroke={t.accent} strokeWidth="2" strokeLinecap="round"/>
        <line x1="18" y1="19" x2="16" y2="23" stroke={t.accent} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
    return (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
        <circle cx="10" cy="14" r="5" fill={gray}/>
        <ellipse cx="17" cy="13" rx="6" ry="5" fill={gray}/>
        <ellipse cx="12" cy="16" rx="6" ry="4" fill={gray}/>
      </svg>
    );
  };

  return (
    <div style={{
      position:"absolute", width:332, height:172, left:896, top:254,
      background: t.cardBg,
      backdropFilter: t.cardBackdrop,
      border: t.cardBorder,
      boxShadow: t.shadow,
      borderRadius:24,
      overflow:"hidden",
    }}>
      {/* Title */}
      <div style={{ position:"absolute", left:20, top:14, fontFamily:"'Inter',sans-serif",
        fontWeight:600, fontSize:11, letterSpacing:"1.2px", textTransform:"uppercase",
        color:t.textSecond }}>Weather · Kuching</div>

      {/* Main icon + description — left */}
      <div style={{ position:"absolute", left:20, top:32, display:"flex", alignItems:"center", gap:8 }}>
        <WeatherIcon type="cloudy" size={32}/>
        <div>
          <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:500, fontSize:13,
            color:t.textPrimary }}>Cloudy</div>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:t.textMuted,
            marginTop:2 }}>H:26°  L:20°  💧82%</div>
        </div>
      </div>

      {/* Temp — right top */}
      <div style={{ position:"absolute", right:18, top:28, fontFamily:"'Inter',sans-serif",
        fontWeight:700, fontSize:38, lineHeight:1, color:t.textPrimary }}>
        24<span style={{ fontSize:20, fontWeight:500 }}>°</span>
        <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:400,
          color:t.textMuted, textAlign:"right", marginTop:2 }}>Feels 28°</div>
      </div>

      {/* Divider */}
      <div style={{ position:"absolute", left:16, right:16, top:84, height:1,
        background:t.divider }}/>

      {/* Forecast strip */}
      <div style={{
        position:"absolute", left:0, right:0, top:88, bottom:0,
        display:"flex", alignItems:"center",
      }}>
        {forecast.map((f, i) => (
          <div key={i} style={{
            flex:1, display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center", gap:4,
          }}>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:10,
              fontWeight: i===0 ? 700 : 500,
              color: i===0 ? t.accent : t.textMuted,
              letterSpacing:"0.3px", textTransform:"uppercase" }}>{f.time}</div>
            <WeatherIcon type={f.icon} size={20}/>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:12,
              fontWeight:600, color: i===0 ? t.textPrimary : t.textSecond }}>{f.temp}°</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Music Card ──────────────────────────────────────────────────── */
function MusicCard({ theme }) {
  const t = tk(theme);
  const press = usePress();
  const songs = [
    { title:"Sunset Drive", artist:"Ocean Eyes", duration:225, image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400" },
    { title:"Night Fall",   artist:"Lowlight",   duration:210, image:"https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=400" },
  ];
  const [songIndex, setSongIndex] = useState(0);
  const [playing,   setPlaying]   = useState(true);
  const [progress,  setProgress]  = useState(0);
  const currentSong = songs[songIndex];
  const total = currentSong.duration;
 
  useEffect(() => {
    const id = setInterval(() => {
      if (playing) setProgress(p => {
        if (p>=total) { setSongIndex(i=>(i+1)%songs.length); return 0; }
        return p+1;
      });
    }, 1000);
    return ()=>clearInterval(id);
  }, [playing, total]);
 
  const fmt = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
  const nextSong = () => { setSongIndex(i=>(i+1)%songs.length); setProgress(0); };
  const prevSong = () => { setSongIndex(i=>i===0?songs.length-1:i-1); setProgress(0); };
  const pct = (progress/total)*100;
 
  return (
    <div style={{ position:"absolute", width:334, height:200, left:895, top:450,
      background:"linear-gradient(134.6deg, #2F80ED 1.6%, #56CCF2 100%)",
      borderRadius:24, overflow:"hidden", boxShadow:t.shadow }}>
 
      <div style={{ position:"absolute", left:26, top:15, fontFamily:"'Inter',sans-serif", fontWeight:500, fontSize:11, color:"rgba(255,255,255,0.7)", letterSpacing:"1px" }}>NOW PLAYING</div>
 
      {/* animated eq bars */}
      <div style={{ position:"absolute", right:20, top:13, display:"flex", gap:3, alignItems:"flex-end" }}>
        {[12,18,22,15,10].map((h,i) => (
          <div key={i} style={{ width:3, height:h, background:"rgba(255,255,255,0.6)", borderRadius:2,
            animation:playing?`evDot ${0.5+i*0.1}s ease-in-out infinite`:"none", animationDelay:`${i*0.07}s` }}/>
        ))}
      </div>
 
      <img src={currentSong.image} alt="" style={{ position:"absolute", left:26, top:46, width:74, height:74, borderRadius:14, objectFit:"cover" }}/>
 
      <div style={{ position:"absolute", left:116, top:50, right:18 }}>
        <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:16, color:"#fff", marginBottom:6 }}>{currentSong.title}</div>
        <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:500, fontSize:12, color:"rgba(255,255,255,0.6)" }}>{currentSong.artist}</div>
      </div>
 
      {/* progress bar */}
      <div style={{ position:"absolute", left:26, top:130, width:282, height:4, background:"rgba(255,255,255,0.25)", borderRadius:2 }}>
        <div style={{ position:"absolute", left:0, top:0, width:`${pct}%`, height:"100%", background:"#fff", borderRadius:2, transition:"width 1s linear" }}/>
        <div style={{ position:"absolute", left:`calc(${pct}% - 5px)`, top:-3, width:10, height:10, background:"#fff", borderRadius:"50%" }}/>
      </div>
      <div style={{ position:"absolute", left:26, top:135, fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,0.65)" }}>{fmt(progress)}</div>
      <div style={{ position:"absolute", right:26, top:135, fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,0.65)" }}>{fmt(total)}</div>
 
      {/* controls */}
      <div style={{ position:"absolute", left:0, right:0, top:148, display:"flex", alignItems:"center", justifyContent:"center", gap:20 }}>
        <button {...press} onClick={prevSong}
          style={{ background:"none", border:"none", cursor:"pointer", padding:8, borderRadius:"50%", transition:"transform 0.1s, opacity 0.1s" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M6 6h2v12H6zm3.5 6L18 18V6z"/></svg>
        </button>
        <button {...press} onClick={()=>setPlaying(p=>!p)}
          style={{ width:50, height:50, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.45)",
            background:"rgba(255,255,255,0.18)", cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"transform 0.1s, opacity 0.1s" }}>
          {playing
            ? <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
          }
        </button>
        <button {...press} onClick={nextSong}
          style={{ background:"none", border:"none", cursor:"pointer", padding:8, borderRadius:"50%", transition:"transform 0.1s, opacity 0.1s" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ── Page Root ───────────────────────────────────────────────────── */
export default function HomePage({ navActive, setNavActive, onGoToSession, onGoToAccount, theme }) {
  const [temp, setTemp] = useState(24);
  const t = tk(theme);
  const dark = theme === "dark";

  return (
    <div style={{
      position:"relative", width:1280, height:800,
      background: t.pageBg,
      overflow:"hidden", fontFamily:"Inter, sans-serif",
      transition:"background 0.3s",
    }}>
      {/* Background accent blobs — same as settingsPage */}
      <div style={{
        position:"absolute", width:500, height:500,
        background: t.blobA,
        borderRadius:"50%", top:-80, right:-80,
        filter:"blur(80px)", pointerEvents:"none",
      }}/>
      <div style={{
        position:"absolute", width:350, height:350,
        background: t.blobB,
        borderRadius:"50%", bottom:60, left:60,
        filter:"blur(60px)", pointerEvents:"none",
      }}/>

      <TopBar theme={theme}  onGoToAccount={onGoToAccount} center= {<EVAssistant theme={theme} />}/>
      <MapArea theme={theme} />
      <BatteryCard onGoToSession={onGoToSession} setActive={setNavActive} theme={theme} />
      <ClimateCard temp={temp} setTemp={setTemp} setActive={setNavActive} theme={theme} />
      <TripCard setActive={setNavActive} theme={theme} />
      <ClockCard theme={theme} />
      <WeatherCard theme={theme} />
      <MusicCard theme={theme} />
      <BottomNav active={navActive} setActive={setNavActive} theme={theme}/>
    </div>
  );
}