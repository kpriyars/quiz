import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Result = () => {
  const { state } = useLocation();
  const score = state?.score || 0;
  const total = state?.total || 0;
  const percentage = (score / total) * 100;

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'Arial' }}>
      <h1>Quiz Result</h1>
      <div style={{ fontSize: '3rem', margin: '20px 0' }}>{percentage >= 50 ? '🎉' : '😟'}</div>
      <p style={{ fontSize: '1.5rem' }}>You scored <strong>{score}</strong> out of <strong>{total}</strong></p>
      <p>{percentage >= 50 ? "Great job!" : "Keep practicing!"}</p>
      <Link to="/">
        <button style={{ padding: '10px 20px', fontSize: '1rem', marginTop: '20px', cursor: 'pointer' }}>Try Again</button>
      </Link>
    </div>
  );
};

export default Result;
