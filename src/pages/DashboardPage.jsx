import { useState, useEffect } from 'react';
import { Search, Loader2, LogOut, Activity } from 'lucide-react';
import { AriaLogo } from '../components/AriaLogo';
import { logoutUser } from '../api/auth.js';

export default function DashboardPage({ onNavigate, onSearch }) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [typedPlaceholder, setTypedPlaceholder] = useState('');

  // Placeholder typing effect
  useEffect(() => {
    const fullPlaceholder = "e.g. Electric Vehicle market in Europe...";
    let currentIdx = 0;
    const typeInterval = setInterval(() => {
      setTypedPlaceholder(fullPlaceholder.slice(0, currentIdx));
      currentIdx++;
      if (currentIdx > fullPlaceholder.length) clearInterval(typeInterval);
    }, 50);
    return () => clearInterval(typeInterval);
  }, []);

  const loadingStages = [
    "Looking at the data...",
    "Finding the best info...",
    "Writing your report...",
    "Almost there..."
  ];
  const [loadingStageIdx, setLoadingStageIdx] = useState(0);

  useEffect(() => {
    let interval;
    if (isSearching) {
      interval = setInterval(() => {
        setLoadingStageIdx(prev => {
          if (prev < loadingStages.length - 1) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 1500);
    } else {
      setLoadingStageIdx(0);
    }
    return () => clearInterval(interval);
  }, [isSearching, loadingStages.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      onSearch(query);
      onNavigate('report');
    }, loadingStages.length * 1500 + 500);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // ignore
    } finally {
      onNavigate('login');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Immersive Background Effects */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundPosition: 'center center', opacity: 0.2, zIndex: 0 }}></div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100vh', background: 'radial-gradient(circle at 50% 40%, rgba(15, 207, 188, 0.05) 0%, transparent 60%)', zIndex: 0, pointerEvents: 'none' }}></div>

      {/* --- TOP NAV --- */}
      <div className="dash-nav" style={{ width: '100%', boxSizing: 'border-box', padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10 }}>
        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }} onClick={() => onNavigate('landing')}>
          <AriaLogo height={60} width="auto" className="dash-logo" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }} className="nav-rhs">
          <div className="session-text" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--teal)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--teal)', boxShadow: '0 0 10px var(--teal)', animation: 'pulse 2s infinite' }}></span>
            Session Active
          </div>
          <button 
            onClick={handleLogout}
            className="sign-out-btn"
            style={{ 
              display: 'flex', alignItems: 'center', gap: 8, 
              background: 'rgba(255,255,255,0.03)', border: '1px solid var(--teal-12)', 
              color: 'var(--text-secondary)', padding: '10px 16px', borderRadius: 8, 
              cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, transition: 'all 0.3s ease' 
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--teal-40)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--teal-12)'; }}
          >
            <LogOut size={16} /> <span className="sign-out-text">Sign Out</span>
          </button>
        </div>
      </div>

      {/* --- MAIN CENTER CONSOLE --- */}
      <div className="dash-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, padding: '0 40px' }}>
        
        {/* 3D Orb Core Background */}
        <div className="orb-container">
          <div className="orb-ring ring-1"></div>
          <div className="orb-ring ring-2"></div>
          <div className="orb-ring ring-3"></div>
          <div className="orb-core"></div>
        </div>

        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 760, animation: 'fadeInUp 1s ease-out' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', background: 'rgba(15, 207, 188, 0.1)', border: '1px solid var(--teal-25)', borderRadius: 24, color: 'var(--teal)', fontSize: 13, fontFamily: 'var(--font-body)', marginBottom: 24 }}>
              <Activity size={14} /> Obsidian Intelligence
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 4vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.1, textShadow: '0 0 40px rgba(255,255,255,0.1)' }}>
              What market are you researching?
            </h1>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearch} style={{ position: 'relative' }}>
            <div className={`search-wrapper ${isSearching ? 'searching' : ''}`}>
              <div style={{ position: 'absolute', top: '50%', left: 24, transform: 'translateY(-50%)', color: 'var(--teal)', zIndex: 2 }}>
                <Search size={22} className={isSearching ? 'glow-pulse' : ''} />
              </div>
              
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={typedPlaceholder}
                disabled={isSearching}
                className="search-input"
              />
              
              {!isSearching && (
                <button type="submit" disabled={!query.trim()} className="search-submit">
                  Generate
                </button>
              )}
            </div>
          </form>

          {/* Processing State */}
          {isSearching ? (
            <div className="processing-state">
              <div style={{ position: 'relative', width: 64, height: 64, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="spinner-ring outer"></div>
                <div className="spinner-ring middle"></div>
                <div className="spinner-core"></div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)' }}>Generating Report...</h3>
                <p className="loading-stage-text">{loadingStages[loadingStageIdx]}</p>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: 40, textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>
                Try searching for
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                {['Fintech startups', 'AI in healthcare', 'DTC ecommerce trends', 'SaaS productivity tools'].map(suggestion => (
                  <button 
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="suggestion-chip"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* Animations */
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
        @keyframes glow-pulse { 0%, 100% { filter: drop-shadow(0 0 10px rgba(15,207,188,0.2)); } 50% { filter: drop-shadow(0 0 20px rgba(15,207,188,0.8)); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes spinReverse { 100% { transform: rotate(-360deg); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

        .glow-pulse { animation: glow-pulse 2s infinite; }

        /* 3D Orb Core Background */
        .orb-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: 600px;
          height: 600px;
          max-height: 100vw;
          z-index: 1;
          pointer-events: none;
          animation: float 10s ease-in-out infinite;
        }
        .orb-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(15, 207, 188, 0.1);
          box-shadow: inset 0 0 40px rgba(15, 207, 188, 0.05), 0 0 40px rgba(15, 207, 188, 0.05);
        }
        .ring-1 { transform: rotateX(60deg) rotateY(0deg); animation: spin 20s linear infinite; }
        .ring-2 { transform: rotateX(60deg) rotateY(60deg); border-color: rgba(74, 144, 226, 0.1); animation: spinReverse 25s linear infinite; }
        .ring-3 { transform: rotateX(60deg) rotateY(120deg); animation: spin 30s linear infinite; }
        .orb-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(15, 207, 188, 0.15) 0%, transparent 70%);
          filter: blur(20px);
          animation: pulse 4s ease-in-out infinite;
        }

        /* Search Input */
        .search-wrapper {
          position: relative;
          width: 100%;
          background: rgba(14, 17, 23, 0.6);
          backdrop-filter: blur(40px);
          border: 1px solid var(--teal-25);
          border-radius: 16px;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: inset 0 0 20px rgba(15, 207, 188, 0.02), 0 20px 40px rgba(0,0,0,0.4);
          overflow: hidden;
        }
        .search-wrapper:focus-within {
          border-color: var(--teal);
          box-shadow: inset 0 0 30px rgba(15, 207, 188, 0.08), 0 20px 60px rgba(15, 207, 188, 0.15);
        }
        .search-wrapper.searching {
          transform: scale(0.95);
          opacity: 0.5;
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          padding: 28px 140px 28px 64px;
          font-size: 18px;
          font-family: var(--font-body);
          color: var(--text-primary);
          background: transparent;
          border: none;
          outline: none;
        }
        .search-input::placeholder { color: rgba(255,255,255,0.4); }
        .search-submit {
          position: absolute;
          right: 12px;
          top: 12px;
          bottom: 12px;
          background: var(--teal);
          border: none;
          border-radius: 10px;
          color: var(--bg-primary);
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          padding: 0 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .search-submit:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 10px 20px rgba(15, 207, 188, 0.3);
        }
        .search-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

        /* Suggestion Chips */
        .suggestion-chip {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          color: var(--text-secondary);
          padding: 10px 20px;
          font-size: 14px;
          font-family: var(--font-body);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .suggestion-chip:hover {
          background: rgba(15, 207, 188, 0.1);
          border-color: var(--teal-40);
          color: var(--text-primary);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        /* Processing State */
        .processing-state {
          margin-top: 64px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          animation: fadeInUp 0.5s ease-out;
        }
        .spinner-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid transparent;
        }
        .outer { border-top-color: var(--teal); border-bottom-color: var(--teal); animation: spin 2s linear infinite; }
        .middle { inset: 8px; border-left-color: rgba(74, 144, 226, 0.8); border-right-color: rgba(74, 144, 226, 0.8); animation: spinReverse 1.5s linear infinite; }
        .spinner-core {
          width: 16px; height: 16px; background: var(--teal); border-radius: 50%; box-shadow: 0 0 20px var(--teal); animation: pulse 1s infinite;
        }
        .loading-stage-text {
          font-family: var(--font-body);
          font-size: 15px;
          color: var(--teal);
          text-shadow: 0 0 10px rgba(15, 207, 188, 0.3);
        }

        /* Responsive Overrides */
        @media (max-width: 480px) {
          .dash-nav { padding: 16px !important; }
          .dash-logo { height: 40px !important; }
          .nav-rhs { gap: 12px !important; }
          .session-text { display: none !important; }
          .sign-out-btn { padding: 8px 12px !important; }
          .sign-out-text { display: none !important; }
          .dash-main { padding: 40px 16px !important; }
          .search-input { padding: 20px 100px 20px 52px !important; font-size: 16px !important; }
          .search-submit { padding: 0 16px !important; font-size: 14px !important; right: 8px !important; top: 8px !important; bottom: 8px !important; }
          .orb-core { width: 100px !important; height: 100px !important; }
          .suggestion-chip { font-size: 12px !important; padding: 8px 16px !important; }
        }
        @media (max-width: 380px) {
          .search-input { padding-right: 90px !important; }
          .search-submit { padding: 0 12px !important; }
        }
      `}</style>
    </div>
  );
}
