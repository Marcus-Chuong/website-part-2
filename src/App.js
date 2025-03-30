import React, { useEffect } from 'react';
import Typical from 'react-typical';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/home');
    }, 5500);

    const skipOnKey = () => {
      clearTimeout(timeout);
      navigate('/home');
    };

    window.addEventListener('keydown', skipOnKey);
    return () => window.removeEventListener('keydown', skipOnKey);
  }, [navigate]);

  return (
    <div className="screen-container">
      <div className="terminal-window">
        <div className="typing-line">
          <Typical
            steps={[
              'Booting up system...',
              1000,
              'Loading user interface...',
              800,
              'Initializing modules...',
              800,
              'Welcome, JG',
              1500,
            ]}
            loop={1}
            wrapper="p"
          />
        </div>
        <p className="hint">Press any key to continue...</p>
      </div>
    </div>
  );
}

export default App;