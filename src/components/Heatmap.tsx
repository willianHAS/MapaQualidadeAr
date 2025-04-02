import React, { useContext, useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { GlobalContext } from '../context/GlobalContext';
import countriesGeo from '../geo/countries.geo.json';
import * as echarts from 'echarts';

const Heatmap: React.FC = () => {
  const { dadosAr, filtros } = useContext(GlobalContext);
  const [opcoes, setOpcoes] = useState<any>({});

  useEffect(() => {
    echarts.registerMap('world', countriesGeo as any);

    const dadosFiltrados = dadosAr
      .filter(item => {
        const nomeEstacao = item.local || '';
        const dentroLocal = filtros.localizacao
          ? nomeEstacao.toLowerCase().includes(filtros.localizacao.toLowerCase())
          : true;
        const dentroAQI = item.aqi >= filtros.faixaAQI[0] && item.aqi <= filtros.faixaAQI[1];
        const dentroPoluente = filtros.poluente ? item.dominante === filtros.poluente : true;
        return dentroLocal && dentroAQI && dentroPoluente;
      })
      .map(item => ({
        name: item.local, // Adiciona o nome do local
        value: [item.lng, item.lat, item.aqi],
        aqi: item.aqi // Mantém o AQI separado para facilitar o acesso
      }));

    setOpcoes({
      geo: {
        map: 'world',
        roam: true,
        center: [0, 20],
        zoom: 1,
        scaleLimit: {
          min: 1,
          max: 6
        },
        label: { emphasis: { show: false } },
        itemStyle: {
          normal: { areaColor: '#323c48', borderColor: '#888' },
          emphasis: { areaColor: '#2a333d' }
        },
        animationDurationUpdate: 1000
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          if (params.seriesType === 'heatmap') {
            return `
              <strong>Local:</strong> ${params.data.name}<br/>
              <strong>AQI:</strong> ${params.data.aqi}<br/>
              <strong>Coordenadas:</strong> ${params.data.value[0].toFixed(2)}, ${params.data.value[1].toFixed(2)}
            `;
          }
          return '';
        }
      },
      visualMap: {
        min: 0,
        max: 500,
        calculable: true,
        inRange: {
          color: ['#92b833', '#EEDD78', '#d0a078', '#FC8452']
        },
        textStyle: { color: '#fff' }
      },
      series: [{
        type: 'heatmap',
        coordinateSystem: 'geo',
        data: dadosFiltrados,
        pointSize: 10,
        blurSize: 15,
        triggerEvent: true,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          show: true,
          formatter: (params: any) => {
            // Mostra apenas o AQI no mapa, mas pode ser personalizado
            return params.data.aqi;
          },
          color: '#fff',
          fontSize: 12,
          position: 'right'
        }
      }]
    });
  }, [dadosAr, filtros]);

  const onChartClick = (params: any) => {
    if (params.componentType === 'series' && params.seriesType === 'heatmap' && params.data) {
      const [lng, lat] = params.data.value;
      const targetZoom = 4;
      setOpcoes((prev: any) => ({
        ...prev,
        geo: {
          ...prev.geo,
          center: [lng, lat],
          zoom: targetZoom,
          animationDurationUpdate: 1000
        }
      }));
    }
  };

  const onEvents = {
    'click': onChartClick
  };

  return <ReactECharts option={opcoes} style={{ height: '100vh', width: '100%' }} onEvents={onEvents} />;
};

export default Heatmap;