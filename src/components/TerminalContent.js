import React from 'react';

function TerminalContent({ lines, isTyping, currentTypingLine }) {
  return (
    <div className="terminal-content">
      {lines.map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
      {isTyping && (
        <div>
          {currentTypingLine}
          <span className="typing-cursor" />
        </div>
      )}
    </div>
  );
}

export default TerminalContent;