import React, { useState } from 'react';

function TerminalPrompt({ onCommand }) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onCommand(input);
      setInput('');
    }
  };

  return (
    <div className="terminal-prompt">
      <span className="prompt-symbol">$</span>
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
