import React, { useState } from 'react';

function TerminalPrompt({ onCommand }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!input.trim()) return;
      onCommand(input);
      setHistory((prev) => [...prev, input]);
      setInput('');
      setHistoryIndex(-1);
    }

    if (e.key === 'ArrowUp') {
      if (history.length === 0) return;
      setHistoryIndex((i) => {
        const newIndex = i <= 0 ? 0 : i - 1;
        setInput(history[newIndex]);
        return newIndex;
      });
    }

    if (e.key === 'ArrowDown') {
      if (history.length === 0) return;
      setHistoryIndex((i) => {
        const newIndex = i >= history.length - 1 ? history.length - 1 : i + 1;
        setInput(history[newIndex] || '');
        return newIndex;
      });
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const suggestions = ['help', 'about', 'projects', 'clear'];
      const match = suggestions.find((cmd) => cmd.startsWith(input));
      if (match) setInput(match);
    }
  };

  return (
    <div className="terminal-prompt">
      <span>marcuschuong@macbook-pro ~ %</span>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  );
}

export default TerminalPrompt;
