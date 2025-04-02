import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const PainelInfo: React.FC = () => {
  const { dadosAr, filtros, traducoes } = useContext(GlobalContext);
  const dadosFiltrados = dadosAr.filter(item => {
    const dentroLocal = filtros.localizacao
    ? (item.local || '').toLowerCase().includes(filtros.localizacao.toLowerCase())
    : true;
    const dentroAQI = item.aqi >= filtros.faixaAQI[0] && item.aqi <= filtros.faixaAQI[1];
    const dentroPoluente = filtros.poluente ? item.dominante === filtros.poluente : true;
    return dentroLocal && dentroAQI && dentroPoluente;
  });
  const mediaAQI = dadosFiltrados.reduce((acc, cur) => acc + cur.aqi, 0) / (dadosFiltrados.length || 1);
  const localMenor = dadosFiltrados.reduce((prev, curr) => prev.aqi < curr.aqi ? prev : curr, dadosFiltrados[0] || {});
  const localMaior = dadosFiltrados.reduce((prev, curr) => prev.aqi > curr.aqi ? prev : curr, dadosFiltrados[0] || {});
  const contadorPoluentes: Record<string, number> = {};
  dadosFiltrados.forEach(item => {
    contadorPoluentes[item.dominante] = (contadorPoluentes[item.dominante] || 0) + 1;
  });
  const poluenteComum = Object.keys(contadorPoluentes).reduce((a, b) => contadorPoluentes[a] > contadorPoluentes[b] ? a : b, '');
  return (
    <div className="painel-info">
      <div>
        <span>{traducoes.mediaAQI}: </span>
        <span>{Math.round(mediaAQI)}</span>
      </div>
      {/* <div>
        <span>{traducoes.menorAQI}: </span>
        <span>{localMenor?.local || '-'}</span>
      </div> */}
      <div>
        <span>{traducoes.maiorAQI}: </span>
        <span>{localMaior?.local || '-'}</span>
      </div>
      <div>
        <span>{traducoes.poluenteComum}: </span>
        <span>{poluenteComum || '-'}</span>
      </div>
    </div>
  );
};

export default PainelInfo;