import React from 'react';

function Controls({
  font,
  size,
  color,
  setFont,
  setSize,
  setColor,
  currentText,
  setCurrentText,
  addText,
  handleUpdateProperties,
  selectedTextId
}) {
  return (
    <div className="controls">
      <div className="control-group">
        <label>Font: </label>
        <select value={font} onChange={(e) => setFont(e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia</option>
          {/* Add more fonts as needed */}
        </select>
      </div>
      <div className="control-group">
        <label>Size: </label>
        <input
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>
      <div className="control-group">
        <label>Color: </label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <div className="control-group">
        <label>Text: </label>
        <input
          type="text"
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
        />
      </div>
      <button onClick={selectedTextId ? handleUpdateProperties : addText}>
        {selectedTextId ? "Update Text" : "Add Text"}
      </button>
    </div>
  );
}

export default Controls;
