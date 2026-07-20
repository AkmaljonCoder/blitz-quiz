import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Zap, Home, ArrowLeft, SearchX } from "lucide-react";

function useReveal() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 30);
    return () => clearTimeout(t);
  }, []);
  return shown;
}

export default function NotFound() {
  const shown = useReveal();

  return (
    <div className={shown ? "bq4-root in" : "bq4-root"}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800;900&family=Manrope:wght@400;500;600;700;800&display=swap');

        html { scroll-behavior: smooth; }
        .bq4-root {
          --bg-1: #0a0118;
          --bg-2: #150a2e;
          --bg-3: #0c1638;
          --purple: #8b5cf6;
          --purple-deep: #5b21b6;
          --purple-glow: #a78bfa;
          --blue: #3b82f6;
          --blue-deep: #1e3a8a;
          --text: #f2edfc;
          --text-muted: #9c8fc2;
          --error: #fb7185;
          --card: rgba(255,255,255,0.045);
          --card-border: rgba(167,139,250,0.25);
          font-family: 'Manrope', sans-serif;
          min-height: 100vh;
          width: 100%;
          box-sizing: border-box;
          color: var(--text);
          background:
            radial-gradient(circle at 15% 10%, rgba(139,92,246,0.25), transparent 45%),
            radial-gradient(circle at 85% 85%, rgba(59,130,246,0.22), transparent 45%),
            linear-gradient(160deg, var(--bg-1) 0%, var(--bg-2) 45%, var(--bg-3) 100%);
          padding: 28px 18px 60px;
          position: relative;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
        }
        .bq4-root *, .bq4-root *::before, .bq4-root *::after { box-sizing: border-box; }

        .bq4-bolts {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .bq4-bolt {
          position: absolute;
          opacity: 0.08;
          color: var(--purple-glow);
          animation: bq4-drift 12s ease-in-out infinite;
        }
        @keyframes bq4-drift {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(6deg); }
        }

        .bq4-header {
          max-width: 960px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .bq4-logo { display: flex; align-items: center; gap: 8px; }
        .bq4-logo-icon {
          width: 34px; height: 34px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, var(--purple), var(--blue));
          box-shadow: 0 0 18px rgba(139,92,246,0.55);
          flex-shrink: 0;
        }
        .bq4-logo-text {
          font-family: 'Orbitron', sans-serif;
          font-weight: 800;
          font-size: 22px;
          letter-spacing: 0.5px;
          background: linear-gradient(90deg, #d9c8ff 0%, #a78bfa 45%, #60a5fa 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .bq4-logo-text span {
          font-weight: 600;
          opacity: 0.85;
          font-size: 0.85em;
        }

        .bq4-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bq4-card {
          max-width: 560px;
          width: 100%;
          text-align: center;
          background: var(--card);
          border: 1px solid var(--card-border);
          border-radius: 24px;
          padding: 50px 36px;
          backdrop-filter: blur(14px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06);
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(18px) scale(0.98);
          transition: opacity 0.55s ease, transform 0.55s cubic-bezier(.2,.9,.3,1);
        }
        .bq4-root.in .bq4-card { opacity: 1; transform: translateY(0) scale(1); }

        .bq4-icon-wrap {
          width: 84px; height: 84px; margin: 0 auto 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--purple), var(--blue));
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 34px rgba(139,92,246,0.6);
          animation: bq4-pulse 2.4s ease-in-out infinite;
        }
        @keyframes bq4-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(139,92,246,0.5); }
          50% { box-shadow: 0 0 42px rgba(96,165,250,0.75); }
        }

        .bq4-code {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          font-size: 84px;
          line-height: 1;
          margin: 0 0 6px;
          letter-spacing: 4px;
          background: linear-gradient(90deg, var(--purple-glow), var(--blue));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          position: relative;
          display: inline-block;
        }
        .bq4-code::after {
          content: '404';
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          color: var(--error);
          opacity: 0;
          background: none;
          -webkit-text-fill-color: var(--error);
          animation: bq4-glitch 5s ease-in-out infinite;
        }
        @keyframes bq4-glitch {
          0%, 92%, 100% { opacity: 0; transform: translate(0,0); }
          93% { opacity: 0.6; transform: translate(-3px, 1px); }
          94% { opacity: 0; }
          95% { opacity: 0.6; transform: translate(3px, -1px); }
          96% { opacity: 0; }
        }

        .bq4-card h1 {
          font-family: 'Orbitron', sans-serif;
          font-size: 21px;
          font-weight: 700;
          margin: 0 0 12px;
        }
        .bq4-card p {
          color: var(--text-muted);
          font-size: 15px;
          line-height: 1.65;
          max-width: 400px;
          margin: 0 auto 32px;
        }

        .bq4-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .bq4-btn {
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          font-size: 15px;
          border: none;
          border-radius: 14px;
          padding: 14px 26px;
          cursor: pointer;
          color: #fff;
          background: linear-gradient(90deg, var(--purple-deep), var(--purple), var(--blue));
          background-size: 160% 100%;
          box-shadow: 0 10px 28px rgba(139,92,246,0.4);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background-position 0.4s ease;
        }
        .bq4-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 34px rgba(139,92,246,0.55);
          background-position: 100% 0%;
        }
        .bq4-btn.ghost {
          background: rgba(255,255,255,0.05);
          box-shadow: none;
          border: 1.5px solid var(--card-border);
        }
        .bq4-btn.ghost:hover {
          background: rgba(139,92,246,0.12);
          border-color: var(--purple-glow);
          box-shadow: none;
        }

        @media (max-width: 480px) {
          .bq4-card { padding: 38px 22px; }
          .bq4-code { font-size: 64px; }
        }
      `}</style>

      <div className="bq4-bolts">
        <Zap className="bq4-bolt" style={{ top: "8%", left: "6%", width: 60, height: 60 }} />
        <Zap className="bq4-bolt" style={{ top: "70%", left: "85%", width: 80, height: 80, animationDelay: "3s" }} />
        <Zap className="bq4-bolt" style={{ top: "40%", left: "92%", width: 40, height: 40, animationDelay: "6s" }} />
      </div>

      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
        <header className="bq4-header">
          <div className="bq4-logo">
            <div className="bq4-logo-icon">
              <Zap size={19} color="#fff" fill="#fff" />
            </div>
            <div className="bq4-logo-text">Blitz<span> Quiz</span></div>
          </div>
        </header>

        <main className="bq4-main">
          <div className="bq4-card">
            <div className="bq4-icon-wrap">
              <SearchX size={38} color="#fff" />
            </div>
            <div className="bq4-code">404</div>
            <h1>Sahifa topilmadi</h1>
            <p>
              Afsuski, siz izlagan sahifa mavjud emas yoki o'chirilgan.
              Bosh sahifaga qaytib, darslardan birini tanlashingiz mumkin.
            </p>
            <div className="bq4-actions">
              <Link className="bq4-btn" to="/">
                <Home size={17} /> Bosh sahifaga qaytish
              </Link>
              <button className="bq4-btn ghost" onClick={() => window.history.back()}>
                <ArrowLeft size={17} /> Orqaga
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}