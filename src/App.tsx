import React, { useState, useEffect } from 'react';
import Heatmap from './components/Heatmap';
import Filtros from './components/Filtros';
import PainelInfo from './components/PainelInfo';
import { GlobalProvider } from './context/GlobalContext';
import traducaoPt from './i18n/pt.json';
import traducaoEn from './i18n/en.json';
import { getPaginatedLocations } from './services/api';
import './styles.css';

const App: React.FC = () => {
  const [idioma, setIdioma] = useState('pt');
  const [traducoes, setTraducoes] = useState(traducaoPt);
  const [dadosAr, setDadosAr] = useState<any[]>([]);
  const [filtros, setFiltros] = useState({
    localizacao: '',
    faixaAQI: [0, 500],
    poluente: ''
  });

  useEffect(() => {
    setTraducoes(idioma === 'pt' ? traducaoPt : traducaoEn);
  }, [idioma]);

  useEffect(() => {
    const fetchAllLocations = async () => {
      let page = 1;
      const limit = 1000;
      let allLocations: any[] = [];
      let moreData = true;
      const maxPages = 100; // limite de segurança para evitar loops infinitos

      while (moreData && page <= maxPages) {
        try {
          const res = await getPaginatedLocations(page, limit);
          const rawResults = res.data.results;
          const results = rawResults.map((item: any) => ({
            local: item.name,
            lat: item.coordinates?.latitude,
            lng: item.coordinates?.longitude,
            aqi: item.sensors && item.sensors.length > 0 ? item.sensors[0].value || 50 : 50,
            dominante: item.sensors && item.sensors.length > 0 ? item.sensors[0].parameter.name.toLowerCase() : ''
          }));
          // Se não houver registros na página, encerra o loop
          if (results.length === 0) {
            moreData = false;
          } else {
            allLocations = allLocations.concat(results);
            setDadosAr([...allLocations]);
            page++;
          }
        } catch (err) {
          console.error(err);
          moreData = false;
        }
      }
    };

    fetchAllLocations();
  }, []);

  return (
    <GlobalProvider value={{ dadosAr, filtros, setFiltros, traducoes }}>
      <div className="app">
        <header className="header">
          <h1>{traducoes.titulo}</h1>
          <div className="language-switch">
            <button onClick={() => setIdioma('pt')} className={idioma === 'pt' ? 'active' : ''}>
              pt
            </button>
            <button onClick={() => setIdioma('en')} className={idioma === 'en' ? 'active' : ''}>
              en
            </button>
          </div>
        </header>
        <div className="overlay">
          <Filtros />
          <PainelInfo />
        </div>
        <Heatmap />
      </div>
    </GlobalProvider>
  );
};

export default App;