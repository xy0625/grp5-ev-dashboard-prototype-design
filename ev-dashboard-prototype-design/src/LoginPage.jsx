import React, { useState } from 'react';

// Theme configuration
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
    accentBlue: "#1a73e8"
  };
};

export default function LoginPage({ theme = "dark", onLoginSuccess }) {
  const t = tk(theme);
  
  // State to track which view to show: 'initial', 'google', or 'apple'
  const [loginStep, setLoginStep] = useState('initial');

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (onLoginSuccess) onLoginSuccess(); 
  };

  // Helper function to render different steps based on user choice
  const renderContent = () => {
    // --- SIGN UP VIEW ---
    if (loginStep === 'signup') {
      return (
        <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
          <h2 style={{ color: t.textPrimary, fontSize: '28px', marginBottom: '10px' }}>CREATE ACCOUNT</h2>
          <p style={{ color: t.textSecond, fontSize: '14px', marginBottom: '20px' }}>Join us to start your journey</p>
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
              <input 
                type="text" 
                placeholder="Full Name" 
                style={{ width: '100%', padding: '15px', borderRadius: '12px', backgroundColor: t.inputBg, color: t.textPrimary, border: t.inputBorder, boxSizing: 'border-box' }} 
              />
            </div>
            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
              <input 
                type="email" 
                placeholder="Email Address" 
                style={{ width: '100%', padding: '15px', borderRadius: '12px', backgroundColor: t.inputBg, color: t.textPrimary, border: t.inputBorder, boxSizing: 'border-box' }} 
              />
            </div>
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <input 
                type="password" 
                placeholder="Create Password" 
                style={{ width: '100%', padding: '15px', borderRadius: '12px', backgroundColor: t.inputBg, color: t.textPrimary, border: t.inputBorder, boxSizing: 'border-box' }} 
              />
            </div>
            <button type="submit" style={{ width: '100%', padding: '16px', fontSize: '18px', fontWeight: 'bold', backgroundColor: t.textPrimary, color: t.pageBg, border: 'none', borderRadius: '30px', cursor: 'pointer' }}>
              REGISTER
            </button>
          </form>
          
          <p onClick={() => setLoginStep('initial')} style={{ color: t.textPrimary, marginTop: '20px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
            Already have an account? Log In
          </p>
        </div>
      );
    }

    // --- GOOGLE VIEW ---
    if (loginStep === 'google') {
      return (
        <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
          <img src="/google-icon.png" alt="Google" style={{ width: '48px', marginBottom: '15px' }} />
          <h2 style={{ color: t.textPrimary, fontSize: '24px', marginBottom: '10px' }}>Sign in with Google</h2>
          
          <div style={{ 
            margin: '25px 0', 
            padding: '12px', 
            backgroundColor: t.inputBg, 
            borderRadius: '12px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            border: t.cardBorder
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ccc', marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>👤</div>
            <span style={{ color: t.textPrimary, fontSize: '14px', fontWeight: '500' }}>user.email@google.com</span>
          </div>

          <button 
            onClick={handleLogin}
            style={{ width: '100%', padding: '15px', backgroundColor: t.accentBlue, color: '#fff', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
          >
            Continue as User Name
          </button>
          
          <p onClick={() => setLoginStep('initial')} style={{ color: t.accentBlue, marginTop: '20px', cursor: 'pointer', fontSize: '14px' }}>Use another account</p>
          <p style={{ color: t.accentBlue, marginTop: '10px', cursor: 'pointer', fontSize: '14px' }}>Forgot password?</p>
        </div>
      );
    }

    // --- APPLE VIEW ---
    if (loginStep === 'apple') {
      return (
        <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
          <img src="/apple-icon.png" alt="Apple" style={{ width: '48px', marginBottom: '15px' }} />
          <h2 style={{ color: t.textPrimary, fontSize: '24px', marginBottom: '10px' }}>Sign in with Apple ID</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="text" 
              defaultValue="apple.user@icloud.com"
              style={{ width: '100%', padding: '15px', borderRadius: '10px', border: t.inputBorder, backgroundColor: t.inputBg, color: t.textPrimary, textAlign: 'center' }} 
            />
          </div>

          <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontSize: '24px' }}>👤</div>
            <span style={{ color: t.textPrimary, fontSize: '14px' }}>Continue with Password</span>
          </div>

          <button 
            onClick={handleLogin}
            style={{ width: '100%', padding: '12px', backgroundColor: t.textPrimary, color: t.pageBg, border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Login
          </button>
          
          <p onClick={() => setLoginStep('initial')} style={{ color: t.textPrimary, marginTop: '20px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>FaceID</p>
        </div>
      );
    }

    // --- INITIAL VIEW ---
    return (
      <>
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
            width: '100%', padding: '16px', fontSize: '18px', fontWeight: 'bold',
            backgroundColor: '#F8F9FB', color: '#0F1117', border: 'none', borderRadius: '30px', cursor: 'pointer'
          }}>
            LOG IN
          </button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '14px', color: t.textSecond }}>
          <p>Forgot Password?</p>
          <p style={{ marginBottom: '20px' }}>Don't have an account? <span onClick={() => setLoginStep('signup')} style={{ color: t.textPrimary, fontWeight: 'bold', cursor: 'pointer' }}>Sign Up</span></p>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '25px', 
            marginTop: '20px',
            paddingTop: '20px', 
            borderTop: `1px solid ${t.textSecond}33`
          }}>
            <img 
                src="/google-icon.png" 
                alt="Google" 
                onClick={() => setLoginStep('google')}
                style={{ width: '40px', height: 'auto', cursor: 'pointer' }} 
            />
            <img 
                src="/apple-icon.png" 
                alt="Apple" 
                onClick={() => setLoginStep('apple')}
                style={{ width: '48px', height: 'auto', cursor: 'pointer' }} 
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      backgroundImage: 'url(/login-bg.png)',
      backgroundSize: 'cover', backgroundPosition: 'center',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      fontFamily: 'Inter, sans-serif', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1
      }} />

      <div style={{
        position: 'relative', zIndex: 2, width: '100%', maxWidth: '400px', padding: '40px',
        backgroundColor: t.cardBg, border: t.cardBorder, borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)', textAlign: 'center', backdropFilter: 'blur(10px)' 
      }}>
        {renderContent()}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}