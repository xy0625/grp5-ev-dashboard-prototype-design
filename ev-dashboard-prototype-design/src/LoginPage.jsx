import React from 'react';

// Using Jocelyn's design tokens for consistency
const tk = (theme) => {
  const dark = theme === "dark";
  return {
    pageBg: dark ? "#0F1117" : "#F8F9FB",
    cardBg: dark ? "rgba(28, 31, 42, 0.85)" : "rgba(255, 255, 255, 0.9)",
    cardBorder: dark ? "1px solid #2C2F3E" : "1px solid #E5E7EB",
    textPrimary: dark ? "#E8EAF0" : "#000000",
    textSecond: dark ? "#9CA3AF" : "#808080",
    inputBg: dark ? "#252836" : "#FFFFFF",
    inputBorder: dark ? "1px solid #3A3F52" : "1px solid #D9D9D9",
  };
};

export default function LoginPage({ theme = "dark", onLoginSuccess }) {
  const t = tk(theme);

  // Function to handle login button click
  const handleLogin = (e) => {
    e.preventDefault();
    if (onLoginSuccess) onLoginSuccess(); 
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      backgroundImage: 'url(/login-bg.png)', // This is the file you just added!
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Inter, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Background Overlay (深色遮罩让文字更清晰) */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1
      }} />

      {/* Login Card (登录框) */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        backgroundColor: t.cardBg,
        border: t.cardBorder,
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        textAlign: 'center',
        backdropFilter: 'blur(10px)' // Glassmorphism effect
      }}>
        <h2 style={{ color: t.textPrimary, fontSize: '28px', marginBottom: '10px' }}>DRIVER LOGIN</h2>
        <p style={{ color: t.textSecond, fontSize: '14px', marginBottom: '30px' }}>Please enter your credentials</p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ display: 'block', color: t.textSecond, fontSize: '12px', marginBottom: '5px' }}>EMAIL ADDRESS</label>
            <input 
              type="email" 
              placeholder="Enter your email..." 
              style={{ 
                width: '100%', padding: '15px', borderRadius: '12px', 
                backgroundColor: t.inputBg, color: t.textPrimary, border: t.inputBorder,
                boxSizing: 'border-box'
              }} 
            />
          </div>

          <div style={{ marginBottom: '30px', textAlign: 'left' }}>
            <label style={{ display: 'block', color: t.textSecond, fontSize: '12px', marginBottom: '5px' }}>PASSWORD</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              style={{ 
                width: '100%', padding: '15px', borderRadius: '12px', 
                backgroundColor: t.inputBg, color: t.textPrimary, border: t.inputBorder,
                boxSizing: 'border-box'
              }} 
            />
          </div>

          <button type="submit" style={{
            width: '100%',
            padding: '16px',
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: '#F8F9FB', // Matching your Figma light button
            color: '#0F1117',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer',
            transition: '0.3s'
          }}>
            LOG IN
          </button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '14px', color: t.textSecond }}>
          <p>Forgot Password?</p>
          <p>Don't have an account? <span style={{ color: t.textPrimary, fontWeight: 'bold' }}>Sign Up</span></p>
        </div>
      </div>
    </div>
  );
}