import React from 'react';

function TerminalContent({ lines }) {
  return (
    <div className="terminal-content">
      {lines.map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
    </div>
  );
}

export default TerminalContent;
