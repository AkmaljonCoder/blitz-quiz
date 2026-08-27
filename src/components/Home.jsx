import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  BookOpen,
  Brain,
  BarChart3,
  FileStack,
  ArrowRight,
  Layers,
  Timer,
  X,
  GraduationCap,
} from "lucide-react";
import "../App.css";

// VOCABULARY
import VOCAB from "../VOCAB";

const FEATURES = [
  {
    icon: Brain,
    title: "Yodda tez qoladi",
    desc: "Har bir so'z savol-javob shaklida takrorlanadi, shu bois miyangizda uzoq muddat saqlanib qoladi.",
  },
  {
    icon: Layers,
    title: "Har bir dars uchun alohida",
    desc: "Darslikning har bir bo'limi (unit) uchun alohida test tayyorlangan — kerakli darsni tanlab, o'sha mavzuni mustahkamlaysiz.",
  },
  {
    icon: Timer,
    title: "Tez va qulay",
    desc: "Bir nechta savolni javoblash uchun ko'p vaqt ketmaydi — istalgan joyda, istalgan vaqtda mashq qilishingiz mumkin.",
  },
  {
    icon: BarChart3,
    title: "Natijangizni ko'ring",
    desc: "Har bir testdan so'ng qaysi so'zlarni bilib, qaysilarini bilmayotganingiz aniq ko'rsatiladi.",
  },
];

const LEVELS = [
  {
    id: "a1.1",
    letter: "A1",
    sub: "1.1",
    theme: "purple",
    title: "A1.1",
    tagline: "Boshlang'ich daraja",
    desc: "Tanishuv, oila, kasblar, kundalik hayot mavzularidagi asosiy so'z boyligi bilan tanishing.",
    units: VOCAB,
  },
  {
    id: "a1.2",
    letter: "A1",
    sub: "1.2",
    theme: "blue",
    title: "A1.2",
    tagline: "Davomiy daraja",
    desc: "A1.1 darajasidan keyingi bosqich — so'z boyligingizni yanada kengaytiring.",
    units: VOCAB,
  },
];

function useReveal() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 30);
    return () => clearTimeout(t);
  }, []);
  return shown;
}

function BlitzQuizHome() {
  const shown = useReveal();
  const [activeLevel, setActiveLevel] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeLevel ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeLevel]);

  return (
    <div className="bqh-root">
      <div className="bqh-bolts">
        <Zap
          className="bqh-bolt"
          style={{ top: "8%", left: "6%", width: 60, height: 60 }}
        />
        <Zap
          className="bqh-bolt"
          style={{
            top: "70%",
            left: "85%",
            width: 80,
            height: 80,
            animationDelay: "3s",
          }}
        />
        <Zap
          className="bqh-bolt"
          style={{
            top: "40%",
            left: "92%",
            width: 40,
            height: 40,
            animationDelay: "6s",
          }}
        />
      </div>

      <div
        className={shown ? "bqh-inner in" : "bqh-inner"}
        style={{ position: "relative" }}
      >
        <header className="bqh-header">
          <Link className="bqh-logo" to="/">
            <div className="bqh-logo-icon">
              <Zap size={19} color="#fff" fill="#fff" />
            </div>
            <div className="bqh-logo-text">
              Blitz<span> Quiz</span>
            </div>
          </Link>
          <div className="bqh-badge">
            <FileStack size={13} /> A1.1 – A1.2
          </div>
        </header>

        <section className="bqh-hero">
          <div className="bqh-hero-icon">
            <BookOpen size={34} color="#fff" />
          </div>
          <h1>
            Nemischa so'zlarni{" "}
            <span className="grad">o'yin kabi qiziqarli</span> tarzda yodlang
          </h1>
          <p>
            Blitz Quiz — darslikning har bir bo'limidagi eng muhim so'zlarni
            tez va oson yodlab olishga yordam beruvchi test ilovasi. Har bir
            savolda nemischa so'z beriladi, siz esa 4 variantdan to'g'ri
            o'zbekcha tarjimasini tanlaysiz. Yangi so'zlarni unutmaslik uchun
            har darsdan so'ng shu yerda mashq qiling.
          </p>
          <a
            className="bqh-hero-btn"
            href="#levels"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("levels")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Darajani tanlash <ArrowRight size={18} />
          </a>
        </section>

        <section className="bqh-section">
          <div className="bqh-section-head">
            <h2>Nega Blitz Quiz?</h2>
            <p>So'z boyligingizni oshirishning eng tez yo'li</p>
          </div>
          <div className="bqh-features">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  className="bqh-feature"
                  key={i}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="bqh-feature-icon">
                    <Icon size={20} color="#fff" />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bqh-section" id="levels">
          <div className="bqh-section-head">
            <h2>Darajangizni tanlang</h2>
            <p>Har bir daraja o'z darslari va so'z boyligiga ega</p>
          </div>

          <div className="bqh-levels">
            {LEVELS.map((lvl, i) => (
              <button
                key={lvl.id}
                className={`bqh-level-card theme-${lvl.theme}`}
                style={{ transitionDelay: `${i * 90}ms` }}
                onClick={() => setActiveLevel(lvl)}
              >
                <div className="bqh-level-cover">
                  <div className="bqh-level-cover-stripe" />
                  <div className="bqh-level-cover-top">
                    <span className="bqh-level-cover-brand">BLITZ</span>
                    <span className="bqh-level-cover-badge">{lvl.title}</span>
                  </div>
                  <div className="bqh-level-cover-letter">{lvl.letter}</div>
                  <div className="bqh-level-cover-bottom">
                    <GraduationCap size={16} />
                    <span>MOMENTE</span>
                  </div>
                </div>
                <div className="bqh-level-info">
                  <div className="bqh-level-title-row">
                    <h3>{lvl.title}</h3>
                    <span className="bqh-level-count">
                      {lvl.units.length} ta dars
                    </span>
                  </div>
                  <div className="bqh-level-tagline">{lvl.tagline}</div>
                  <p>{lvl.desc}</p>
                  <span className="bqh-level-cta">
                    Darslarni ko'rish <ArrowRight size={16} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="bqh-footer">
          Blitz Quiz — nemis tilini o'rganishni osonlashtiruvchi hamroh
        </div>
      </div>

      {activeLevel && (
        <div
          className="bqh-levels-overlay"
          onClick={() => setActiveLevel(null)}
        >
          <div
            className={`bqh-levels-modal theme-${activeLevel.theme}`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeLevel.title} darslari`}
          >
            <div className="bqh-levels-modal-header">
              <div className="bqh-levels-modal-header-text">
                <h3>{activeLevel.title} darslari</h3>
                <span>{activeLevel.tagline}</span>
              </div>
              <button
                className="bqh-levels-modal-close"
                onClick={() => setActiveLevel(null)}
                aria-label="Yopish"
              >
                <X size={20} />
              </button>
            </div>

            <div className="bqh-levels-modal-units">
              {activeLevel.units.map((u, i) => (
                <Link
                  className="bqh-unit"
                  to={`/quiz/${u.id}`}
                  key={u.id}
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  <div className="bqh-unit-left">
                    <div className="bqh-unit-num">{u.id}</div>
                    <div>
                      <div className="bqh-unit-title">{u.unitName}</div>
                      <div className="bqh-unit-sub">
                        {u.wordQuantity} ta savol
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={18} className="bqh-unit-arrow" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlitzQuizHome;