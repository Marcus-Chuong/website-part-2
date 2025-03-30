// App.js
import React, { useState, useEffect, useRef } from 'react';
import TerminalPrompt from './components/TerminalPrompt';
import TerminalContent from './components/TerminalContent';
import BootScreen from './components/BootScreen';
import MacDesktop from './components/MacDesktop';
import './App.css';

function App() {
  const [lines, setLines] = useState([]);
  const [bootStep, setBootStep] = useState('boot');
  const [terminalOpened, setTerminalOpened] = useState(false);
  const [bootDone, setBootDone] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingLine, setCurrentTypingLine] = useState('');
  const [typingSpeed, setTypingSpeed] = useState(30);

  const terminalRef = useRef(null);
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const startDrag = (e) => {
    if (e.target.closest('.terminal-top-bar')) {
      const rect = terminalRef.current.getBoundingClientRect();
      setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.x + terminalRef.current.offsetWidth / 2,
      y: e.clientY - offset.y + terminalRef.current.offsetHeight / 2,
    });
  };

  const stopDrag = () => setDragging(false);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopDrag);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', stopDrag);
    };
  });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const updateLines = (newLine) => {
    setLines((prev) => [...prev, newLine]);
  };

  const typeLine = async (line) => {
    setIsTyping(true);
    setCurrentTypingLine('');
    let typed = '';

    for (let i = 0; i < line.length; i++) {
      typed += line[i];
      setCurrentTypingLine(typed);
      await delay(typingSpeed);
    }

    setLines((prev) => [...prev, typed]);
    setCurrentTypingLine('');
    setIsTyping(false);
  };

  const addTypedOutput = (cmd, outputLines) => {
    updateLines(`marcuschuong@macbook-pro ~ % ${cmd}`);
    let index = 0;
    const interval = setInterval(() => {
      if (index < outputLines.length) {
        updateLines(outputLines[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80);
  };

  const handleCommand = (input) => {
    const cmd = input.trim().toLowerCase();

    if (cmd.startsWith('speed ')) {
      const ms = parseInt(cmd.split(' ')[1]);
      if (!isNaN(ms)) setTypingSpeed(ms);
      return;
    }

    switch (cmd) {
      case 'help':
        addTypedOutput(cmd, ['Available commands:', 'about', 'projects', 'clear', 'speed <ms>']);
        break;
      case 'about':
        addTypedOutput(cmd, [
          'Hi, I’m Marcus Chuong.',
          'I’m a developer who loves clean interfaces and creative code.'
        ]);
        break;
      case 'projects':
        addTypedOutput(cmd, [
          'Projects:',
          '- Terminal Portfolio',
          '- React Weather App',
          '- GitHub Explorer Tool'
        ]);
        break;
      case 'clear':
        setLines([]);
        break;
      default:
        addTypedOutput(cmd, [
          `Command not found: ${cmd}`,
          "Type 'help' to see available commands."
        ]);
    }
  };

  const runTerminalBoot = async () => {
    const bootSequence = [
      'Last login: Sun Mar 31 21:37:00 on ttys000',
      'marcuschuong@macbook-pro ~ % booting portfolio...'
    ];

    const introTypingLines = [
      "Loading Marcus Chuong's portfolio...",
      'Initializing personality modules...'
    ];

    const welcomeLines = [
      '',
      "Welcome to Marcus Chuong's Terminal Portfolio!",
      "Type 'help' to see available commands.",
      ''
    ];

    for (const line of bootSequence) {
      await delay(800);
      updateLines(line);
    }

    await delay(1000);

    for (const line of introTypingLines) {
      await typeLine(line);
    }

    await delay(500);

    for (const line of welcomeLines) {
      updateLines(line);
    }

    setBootDone(true);
  };

  const handleBootFinish = () => {
    setBootStep('desktop');
    setTimeout(() => {
      setTerminalOpened(true);
      runTerminalBoot();
    }, 3000);
  };

  return (
    <div className="mac-background">
      {bootStep === 'boot' && <BootScreen onFinish={handleBootFinish} />}
      {bootStep === 'desktop' && !terminalOpened && <MacDesktop onOpenTerminal={() => {}} />}
      {terminalOpened && (
        <div
          className="terminal-wrapper"
          ref={terminalRef}
          onMouseDown={startDrag}
          style={{
            position: 'absolute',
            top: position.y,
            left: position.x,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="terminal-top-bar">
            <span className="btn red" />
            <span className="btn yellow" />
            <span className="btn green" />
          </div>
          <div className="terminal-body">
            <TerminalContent
              lines={lines}
              isTyping={isTyping}
              currentTypingLine={currentTypingLine}
            />
            {bootDone && <TerminalPrompt onCommand={handleCommand} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
