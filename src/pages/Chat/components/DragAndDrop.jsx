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

  const handleSendButtonClicks = () => {
    // Aquí puedes agregar la lógica para enviar el archivo
    /* if (fileData) {
      let name = fileData.fileName.split('.')[0];
      let base64 = fileData.base64.split(',')[1];
      let extension = fileData.fileExtension;
      closeSidebar();
      axios
      .post(`${webhook}`, {
          tipo: "3",
          idasesor: idasesor,
          idserial: idclient,
          llave: llave,
          name: name,
          extension:extension,
          archivo:base64
      })
      .then(res => {
          console.log(res)
          setShowButton(false);
          // Limpiar el input del archivo
          inputFileRef.current.value = '';
      })
      .catch(e => {
          console.log("error oportunidades " + e);
      });
  }  */
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
            <button id="send-button" onClick={()=> handleSendButtonClicks()}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DragAndDrop;