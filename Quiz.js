import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizData } from './questions';

const Quiz = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15); // 15 seconds per question
  const navigate = useNavigate();

  const handleFinish = useCallback((finalScore) => {
    navigate('/result', { state: { score: finalScore, total: quizData.length } });
  }, [navigate]);

  const handleNext = (selectedOption) => {
    let updatedScore = score;
    if (selectedOption === quizData[currentIdx].answer) {
      updatedScore = score + 1;
      setScore(updatedScore);
    }

    if (currentIdx + 1 < quizData.length) {
      setCurrentIdx(currentIdx + 1);
      setTimeLeft(15);
    } else {
      handleFinish(updatedScore);
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext(null); // Move to next if time runs out
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const q = quizData[currentIdx];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span>Question {currentIdx + 1} / {quizData.length}</span>
        <span style={{ color: timeLeft < 5 ? 'red' : 'black' }}>⏳ {timeLeft}s</span>
      </div>
      <div style={{ ...styles.progressBar, width: `${((currentIdx + 1) / quizData.length) * 100}%` }}></div>
      
      <h2 style={styles.question}>{q.question}</h2>
      
      <div style={styles.optionsGrid}>
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => handleNext(opt)} style={styles.button}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '12px', textAlign: 'center', fontFamily: 'Arial' },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: 'bold' },
  progressBar: { height: '8px', backgroundColor: '#4CAF50', marginBottom: '20px', transition: 'width 0.3s ease' },
  question: { fontSize: '1.4rem', marginBottom: '20px' },
  optionsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  button: { padding: '15px', fontSize: '1rem', cursor: 'pointer', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '8px', transition: '0.2s' }
};

export default Quiz;
