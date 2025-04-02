# Mapa de Calor com
Qualidade do Ar
Aplicação web interativa para monitoramento da qualidade do ar, usando dados geoespaciais em formato de heatmap.

# Descrição
Visualizador de qualidade do ar que:

- Exibe dados de poluentes (PM2.5, CO, O₃) em formato de heatmap georreferenciado.
- Integra com APIs de qualidade do ar.
- Permite filtros por tipo de poluente, indice de poluição e localização.
- Desenvolvido com React + TypeScript e a biblioteca ECharts (heatmap-bmap).
- Suporte a múltiplos idiomas

  ![image](https://github.com/user-attachments/assets/c7e0a072-6831-47f0-90b7-2c2e1f86c359)

# Instalação e Execução 

## 1. Clone o repositório
git clone https://github.com/willianHAS/MapaQualidadeAr.git

## 2. Instale as dependências
- npm install react react-dom @types/react @types/react-dom
- npm install react-scripts --save
- npm install axios
- npm install

## 3. Inicie a aplicação
npm start

# Bibliotecas Principais

ECharts com BMap: Para renderização de heatmaps em mapas

```import * as echarts from 'echarts';```


