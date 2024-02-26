import { createContext, useContext, useState } from 'react';

// Crea el contexto
const DateRangeContext = createContext();

// Hook personalizado para acceder al contexto
export function useDateRange() {
  return useContext(DateRangeContext);
}

// Componente que provee el contexto
export function DateRangeProvider({ children }) {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  return (
    <DateRangeContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </DateRangeContext.Provider>
  );
}