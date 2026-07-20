import { useState, useEffect } from "react";
import {
  Zap,
  BookOpen,
  Brain,
  BarChart3,
  Sparkles,
  ArrowRight,
  Layers,
  Timer,
} from "lucide-react";
import '../App.css';

// ---------------------------------------------------------------------------
// Unit links — rename / point these to your real routes for each unit quiz
// ---------------------------------------------------------------------------
const UNITS = [
  { id: 1, title: "Unit 1", href: "#unit-1" },
  { id: 2, title: "Unit 2", href: "#unit-2" },
  { id: 3, title: "Unit 3", href: "#unit-3" },
  { id: 4, title: "Unit 4", href: "#unit-4" },
  { id: 5, title: "Unit 5", href: "#unit-5" },
  { id: 6, title: "Unit 6", href: "#unit-6" },
];

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

  return (
    <div className="bqh-root">

      <div className="bqh-bolts">
        <Zap className="bqh-bolt" style={{ top: "8%", left: "6%", width: 60, height: 60 }} />
        <Zap className="bqh-bolt" style={{ top: "70%", left: "85%", width: 80, height: 80, animationDelay: "3s" }} />
        <Zap className="bqh-bolt" style={{ top: "40%", left: "92%", width: 40, height: 40, animationDelay: "6s" }} />
      </div>

      <div className={shown ? "bqh-inner in" : "bqh-inner"} style={{ position: "relative" }}>
        <header className="bqh-header">
          <div className="bqh-logo">
            <div className="bqh-logo-icon">
              <Zap size={19} color="#fff" fill="#fff" />
            </div>
            <div className="bqh-logo-text">Blitz<span> Quiz</span></div>
          </div>
          <div className="bqh-badge">
            <Sparkles size={13} /> 6 ta dars
          </div>
        </header>

        <section className={`bqh-hero ${shown ? "" : ""}`}>
          <div className="bqh-hero-icon">
            <BookOpen size={34} color="#fff" />
          </div>
          <h1>
            Nemischa so'zlarni <span className="grad">o'yin kabi qiziqarli</span> tarzda yodlang
          </h1>
          <p>
            Blitz Quiz — darslikning har bir bo'limidagi eng muhim so'zlarni tez va oson
            yodlab olishga yordam beruvchi test ilovasi. Har bir savolda nemischa so'z
            beriladi, siz esa 4 variantdan to'g'ri o'zbekcha tarjimasini tanlaysiz.
            Yangi so'zlarni unutmaslik uchun har darsdan so'ng shu yerda mashq qiling.
          </p>
          <a
            className="bqh-hero-btn"
            href="#units"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("units")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Darsni tanlash <ArrowRight size={18} />
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
                <div className="bqh-feature" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
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

        <section className="bqh-section" id="units">
          <div className="bqh-section-head">
            <h2>Darslarni tanlang</h2>
            <p>Har bir unit uchun alohida test — o'zingizga kerakli darsni boshlang</p>
          </div>
          <div className="bqh-units">
            {UNITS.map((u, i) => (
              <a className="bqh-unit" href={u.href} key={u.id} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="bqh-unit-left">
                  <div className="bqh-unit-num">{u.id}</div>
                  <div>
                    <div className="bqh-unit-title">{u.title}</div>
                    <div className="bqh-unit-sub">20 ta savol</div>
                  </div>
                </div>
                <ArrowRight size={18} className="bqh-unit-arrow" />
              </a>
            ))}
          </div>
        </section>

        <div className="bqh-footer">
          Blitz Quiz — nemis tilini o'rganishni osonlashtiruvchi hamroh
        </div>
      </div>
    </div>
  );
}

export default BlitzQuizHome;