import React, { useState } from 'react';
import './App.css';
import TerminalPrompt from './components/TerminalPrompt';
import TerminalContent from './components/TerminalContent';

function App() {
  const [lines, setLines] = useState([
    'Welcome to JG’s Terminal Portfolio!',
    "Type 'help' to see available commands.\n"
  ]);

  const handleCommand = (input) => {
    const cmd = input.trim().toLowerCase();
    let response = [];

    switch (cmd) {
      case 'help':
        response = [
          'Available commands:',
          'about - Learn about me',
          'projects - See my work',
          'clear - Clear the screen',
        ];
        break;
      case 'about':
        response = [
          'Hi, I’m Marcus Chuong. I build cool things with code.',
          'I love clean design and clever ideas.'
        ];
        break;
      case 'projects':
        response = [
          'Projects:',
          '- Portfolio Website',
          '- API-integrated React App',
          '- Open Source Contributions'
        ];
        break;
      case 'clear':
        setLines([]);
        return;
      default:
        response = [`Command not found: ${cmd}`, `Type 'help' for a list of commands.`];
    }

    setLines((prev) => [...prev, `$ ${cmd}`, ...response]);
  };

  return (
    <div className="screen-container">
      <div className="terminal-window">
        <TerminalContent lines={lines} />
        <TerminalPrompt onCommand={handleCommand} />
      </div>
    </div>
  );
}

export default App;