import React from 'react';
import Draggable from 'react-draggable';

function TextCanvas({ texts, handleTextClick, updatePosition }) {
  const canvasStyle = {
    border: '1px dashed black',
    width: '800px',
    height: '600px',
    position: 'relative',
    overflow: 'hidden'
  };

  const handleStop = (e, data, id) => {
    updatePosition(id, { x: data.x, y: data.y });
  };

  return (
    <div style={canvasStyle}>
      {texts.map(({ id, text, font, size, color, position }) => (
        <Draggable key={id} position={position} onStop={(e, data) => handleStop(e, data, id)}>
          <div
            style={{
              fontFamily: font,
              fontSize: `${size}px`,
              color: color,
              position: 'absolute',
              cursor: 'move'
            }}
            onClick={() => handleTextClick(id)}
          >
            {text}
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default TextCanvas;
