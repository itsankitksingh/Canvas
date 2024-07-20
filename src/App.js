import React, { useState } from 'react';
import TextCanvas from './components/TextCanvas';
import Controls from './components/Controls';
import './index.css';

function App() {
  const [texts, setTexts] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [font, setFont] = useState("Arial");
  const [size, setSize] = useState(16);
  const [color, setColor] = useState("#000000");
  const [selectedTextId, setSelectedTextId] = useState(null);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const addText = () => {
    const newText = {
      id: Date.now(),
      text: currentText,
      font,
      size,
      color,
      position: { x: 0, y: 0 }
    };
    setTexts([...texts, newText]);
    setHistory([...history, texts]);
    setRedoStack([]);
    setCurrentText("");
    setSelectedTextId(null);
  };

  const updateText = (id, updatedProperties) => {
    const updatedTexts = texts.map(text =>
      text.id === id ? { ...text, ...updatedProperties } : text
    );
    setTexts(updatedTexts);
    setHistory([...history, texts]);
    setCurrentText("");
    setSelectedTextId(null);
  };

  const updatePosition = (id, newPosition) => {
    const updatedTexts = texts.map(text =>
      text.id === id ? { ...text, position: newPosition } : text
    );
    setTexts(updatedTexts);
  };

  const handleTextClick = (id) => {
    const selectedText = texts.find(text => text.id === id);
    setSelectedTextId(id);
    setCurrentText(selectedText.text);
    setFont(selectedText.font);
    setSize(selectedText.size);
    setColor(selectedText.color);
  };

  const handleUpdateProperties = () => {
    if (selectedTextId !== null) {
      updateText(selectedTextId, {
        text: currentText,
        font,
        size,
        color
      });
    }
  };

  const undo = () => {
    if (history.length > 0) {
      const lastState = history.pop();
      setRedoStack([texts, ...redoStack]);
      setTexts(lastState);
      setSelectedTextId(null);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.shift();
      setHistory([...history, texts]);
      setTexts(nextState);
      setSelectedTextId(null);
    }
  };

  return (
    <div className="app">
      <div className="toolbar">
        <button onClick={undo} disabled={history.length === 0}>UNDO</button>
        <button onClick={redo} disabled={redoStack.length === 0}>REDO</button>
      </div>
      <div className="main">
        <TextCanvas
          texts={texts}
          handleTextClick={handleTextClick}
          updatePosition={updatePosition}
        />
        <Controls
          font={font}
          size={size}
          color={color}
          setFont={setFont}
          setSize={setSize}
          setColor={setColor}
          currentText={currentText}
          setCurrentText={setCurrentText}
          addText={addText}
          handleUpdateProperties={handleUpdateProperties}
          selectedTextId={selectedTextId}
        />
      </div>
    </div>
  );
}

export default App;
