import React from 'react';

function TerminalPrompt({
  onCommand,
  inputValue,
  setInputValue,
  history,
  setHistory,
  historyIndex,
  setHistoryIndex
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (inputValue.trim()) {
        onCommand(inputValue);
        setHistory((prev) => [...prev, inputValue]);
        setHistoryIndex(-1);
        setInputValue('');
      }
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0) {
        const newIndex = historyIndex <= 0 ? history.length - 1 : historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      if (history.length > 0) {
        const newIndex = historyIndex >= history.length - 1 ? 0 : historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(history[newIndex]);
      }
    }
  };

  return (
    <div className="terminal-prompt">
      <span>marcuschuong@macbook-pro ~ %</span>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  );
}

export default TerminalPrompt;