import { Link } from "react-router-dom";
import { Zap, SearchX, ArrowLeft } from "lucide-react";
import "../QuizNotFound.css";

function QuizNotFound() {
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
      </header>

      <div className="bq-card-outer">
        <div className="bq-card bq-notfound">
          <div className="bq-notfound-icon">
            <SearchX size={34} color="#fff" />
          </div>
          <h1>Dars topilmadi</h1>
          <p>
            Siz qidirayotgan test mavjud emas yoki o'chirilgan bo'lishi
            mumkin. Iltimos, mavjud darslardan birini tanlang.
          </p>
          <Link className="bq-btn" to="/">
            <ArrowLeft size={18} /> Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QuizNotFound;