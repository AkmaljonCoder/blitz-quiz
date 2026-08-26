import { createContext, useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import NotFound from "./components/NotFound";
// Create Context
export const QuizModeContext = createContext(null);

const App = () => {
  const [quizMode, setquizMode] = useState('easy');
  const [currentQuiz, setCurrentQuiz] = useState(1);

  return (
    <QuizModeContext.Provider
    value={{ quizMode, setquizMode, currentQuiz, setCurrentQuiz }}
    >
      <BrowserRouter>
        {/* <Link to="/">Home</Link>
      <Link to="/unit1">About</Link> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QuizModeContext.Provider>
  );
};

export default App;