import { useState, useMemo, useEffect, useRef } from "react";
import { Zap, Check, X, RotateCcw, Trophy, ChevronRight } from "lucide-react";
import './App.css';

// ---------------------------------------------------------------------------
// Vocabulary data (Lektion 3 — die Familie)
// ---------------------------------------------------------------------------
const VOCAB = [
  { de: "die Familie", uz: "oila" },
  { de: "die Mutter", uz: "ona" },
  { de: "der Vater", uz: "ota" },
  { de: "die Schwester", uz: "opa" },
  { de: "der Bruder", uz: "aka" },
  { de: "der Onkel", uz: "amaki" },
  { de: "die Tante", uz: "xola" },
  { de: "die Oma", uz: "buvi" },
  { de: "der Opa", uz: "bobo" },
  { de: "die Eltern", uz: "ota-ona" },
  { de: "der Sohn", uz: "o'g'il farzand" },
  { de: "die Tochter", uz: "qiz farzand" },
  { de: "die Geschwister", uz: "aka-ukalar" },
  { de: "der Ehemann", uz: "er" },
  { de: "die Ehefrau", uz: "xotin" },
  { de: "der Mann", uz: "erkak" },
  { de: "die Frau", uz: "ayol" },
  { de: "das Mitglied", uz: "a'zo" },
  { de: "Deutsch", uz: "nemis tili" },
  { de: "Englisch", uz: "ingliz tili" },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuiz() {
  const items = shuffle(VOCAB);
  return items.map((item) => {
    const pool = VOCAB.filter((v) => v.uz !== item.uz);
    const distractors = shuffle(pool).slice(0, 3).map((v) => v.uz);
    const options = shuffle([item.uz, ...distractors]);
    return {
      de: item.de,
      correct: item.uz,
      options,
    };
  });
}

export default function BlitzQuiz() {
  const quiz = useMemo(() => buildQuiz(), []);
  const total = quiz.length;

  const [screen, setScreen] = useState("start"); // start | quiz | result
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [cardKey, setCardKey] = useState(0);
  const cardRef = useRef(null);

  const current = quiz[index];
  const progress = screen === "quiz" ? (index / total) * 100 : screen === "result" ? 100 : 0;

  function startQuiz() {
    setScreen("quiz");
    setIndex(0);
    setScore(0);
    setAnswers([]);
    setSelected(null);
    setLocked(false);
    setCardKey((k) => k + 1);
  }

  function handleSelect(opt) {
    if (locked) return;
    setSelected(opt);
    setLocked(true);
    const isCorrect = opt === current.correct;
    if (isCorrect) setScore((s) => s + 1);
    setAnswers((a) => [...a, { de: current.de, correct: current.correct, chosen: opt, isCorrect }]);
  }

  function handleNext() {
    if (index + 1 >= total) {
      setScreen("result");
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setLocked(false);
      setCardKey((k) => k + 1);
    }
  }

  function restart() {
    setScreen("start");
    setIndex(0);
    setScore(0);
    setAnswers([]);
    setSelected(null);
    setLocked(false);
  }

  const percent = Math.round((score / total) * 100);
  const resultTier =
    percent >= 90 ? "A'lo!" : percent >= 70 ? "Yaxshi!" : percent >= 50 ? "Yomon emas" : "Yana urinib ko'ring";

  return (
    <div className="bq-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800;900&family=Manrope:wght@400;500;600;700;800&display=swap');

        .bq-root {
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
          --success: #34d399;
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
        }
        .bq-root *, .bq-root *::before, .bq-root *::after { box-sizing: border-box; }

        .bq-bolts {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .bq-bolt {
          position: absolute;
          opacity: 0.08;
          color: var(--purple-glow);
          animation: bq-drift 12s ease-in-out infinite;
        }
        @keyframes bq-drift {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(6deg); }
        }

        .bq-header {
          max-width: 640px;
          margin: 0 auto 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }
        .bq-logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .bq-logo-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--purple), var(--blue));
          box-shadow: 0 0 18px rgba(139,92,246,0.55);
          flex-shrink: 0;
        }
        .bq-logo-text {
          font-family: 'Orbitron', sans-serif;
          font-weight: 800;
          font-size: 22px;
          letter-spacing: 0.5px;
          background: linear-gradient(90deg, #d9c8ff 0%, #a78bfa 45%, #60a5fa 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .bq-logo-text span {
          font-weight: 600;
          opacity: 0.85;
          font-size: 0.85em;
          background: inherit;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }

        .bq-badge {
          font-size: 12px;
          color: var(--text-muted);
          border: 1px solid var(--card-border);
          padding: 6px 12px;
          border-radius: 999px;
          background: var(--card);
          letter-spacing: 0.3px;
        }

        .bq-progress-wrap {
          max-width: 640px;
          margin: 0 auto 34px;
          position: relative;
          z-index: 1;
        }
        .bq-progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12.5px;
          color: var(--text-muted);
          margin-bottom: 8px;
          font-weight: 600;
        }
        .bq-progress-track {
          position: relative;
          height: 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
        }
        .bq-progress-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--blue-deep), var(--blue), var(--purple), var(--purple-glow));
          background-size: 200% 100%;
          animation: bq-flow 2.5s linear infinite;
          transition: width 0.55s cubic-bezier(.4,1.4,.4,1);
          position: relative;
          box-shadow: 0 0 14px rgba(139,92,246,0.7);
        }
        @keyframes bq-flow {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        .bq-progress-bolt {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          transition: left 0.55s cubic-bezier(.4,1.4,.4,1);
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: radial-gradient(circle, #fff 0%, var(--purple-glow) 60%, transparent 75%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 16px 4px rgba(167,139,250,0.9);
        }
        .bq-progress-bolt svg { color: #2a1250; }

        .bq-card-outer {
          max-width: 640px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .bq-card {
          background: var(--card);
          border: 1px solid var(--card-border);
          border-radius: 22px;
          padding: 38px 32px;
          backdrop-filter: blur(14px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06);
          animation: bq-card-in 0.45s cubic-bezier(.2,.9,.3,1);
        }
        @keyframes bq-card-in {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* START SCREEN */
        .bq-start { text-align: center; padding: 20px 6px; }
        .bq-start-icon {
          width: 74px; height: 74px; margin: 0 auto 22px;
          border-radius: 20px;
          background: linear-gradient(135deg, var(--purple), var(--blue));
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 30px rgba(139,92,246,0.6);
          animation: bq-pulse 2.4s ease-in-out infinite;
        }
        @keyframes bq-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(139,92,246,0.5); }
          50% { box-shadow: 0 0 42px rgba(96,165,250,0.75); }
        }
        .bq-start h1 {
          font-family: 'Orbitron', sans-serif;
          font-size: 26px;
          margin: 0 0 10px;
          font-weight: 800;
          letter-spacing: 0.3px;
        }
        .bq-start p {
          color: var(--text-muted);
          font-size: 15px;
          line-height: 1.6;
          max-width: 420px;
          margin: 0 auto 28px;
        }
        .bq-stats-row {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        .bq-stat-chip {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--card-border);
          border-radius: 14px;
          padding: 12px 18px;
          min-width: 96px;
        }
        .bq-stat-chip b {
          display: block;
          font-family: 'Orbitron', sans-serif;
          font-size: 20px;
          background: linear-gradient(90deg, var(--purple-glow), var(--blue));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .bq-stat-chip span { font-size: 11.5px; color: var(--text-muted); }

        .bq-btn {
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          font-size: 15.5px;
          border: none;
          border-radius: 14px;
          padding: 15px 30px;
          cursor: pointer;
          color: #fff;
          background: linear-gradient(90deg, var(--purple-deep), var(--purple), var(--blue));
          background-size: 160% 100%;
          box-shadow: 0 10px 28px rgba(139,92,246,0.4);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background-position 0.4s ease;
        }
        .bq-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 34px rgba(139,92,246,0.55);
          background-position: 100% 0%;
        }
        .bq-btn:active { transform: translateY(0); }

        /* QUIZ SCREEN */
        .bq-q-eyebrow {
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--purple-glow);
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .bq-question {
          font-family: 'Orbitron', sans-serif;
          font-size: 25px;
          font-weight: 700;
          margin: 0 0 4px;
          line-height: 1.35;
        }
        .bq-q-sub {
          color: var(--text-muted);
          font-size: 13.5px;
          margin-bottom: 26px;
        }
        .bq-options {
          display: grid;
          gap: 12px;
        }
        .bq-option {
          text-align: left;
          font-family: 'Manrope', sans-serif;
          font-size: 15.5px;
          font-weight: 600;
          color: var(--text);
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 15px 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: border-color 0.18s ease, background 0.18s ease, transform 0.15s ease;
        }
        .bq-option:hover:not(.bq-locked) {
          border-color: var(--purple-glow);
          background: rgba(139,92,246,0.12);
          transform: translateX(3px);
        }
        .bq-option .bq-opt-icon {
          width: 22px; height: 22px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          flex-shrink: 0;
          margin-left: 12px;
        }
        .bq-option.correct {
          border-color: var(--success);
          background: rgba(52,211,153,0.14);
          animation: bq-correct-pop 0.4s ease;
        }
        .bq-option.correct .bq-opt-icon { background: var(--success); color: #062018; }
        .bq-option.wrong {
          border-color: var(--error);
          background: rgba(251,113,133,0.14);
          animation: bq-shake 0.4s ease;
        }
        .bq-option.wrong .bq-opt-icon { background: var(--error); color: #2a060b; }
        .bq-option.dim { opacity: 0.45; }
        @keyframes bq-correct-pop {
          0% { transform: scale(1); }
          40% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
        @keyframes bq-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          50% { transform: translateX(6px); }
          75% { transform: translateX(-4px); }
        }

        .bq-next-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 26px;
          min-height: 50px;
        }
        .bq-next-row .bq-btn {
          opacity: 0;
          pointer-events: none;
          transform: translateY(6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .bq-next-row .bq-btn.show {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        /* RESULT SCREEN */
        .bq-result { text-align: center; padding: 10px 4px; }
        .bq-trophy {
          width: 84px; height: 84px; margin: 0 auto 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--purple), var(--blue));
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 40px rgba(139,92,246,0.6);
          animation: bq-trophy-in 0.6s cubic-bezier(.2,1.6,.4,1);
        }
        @keyframes bq-trophy-in {
          0% { transform: scale(0) rotate(-30deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .bq-result h2 {
          font-family: 'Orbitron', sans-serif;
          font-size: 24px;
          margin: 0 0 6px;
        }
        .bq-score-big {
          font-family: 'Orbitron', sans-serif;
          font-size: 52px;
          font-weight: 900;
          background: linear-gradient(90deg, var(--purple-glow), var(--blue));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin: 14px 0 4px;
        }
        .bq-score-sub { color: var(--text-muted); font-size: 14px; margin-bottom: 30px; }

        .bq-review {
          text-align: left;
          display: grid;
          gap: 8px;
          margin: 0 0 30px;
          max-height: 320px;
          overflow-y: auto;
          padding-right: 4px;
        }
        .bq-review::-webkit-scrollbar { width: 6px; }
        .bq-review::-webkit-scrollbar-thumb { background: var(--purple-deep); border-radius: 10px; }
        .bq-review-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 11px 14px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          font-size: 13.5px;
        }
        .bq-review-item .de { font-weight: 700; }
        .bq-review-item .uz { color: var(--text-muted); font-size: 12.5px; }
        .bq-review-icon {
          width: 22px; height: 22px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .bq-review-item.ok .bq-review-icon { background: var(--success); color: #062018; }
        .bq-review-item.bad .bq-review-icon { background: var(--error); color: #2a060b; }

        .bq-result-actions { display: flex; justify-content: center; }

        @media (max-width: 480px) {
          .bq-card { padding: 26px 18px; }
          .bq-question { font-size: 21px; }
          .bq-score-big { font-size: 40px; }
        }
      `}</style>

      <div className="bq-bolts">
        <Zap className="bq-bolt" style={{ top: "8%", left: "6%", width: 60, height: 60 }} />
        <Zap className="bq-bolt" style={{ top: "70%", left: "85%", width: 80, height: 80, animationDelay: "3s" }} />
        <Zap className="bq-bolt" style={{ top: "40%", left: "92%", width: 40, height: 40, animationDelay: "6s" }} />
      </div>

      <header className="bq-header">
        <div className="bq-logo">
          <div className="bq-logo-icon">
            <Zap size={19} color="#fff" fill="#fff" />
          </div>
          <div className="bq-logo-text">Blitz<span> Quiz</span></div>
        </div>
        {screen === "quiz" && <div className="bq-badge">{index + 1} / {total}</div>}
      </header>

      <div className="bq-progress-wrap">
        <div className="bq-progress-labels">
          <span>Jarayon</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="bq-progress-track">
          <div className="bq-progress-fill" style={{ width: `${progress}%` }} />
          <div className="bq-progress-bolt" style={{ left: `${progress}%` }}>
            <Zap size={13} fill="#2a1250" />
          </div>
        </div>
      </div>

      <div className="bq-card-outer">
        {screen === "start" && (
          <div className="bq-card bq-start">
            <div className="bq-start-icon">
              <Zap size={34} color="#fff" fill="#fff" />
            </div>
            <h1>Nemis tili — Oila lug'ati</h1>
            <p>
              20 ta savol orqali oilaga oid nemischa so'zlarni bilimingizni sinab ko'ring.
              Har bir savolda nemischa so'z ko'rsatiladi — siz to'g'ri o'zbekcha tarjimasini tanlaysiz.
            </p>
            <div className="bq-stats-row">
              <div className="bq-stat-chip"><b>{total}</b><span>Savollar</span></div>
              <div className="bq-stat-chip"><b>4</b><span>Variant</span></div>
              <div className="bq-stat-chip"><b>A1</b><span>Daraja</span></div>
            </div>
            <button className="bq-btn" onClick={startQuiz}>
              Boshlash <ChevronRight size={18} />
            </button>
          </div>
        )}

        {screen === "quiz" && current && (
          <div className="bq-card" key={cardKey}>
            <div className="bq-q-eyebrow">Savol {index + 1}</div>
            <div className="bq-question">{current.de}</div>
            <div className="bq-q-sub">Bu so'zning to'g'ri o'zbekcha tarjimasini tanlang</div>

            <div className="bq-options">
              {current.options.map((opt) => {
                let cls = "bq-option";
                if (locked) {
                  cls += " bq-locked";
                  if (opt === current.correct) cls += " correct";
                  else if (opt === selected) cls += " wrong";
                  else cls += " dim";
                }
                return (
                  <button key={opt} className={cls} onClick={() => handleSelect(opt)} disabled={locked}>
                    <span>{opt}</span>
                    {locked && opt === current.correct && (
                      <span className="bq-opt-icon"><Check size={14} /></span>
                    )}
                    {locked && opt === selected && opt !== current.correct && (
                      <span className="bq-opt-icon"><X size={14} /></span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="bq-next-row">
              <button className={`bq-btn ${locked ? "show" : ""}`} onClick={handleNext}>
                {index + 1 >= total ? "Natijani ko'rish" : "Keyingisi"} <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {screen === "result" && (
          <div className="bq-card bq-result">
            <div className="bq-trophy"><Trophy size={38} color="#fff" /></div>
            <h2>{resultTier}</h2>
            <div className="bq-score-big">{score}/{total}</div>
            <div className="bq-score-sub">To'g'ri javoblar — {percent}%</div>

            <div className="bq-review">
              {answers.map((a, i) => (
                <div key={i} className={`bq-review-item ${a.isCorrect ? "ok" : "bad"}`}>
                  <div>
                    <div className="de">{a.de}</div>
                    <div className="uz">{a.isCorrect ? a.correct : `${a.chosen} → ${a.correct}`}</div>
                  </div>
                  <span className="bq-review-icon">
                    {a.isCorrect ? <Check size={13} /> : <X size={13} />}
                  </span>
                </div>
              ))}
            </div>

            <div className="bq-result-actions">
              <button className="bq-btn" onClick={restart}>
                <RotateCcw size={17} /> Qayta boshlash
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}