import React, { useState } from 'react';
import "./styles/main.css";


const DateRangeModal = ({ onSubmit, checkList, campana }) => {

  const today = new Date();
  const fourDaysAgo = new Date(today);
  fourDaysAgo.setDate(today.getDate() - 4);

  const [startDate, setStartDate] = useState(fourDaysAgo);
  const [endDate, setEndDate] = useState(today);
  const [selectedCheck, setSelectedCheck] = useState(null);
  const [selectedCampana, setSelectCampana] = useState(null);
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ startDate, endDate, selectedCheck, selectedCampana });
  };

 
  return (
    <div className="date-range-modal" style={{ 
      position: 'relative', 
      display: 'flex',
      top: '180px', 
      left: '50%', 
      transform: 'translate(-50%, -50%)',
      zIndex: '1000',
      background: '#CDD6D5', 
      padding: '20px', 
      borderRadius: '8px',
      color: '#090909',
      width: '280px',
      overflowY: 'auto',
      maxHeight: '480px'
    }}>
      <form onSubmit={handleFormSubmit}>
        <label style={{ marginBottom: '5px' }}>Desde:</label>
        <input
          type="date"
          value={startDate.toISOString().split('T')[0]}
          onChange={(e) => {
            const dataValueStart =  new Date(e.target.value);
            if(!isNaN(dataValueStart.getTime())){
                setStartDate(dataValueStart)
            }
          }}
          style={{ 
            padding: '5px', 
            borderRadius: '4px', 
            border: 'solid 1px #ccc', 
            marginBottom: '10px',
            width: '100%',
            background: '#F0F0F0'

          }}
        />
        <label style={{ marginBottom: '5px' }}>Hasta:</label>
        <input
          type="date"
          value={endDate.toISOString().split('T')[0]}
          onChange={(e) => {
            const dataValue =  new Date(e.target.value);
            if(!isNaN(dataValue.getTime())){
                setEndDate(dataValue)
            }
          }}
          style={{ 
            padding: '5px', 
            borderRadius: '4px', 
            border: 'solid 1px #ccc', 
            marginBottom: '10px',
            width: '100%',
            background: '#F0F0F0'

         }}
        />
         {campana.length > 0 && (
          <>
          <label style={{ marginBottom: '5px' }}>Campañas:</label>
          <select 
            value={selectedCampana}
            onChange={(e) => setSelectCampana(e.target.value)}
            style = {{
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginBottom: '10px',
              width: '100%',
              background: '#F0F0F0'
            }}        
          >
            <option value="">Sin filtro</option>
            <option value="todas">Todas</option>
            {campana.map((campana) => (
              <option key={campana.id} value={campana.id}>{campana.name}</option>
            ))}
          </select> 
          </>
        )}
        {checkList.length > 0 && (
          <>
          <label style={{ marginBottom: '5px' }}>Ultima Acci&oacute;n:</label>
          <select 
            value={selectedCheck}
            onChange={(e) => setSelectedCheck(e.target.value)}
            style = {{
              padding: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginBottom: '10px',
              width: '100%',
              background: '#F0F0F0'
            }}        
          >
            <option value="">Sin filtro</option>
            <option value="todas">Todas</option>
            {checkList.map((checks) => (
              <option key={checks.id} value={checks.id}>{checks.name}</option>
            ))}
          </select> 
          </>
        )}
        <button type="submit" style={{ 
            background: '#1CD8CD', 
            color: '#000000', 
            padding: '8px 16px', 
            borderRadius: '4px', 
            border: 'none', 
            cursor: 'pointer',
            marginTop: '10px',
            borderBottom: '10px solid #CDD6D5'
            }}>Buscar</button>
      </form>
    </div>
  );
};

export default DateRangeModal;