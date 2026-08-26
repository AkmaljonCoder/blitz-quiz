import { useState, useMemo, useEffect, useRef } from "react";
import {
  Zap,
  Check,
  X,
  RotateCcw,
  Trophy,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  PartyPopper,
  Home as HomeIcon,
  Layers,
  RotateCw,
  Shuffle,
  ArrowLeft,
  List,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import "../Units.css";
import { VOCAB } from "../VOCAB";
import QuizNotFound from "./QuizNotFound";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuiz(arr) {
  const items = shuffle(arr);
  return items.map((item) => {
    const pool = arr.filter((v) => v.uz !== item.uz);
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

const QUICK_QUIZ_SIZE = 20;

function Quiz() {
  const { id } = useParams();
  const currentQuiz = VOCAB.find((item) => item.id === Number(id));
  const quizWords = currentQuiz?.words ?? [];

  const [mode, setMode] = useState("quick"); // "quick" | "full"
  const [quiz, setQuiz] = useState([]);
  const [isReview, setIsReview] = useState(false);
  const total = quiz.length;

  const quickCount = Math.min(QUICK_QUIZ_SIZE, quizWords.length);
  const previewTotal = mode === "quick" ? quickCount : quizWords.length;

  const [screen, setScreen] = useState("start"); // start | quiz | result | flashcards
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [cardKey, setCardKey] = useState(0);
  const cardRef = useRef(null);

  // FLASHCARDS
  const [flashWords, setFlashWords] = useState([]);
  const [flashIndex, setFlashIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // ALL WORDS MODAL
  const [showWords, setShowWords] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showWords ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showWords]);

  const current = quiz[index];
  const currentFlash = flashWords[flashIndex];

  const progress =
    screen === "quiz"
      ? (index / total) * 100
      : screen === "result"
        ? 100
        : screen === "flashcards" && flashWords.length > 0
          ? (flashIndex / flashWords.length) * 100
          : 0;

  const missedWords = useMemo(
    () =>
      answers
        .filter((a) => !a.isCorrect)
        .map((a) => quizWords.find((w) => w.de === a.de))
        .filter(Boolean),
    [answers, quizWords]
  );

  function startQuiz() {
    const selectedWords =
      mode === "quick" ? shuffle(quizWords).slice(0, quickCount) : quizWords;

    setIsReview(false);
    setQuiz(buildQuiz(selectedWords));
    setScreen("quiz");
    setIndex(0);
    setScore(0);
    setAnswers([]);
    setSelected(null);
    setLocked(false);
    setCardKey((k) => k + 1);
  }

  function startReview() {
    if (missedWords.length === 0) return;
    setIsReview(true);
    setQuiz(buildQuiz(missedWords));
    setScreen("quiz");
    setIndex(0);
    setScore(0);
    setAnswers([]);
    setSelected(null);
    setLocked(false);
    setCardKey((k) => k + 1);
  }

  function startFlashcards() {
    setFlashWords(shuffle(quizWords));
    setFlashIndex(0);
    setFlipped(false);
    setScreen("flashcards");
  }

  function flipCard() {
    setFlipped((f) => !f);
  }

  function nextFlashcard() {
    if (flashIndex + 1 >= flashWords.length) {
      setFlashIndex(0);
    } else {
      setFlashIndex((i) => i + 1);
    }
    setFlipped(false);
  }

  function prevFlashcard() {
    if (flashIndex === 0) {
      setFlashIndex(flashWords.length - 1);
    } else {
      setFlashIndex((i) => i - 1);
    }
    setFlipped(false);
  }

  function reshuffleFlashcards() {
    setFlashWords(shuffle(quizWords));
    setFlashIndex(0);
    setFlipped(false);
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
    setIsReview(false);
    setScreen("start");
    setIndex(0);
    setScore(0);
    setAnswers([]);
    setSelected(null);
    setLocked(false);
  }

  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  const resultTier =
    percent >= 90
      ? "A'lo!"
      : percent >= 70
        ? "Yaxshi!"
        : percent >= 50
          ? "Yomon emas"
          : "Yana urinib ko'ring";

  const hasMissed = missedWords.length > 0;

  if (!currentQuiz) {
    return <QuizNotFound />;
  }

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
        <Link className="bqh-logo" to="/">
          <div className="bqh-logo-icon">
            <Zap size={19} color="#fff" fill="#fff" />
          </div>
          <div className="bqh-logo-text">
            Blitz<span> Quiz</span>
          </div>
        </Link>
        {screen === "quiz" && (
          <div className="bq-badge">
            {isReview && <span className="bq-badge-review">Takrorlash</span>}
            {index + 1} / {total}
          </div>
        )}
        {screen === "flashcards" && flashWords.length > 0 && (
          <div className="bq-badge">
            {flashIndex + 1} / {flashWords.length}
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
            <button
              className="bq-words-btn"
              onClick={() => setShowWords(true)}
              aria-label="Barcha so'zlarni ko'rish"
              title="Barcha so'zlarni ko'rish"
            >
              <List size={18} />
            </button>

            <div className="bq-start-icon">
              <Zap size={34} color="#fff" fill="#fff" />
            </div>
            <h1>{currentQuiz.quizTitle}</h1>
            <p>{currentQuiz.quizDescription}</p>

            <div className="bq-mode-switch" role="tablist" aria-label="Test rejimi">
              <button
                type="button"
                role="tab"
                aria-selected={mode === "quick"}
                className={`bq-mode-option ${mode === "quick" ? "active" : ""}`}
                onClick={() => setMode("quick")}
              >
                <span className="bq-mode-title">Tezkor test</span>
                <span className="bq-mode-sub">{quickCount} ta so'z</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "full"}
                className={`bq-mode-option ${mode === "full" ? "active" : ""}`}
                onClick={() => setMode("full")}
              >
                <span className="bq-mode-title">To'liq test</span>
                <span className="bq-mode-sub">{quizWords.length} ta so'z</span>
              </button>
              <div className={`bq-mode-thumb ${mode === "full" ? "right" : ""}`} />
            </div>

            <div className="bq-stats-row">
              <div className="bq-stat-chip">
                <b>{previewTotal}</b>
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

            <button className="bq-btn bq-btn-full" onClick={startQuiz}>
              Boshlash <ChevronRight size={18} />
            </button>

            <div className="bq-divider">
              <span>yoki</span>
            </div>

            <button className="bq-flash-cta" onClick={startFlashcards}>
              <span className="bq-flash-cta-icon">
                <Layers size={20} />
              </span>
              <span className="bq-flash-cta-text">
                <span className="bq-flash-cta-title">
                  Kartochkalar bilan yodlash
                </span>
                <span className="bq-flash-cta-sub">
                  {quizWords.length} ta so'zni ko'rib chiqing
                </span>
              </span>
              <ChevronRight size={18} className="bq-flash-cta-arrow" />
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

        {screen === "flashcards" && currentFlash && (
          <div className="bq-flash-wrap">
            <div className="bq-flash-scene" onClick={flipCard}>
              <div className={`bq-flash-card ${flipped ? "flipped" : ""}`}>
                <div className="bq-flash-face bq-flash-front">
                  <span className="bq-flash-lang">Nemischa</span>
                  <span className="bq-flash-word">{currentFlash.de}</span>
                  <span className="bq-flash-hint">
                    <RotateCw size={14} /> Aylantirish uchun bosing
                  </span>
                </div>
                <div className="bq-flash-face bq-flash-back">
                  <span className="bq-flash-lang">O'zbekcha</span>
                  <span className="bq-flash-word">{currentFlash.uz}</span>
                  <span className="bq-flash-hint">
                    <RotateCw size={14} /> Qaytarish uchun bosing
                  </span>
                </div>
              </div>
            </div>

            <div className="bq-flash-controls">
              <button
                className="bq-flash-nav"
                onClick={prevFlashcard}
                aria-label="Oldingi"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="bq-flash-shuffle"
                onClick={reshuffleFlashcards}
                aria-label="Aralashtirish"
              >
                <Shuffle size={17} /> Aralashtirish
              </button>
              <button
                className="bq-flash-nav"
                onClick={nextFlashcard}
                aria-label="Keyingi"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <button className="bq-flash-exit" onClick={() => setScreen("start")}>
              <ArrowLeft size={16} /> Orqaga
            </button>
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

            {hasMissed && (
              <div className="bq-missed-prompt">
                <div className="bq-missed-icon">
                  <RefreshCw size={18} />
                </div>
                <div className="bq-missed-text">
                  <div className="bq-missed-title">
                    Xato so'zlarni takrorlamoqchimisiz?
                  </div>
                  <div className="bq-missed-sub">
                    {missedWords.length} ta so'zni qayta mashq qiling
                  </div>
                </div>
              </div>
            )}

            <div className="bq-result-actions">
              {hasMissed && (
                <button className="bq-btn bq-btn-secondary" onClick={startReview}>
                  <RefreshCw size={17} /> Xatolarni takrorlash
                </button>
              )}
              <button className="bq-btn" onClick={restart}>
                <RotateCcw size={17} /> Qayta boshlash
              </button>
              <Link className="bq-btn bq-btn-secondary" to="/">
                <HomeIcon size={17} /> Bosh sahifaga qaytish
              </Link>
            </div>

            {!hasMissed && score === total && (
              <div className="bq-perfect-note">
                <PartyPopper size={16} /> Barcha savollarga to'g'ri javob berdingiz!
              </div>
            )}
          </div>
        )}
      </div>

      {showWords && (
        <div
          className="bq-words-overlay"
          onClick={() => setShowWords(false)}
        >
          <div
            className="bq-words-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Barcha so'zlar"
          >
            <div className="bq-words-header">
              <div className="bq-words-header-text">
                <h3>{currentQuiz.unitName}</h3>
                <span>{quizWords.length} ta so'z</span>
              </div>
              <button
                className="bq-words-close"
                onClick={() => setShowWords(false)}
                aria-label="Yopish"
              >
                <X size={20} />
              </button>
            </div>
            <div className="bq-words-list">
              {quizWords.map((w, i) => (
                <div className="bq-words-row" key={i}>
                  <span className="bq-words-de">{w.de}</span>
                  <span className="bq-words-uz">{w.uz}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;