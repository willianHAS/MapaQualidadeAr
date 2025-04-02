import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Autocomplete from './Autocomplete';

const Filtros: React.FC = () => {
  const { filtros, setFiltros, traducoes } = useContext(GlobalContext);
  const [local, setLocal] = useState(filtros.localizacao);
  const [aqiMin, setAqiMin] = useState(filtros.faixaAQI[0]);
  const [aqiMax, setAqiMax] = useState(filtros.faixaAQI[1]);
  const [poluente, setPoluente] = useState(filtros.poluente);

  const aplicarFiltros = () => {
    setFiltros({
      localizacao: local,
      faixaAQI: [aqiMin, aqiMax],
      poluente: poluente.toLowerCase()
    });
  };
  return (
    <div className="filtros">
        <div>
        <div className="filtro-item">
          <div className="localizacao">
          <label>{traducoes.filtroLocalizacao}</label>
            <Autocomplete 
              value={local}
              onChange={(value) => setLocal(value)}
              placeholder={traducoes.digiteLocal || "Digite a localização"}
            />
          </div>
        </div>
        
      <div className="filtro-item">
        <label>{traducoes.filtroAQI}</label>
        <div className="aqi-inputs">
          <input 
            type="number" 
            value={aqiMin} 
            onChange={(e) => setAqiMin(Number(e.target.value))} 
            placeholder={traducoes.minimo || "Min"} 
            min="0"
            max="500"
          />
          <input 
            type="number" 
            value={aqiMax} 
            onChange={(e) => setAqiMax(Number(e.target.value))} 
            placeholder={traducoes.maximo || "Max"} 
            min="0"
            max="500"
          />
        </div>
        </div>
      </div>
      <div className="filtro-item">
        <label>{traducoes.filtroPoluente}</label>
        <select 
          value={poluente} 
          onChange={(e) => setPoluente(e.target.value)}
          aria-label={traducoes.filtroPoluente}
        >
          <option value="">{traducoes.selecione || "Selecione"}</option>
          <option value="pm10">PM10</option>
          <option value="pm25">PM2.5</option>
          <option value="no2">NO2</option>
          <option value="co">CO</option>
          <option value="o3">O3</option>
          <option value="so2">SO2</option>
        </select>
      </div>
      <button onClick={aplicarFiltros} className="aplicar-btn">
        {traducoes.aplicar || "Aplicar"}
      </button>
    </div>
  );
};

export default Filtros;