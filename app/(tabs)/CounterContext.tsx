import React, { createContext, useContext, useState } from 'react';

type CounterContextType = {
  counter: number;
  incrementCounter: () => void;
};

const CounterContext = createContext<CounterContextType | undefined>(undefined);

export const CounterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => setCounter((prev) => prev + 1);

  return (
    <CounterContext.Provider value={{ counter, incrementCounter }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
};
