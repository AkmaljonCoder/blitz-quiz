import { useState, useMemo, useEffect, useRef } from "react";
import { Zap, Check, X, RotateCcw, Trophy, ChevronRight } from "lucide-react";
import "../Units.css";
import { VOCAB_LEKTION_6 } from "../VOCAB";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuiz() {
  const items = shuffle(VOCAB_LEKTION_6);
  return items.map((item) => {
    const pool = VOCAB_LEKTION_6.filter((v) => v.uz !== item.uz);
    const distractors = shuffle(pool)
      .slice(0, 3)
      .map((v) => v.uz);
    const options = shuffle([item.uz, ...distractors]);
    return {
      de: item.de,
      correct: item.uz,
      options,
    };
  });
}

function Unit1() {
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
  const progress =
    screen === "quiz" ? (index / total) * 100 : screen === "result" ? 100 : 0;

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
    setAnswers((a) => [
      ...a,
      { de: current.de, correct: current.correct, chosen: opt, isCorrect },
    ]);
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
    percent >= 90
      ? "A'lo!"
      : percent >= 70
        ? "Yaxshi!"
        : percent >= 50
          ? "Yomon emas"
          : "Yana urinib ko'ring";

  return (
    <div className="bq-root">
      <div className="bq-bolts">
        <Zap
          className="bq-bolt"
          style={{ top: "8%", left: "6%", width: 60, height: 60 }}
        />
        <Zap
          className="bq-bolt"
          style={{
            top: "70%",
            left: "85%",
            width: 80,
            height: 80,
            animationDelay: "3s",
          }}
        />
        <Zap
          className="bq-bolt"
          style={{
            top: "40%",
            left: "92%",
            width: 40,
            height: 40,
            animationDelay: "6s",
          }}
        />
      </div>

      <header className="bq-header">
        <div className="bq-logo">
          <div className="bq-logo-icon">
            <Zap size={19} color="#fff" fill="#fff" />
          </div>
          <div className="bq-logo-text">
            Blitz<span> Quiz</span>
          </div>
        </div>
        {screen === "quiz" && (
          <div className="bq-badge">
            {index + 1} / {total}
          </div>
        )}
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
            <h1>Nemis tili — Ish joyi lug'ati</h1>
            <p>
              20 ta savol orqali ish joyi va texnikaga oid nemischa so'zlarni
              bilimingizni sinab ko'ring. Har bir savolda nemischa so'z
              ko'rsatiladi — siz to'g'ri o'zbekcha tarjimasini tanlaysiz.
            </p>
            <div className="bq-stats-row">
              <div className="bq-stat-chip">
                <b>{total}</b>
                <span>Savollar</span>
              </div>
              <div className="bq-stat-chip">
                <b>4</b>
                <span>Variant</span>
              </div>
              <div className="bq-stat-chip">
                <b>A1</b>
                <span>Daraja</span>
              </div>
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
            <div className="bq-q-sub">
              Bu so'zning to'g'ri o'zbekcha tarjimasini tanlang
            </div>

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
                  <button
                    key={opt}
                    className={cls}
                    onClick={() => handleSelect(opt)}
                    disabled={locked}
                  >
                    <span>{opt}</span>
                    {locked && opt === current.correct && (
                      <span className="bq-opt-icon">
                        <Check size={14} />
                      </span>
                    )}
                    {locked && opt === selected && opt !== current.correct && (
                      <span className="bq-opt-icon">
                        <X size={14} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="bq-next-row">
              <button
                className={`bq-btn ${locked ? "show" : ""}`}
                onClick={handleNext}
              >
                {index + 1 >= total ? "Natijani ko'rish" : "Keyingisi"}{" "}
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {screen === "result" && (
          <div className="bq-card bq-result">
            <div className="bq-trophy">
              <Trophy size={38} color="#fff" />
            </div>
            <h2>{resultTier}</h2>
            <div className="bq-score-big">
              {score}/{total}
            </div>
            <div className="bq-score-sub">To'g'ri javoblar — {percent}%</div>

            <div className="bq-review">
              {answers.map((a, i) => (
                <div
                  key={i}
                  className={`bq-review-item ${a.isCorrect ? "ok" : "bad"}`}
                >
                  <div>
                    <div className="de">{a.de}</div>
                    <div className="uz">
                      {a.isCorrect ? a.correct : `${a.chosen} → ${a.correct}`}
                    </div>
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

export default Unit1;
