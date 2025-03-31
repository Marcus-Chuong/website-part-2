import React from 'react';

function TerminalContent({ lines, isTyping, currentTypingLine }) {
  return (
    <div className="terminal-content">
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      {isTyping && <div>{currentTypingLine}<span className="typing-cursor"></span></div>}
    </div>
  );
}

export default TerminalContent;