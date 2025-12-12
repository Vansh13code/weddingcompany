import { useState, useEffect } from "react";
import paw from "./assets/cat-cute.gif";

export default function App() {
  const questions = [
    {
      q: "What sound does a cat make?",
      options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
      answer: "Meow-Meow",
    },
    {
      q: "What would you probably find in your fridge?",
      options: ["Shoes", "Ice Cream", "Books"],
      answer: "Ice Cream",
    },
    {
      q: "What color are bananas?",
      options: ["Blue", "Yellow", "Red"],
      answer: "Yellow",
    },
    {
      q: "How many stars are in the sky?",
      options: ["Two", "Infinite", "One Hundred"],
      answer: "Infinite",
    },
  ];

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  function next() {
    if (selected === questions[index].answer) {
      setScore((s) => s + 1);
    }

    setSelected("");

    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
    } else {
      setShowResult(true);
    }
  }

  function prev() {
    if (index === 0) return;
    setIndex((i) => i - 1);
    setSelected("");
  }

  function restart() {
    setIndex(0);
    setSelected("");
    setScore(0);
    setDisplayScore(0);
    setShowResult(false);
  }

  // score nikalna ke animation
  useEffect(() => {
    if (!showResult) return;

    const finalScore = Math.round((score / questions.length) * 100);
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setDisplayScore(current);
      if (current >= finalScore) clearInterval(timer);
    }, 18);

    return () => clearInterval(timer);
  }, [showResult, score]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-cyan-200 flex items-center justify-center">
      <div className="outer-card">
        <div className="inner-card relative">

          
          {index === 0 && !showResult && (
            <div className="absolute left-6 bottom-6 pointer-events-none">
              <svg width="160" height="60" viewBox="0 0 160 60" className="mb-1">
                <path
                  d="M12 8H148Q154 8 154 14V32Q154 38 148 38H88L80 48L82 38H12Q6 38 6 32V14Q6 8 12 8Z"
                  fill="white"
                  stroke="#84c7ea"
                  strokeWidth="2"
                />
                <text
                  x="80"
                  y="28"
                  textAnchor="middle"
                  fontSize="14"
                  fill="#1f3b4d"
                  style={{
                    fontFamily: "Segoe Print, Comic Sans MS, cursive",
                  }}
                >
                  Best of Luck!
                </text>
              </svg>

              <img src={paw} alt="paw" className="w-[120px]" />
            </div>
          )}

          {!showResult && (
            <>
              
              <h1 className="main-title">Test Your Knowledge</h1>

              <div className="subtitle-pill">
                Answer all questions to see your results
              </div>

              
              <div className="progress">
                {questions.map((_, i) => (
                  <span key={i} className={i <= index ? "active" : ""} />
                ))}
              </div>

              
              <div className="question-box">
                {index + 1}. {questions[index].q}
              </div>

              
              <div className="options">
                {questions[index].options.map((o) => (
                  <div
                    key={o}
                    onClick={() => setSelected(o)}
                    className={`option ${selected === o ? "selected" : ""}`}
                  >
                    {o}
                  </div>
                ))}
              </div>

              
              <div className="nav">
                <button
                  onClick={prev}
                  disabled={index === 0}
                  className={index === 0 ? "nav-disabled" : "nav-active"}
                >
                  ←
                </button>

                <button
                  onClick={next}
                  disabled={!selected}
                  className={!selected ? "nav-disabled" : "nav-active"}
                >
                  →
                </button>
              </div>
            </>
          )}

          
          {showResult && (
            <div className="result">
              <span className="badge">Keep Learning!</span>
              <h2>Your Final score is</h2>
              <div className="score">{displayScore}%</div>

              <button onClick={restart} className="start-again-btn">
                Start Again
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
