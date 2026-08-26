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
} from "lucide-react";
import '../App.css';

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
          <Link className="bqh-logo" to="/">
            <div className="bqh-logo-icon">
              <Zap size={19} color="#fff" fill="#fff" />
            </div>
            <div className="bqh-logo-text">Blitz<span> Quiz</span></div>
          </Link>
          <div className="bqh-badge">
            <FileStack size={13} /> Daraja - A1.1
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
            {VOCAB.map((u, i) => (
              <Link className="bqh-unit" to={`/quiz/${u.id}`} key={u.id} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="bqh-unit-left">
                  <div className="bqh-unit-num">{u.id}</div>
                  <div>
                    <div className="bqh-unit-title">{u.unitName}</div>
                    <div className="bqh-unit-sub">{u.wordQuantity} ta savol</div>
                  </div>
                </div>
                <ArrowRight size={18} className="bqh-unit-arrow" />
              </Link>
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