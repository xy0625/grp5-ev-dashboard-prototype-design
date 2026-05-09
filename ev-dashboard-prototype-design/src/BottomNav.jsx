const NAV_ITEMS = [
  {
    label: "Apps",
    icon: (a) => (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <rect x="5"  y="5"  width="14" height="14" rx="2" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="3.5"/>
        <rect x="25" y="5"  width="14" height="14" rx="2" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="3.5"/>
        <rect x="5"  y="25" width="14" height="14" rx="2" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="3.5"/>
        <rect x="25" y="25" width="14" height="14" rx="2" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="3.5"/>
      </svg>
    ),
  },
  {
    label: "Charging",
    icon: (a) => (
      <div style={{ width:58, height:58, background: a?"#6366F1":"#e5e7eb", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.25s" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill={a?"#fff":"#4B4E53"}>
          <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      </div>
    ),
  },
  {
    label: "Nav",
    icon: (a) => (
      <svg width="32" height="44" viewBox="0 0 32 55" fill="none">
        <rect x="3" y="3" width="26" height="26" rx="2" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="3.5"/>
        <line x1="16" y1="29" x2="16" y2="44" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="3.5"/>
        <line x1="6"  y1="44" x2="26" y2="44" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="3.5"/>
      </svg>
    ),
  },
  {
    label: "Weather",
    icon: (a) => (
      <svg width="48" height="44" viewBox="0 0 58 58" fill={a?"#6366F1":"#4B4E53"}>
        <path d="M10 38a10 10 0 010-20c1-6 7-10 13-9 5 1 9 4 10 8a8 8 0 01-1 16H10z"/>
      </svg>
    ),
  },
  {
    label: "Emergency",
    icon: (a) => (
      <svg width="44" height="44" viewBox="0 0 58 58" fill="none" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="4">
        <path d="M14 8h8l4 10-5 3a28 28 0 0016 16l3-5 10 4v8a4 4 0 01-4 4C22 47 11 36 11 12a4 4 0 013-4z"/>
      </svg>
    ),
  },
  {
    label: "Settings",
    icon: (a) => (
      <svg width="44" height="44" viewBox="0 0 58 58" fill="none" stroke={a?"#6366F1":"#4B4E53"} strokeWidth="4">
        <circle cx="29" cy="29" r="8"/>
        <path d="M29 5v6M29 47v6M5 29h6M47 29h6M10.1 10.1l4.2 4.2M43.7 43.7l4.2 4.2M47.9 10.1l-4.2 4.2M14.3 43.7l-4.2 4.2"/>
      </svg>
    ),
  },
];

export default function BottomNav({ active, setActive }) {
  return (
    <div style={{ position:"absolute", width:1148, height:108, left:"calc(50% - 574px)", top:662, background:"rgba(255,255,255,0.92)", backdropFilter:"blur(12px)", border:"1px solid rgba(0,0,0,0.06)", borderRadius:35, display:"flex", alignItems:"center", justifyContent:"space-around", padding:"0 20px", boxShadow:"0 2px 16px rgba(0,0,0,0.07)", zIndex:10 }}>
      {NAV_ITEMS.map((item, i) => (
        <button key={item.label} onClick={() => setActive(i)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4, padding:0 }}>
          {item.icon(active === i)}
          <span style={{ fontFamily:"Inter", fontSize:11, color: active===i?"#6366F1":"#4B4E53", fontWeight: active===i?600:400 }}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}