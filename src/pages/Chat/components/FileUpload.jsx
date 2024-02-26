import React, { useState, useEffect, useRef } from 'react';
import Icon from "../../../components/Icon";
import axios from "axios";
import { useUsersContext } from "../../../context/usersContext"; 
import { webhook } from "../../../context/apis";

function FileUpload({closeSidebar}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [showButton, setShowButton] = useState(false); 
  const [fileData, setFileData] = useState(null); 
  const { idclient, idasesor, llave} = useUsersContext();
  const inputFileRef = useRef(null); // Referencia al input de archivo

  useEffect(() => {
    let timer;
    if (showButton) {
      timer = setTimeout(() => {
        document.getElementById('send_button').style.opacity = 1;
      }, 50);
    }
    return () => clearTimeout(timer);
  }, [showButton]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; 
  
    if (!file || event.target.files.length === 0) {
      setShowButton(false);
      return;
    }
  
    if (file.size > maxSize) {
      setErrorMessage('Supera el límite de 5MB.');
      event.target.value = null; 
      setShowButton(false); 
      return;
    }
  
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop();
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64File = e.target.result;
      setFileData({
        base64: base64File,
        fileName: fileName,
        fileExtension: fileExtension
      });
    };
    reader.readAsDataURL(file);
  
    setErrorMessage('');
    setShowButton(true);
  };

  const submitFileUpload = () => {
    if (fileData) {
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
    } 
  };

  return (
    <div>
      <label className="label_upload" htmlFor="file_input">Subir Archivo</label>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <input
          ref={inputFileRef} // Asignar la referencia al input de archivo
          className="input_upload"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          onChange={handleFileChange}
        />
        {showButton ? 
            <button
            id="send_button"
            aria-label="Send message"
            style={{ opacity: 0, transition: 'opacity 2s ease' }}
            onClick={submitFileUpload}
            >
                <Icon id="send" className="chat__input-icon" />
            </button>
        : null}
      </div>
      <p className="p_input_upload" id="file_input_help">PDF, PNG, XLSX, DOC (MAX. 5MB).</p>
      {errorMessage && <p style={{ color: 'red', fontSize: '0.7rem' }}>{errorMessage}</p>}
    </div>
  );
}

export default FileUpload;