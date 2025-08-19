import React, { useEffect, useState } from "react";
import './index.css';
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function App() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart", {
      params: { vs_currency: "inr", days: "7" }
    }).then(res => {
      setPrices(res.data.prices.map(p => ({ x: new Date(p[0]), y: p[1] })));
    });
  }, []);

  const data = {
    labels: prices.map(p => p.x.toLocaleDateString()),
    datasets: [
      {
        label: "Bitcoin Price (USD)",
        data: prices.map(p => p.y),
        fill: false,
        borderColor: "blue"
      }
    ]
  };

  return (
    <div className="main-container">
      <h1 className="heading">Data Visualization Dashboard</h1>
      <Line data={data} className="line"/>
    </div>
  );
}

export default App;
