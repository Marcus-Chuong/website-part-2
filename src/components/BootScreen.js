import React, { useEffect } from 'react';
import './BootScreen.css';

function BootScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="boot-container">
      <div className="apple-logo"></div>
      <div className="progress-bar">
        <div className="progress" />
      </div>
    </div>
  );
}

export default BootScreen;
