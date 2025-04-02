import React, { createContext } from 'react';

type GlobalContextType = {
  dadosAr: any[];
  filtros: {
    localizacao: string;
    faixaAQI: number[];
    poluente: string;
  };
  setFiltros: React.Dispatch<React.SetStateAction<{
    localizacao: string;
    faixaAQI: number[];
    poluente: string;
  }>>;
  traducoes: any;
};

export const GlobalContext = createContext<GlobalContextType>({
  dadosAr: [],
  filtros: { localizacao: '', faixaAQI: [0, 500], poluente: '' },
  setFiltros: () => {},
  traducoes: {}
});

export const GlobalProvider = GlobalContext.Provider;