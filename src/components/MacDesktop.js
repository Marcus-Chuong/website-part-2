// MacDesktop.js
import React, { useEffect, useState } from 'react';
import './MacDesktop.css';
import terminalIcon from '../assets/terminal-icon.png';

function MacDesktop({ onOpenTerminal }) {
  const [cursorActive, setCursorActive] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setTimeout(() => setCursorActive(true), 1000);
    setTimeout(() => {
      setClicked(true);
      setTimeout(() => onOpenTerminal(), 1000);
    }, 3000);
  }, [onOpenTerminal]);

  return (
    <div className="mac-desktop">
      <img
        src={terminalIcon}
        alt="Terminal Icon"
        className="terminal-icon"
        style={{ opacity: 1 }} // ensure it's always visible
      />
      {cursorActive && <div className={`cursor ${clicked ? 'clicked' : ''}`} />}
    </div>
  );
}

export default MacDesktop;