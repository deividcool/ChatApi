import React, { useState } from 'react';
import '../styles/stylesDragAndDrop.css';

function DragAndDrop() {
  const [fileDetailsVisible, setFileDetailsVisible] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add('highlight');
  };

  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove('highlight');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setFileName(file.name);
    setFileDetailsVisible(true);
  };

  const handleCloseOverlay = () => {
    setFileDetailsVisible(false);
  };

  const handleSendButtonClick = () => {
    // Aquí puedes agregar la lógica para enviar el archivo
    console.log('Enviando archivo:', fileName);
    setFileDetailsVisible(false);
  };

  return (
    <div style={{position: 'absolute', width: '90%', height:'100%', backgroundColor:'red'}}>
      <div
        className="container"
        id="drop-area"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        Arrastra y suelta archivos aquí
      </div>
      {fileDetailsVisible && (
        <div className="overlay" id="overlay" onClick={handleCloseOverlay}>
          <div className="file-details" id="file-details">
            <p id="file-name">Archivo: {fileName}</p>
            <button id="send-button" onClick={handleSendButtonClick}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DragAndDrop;