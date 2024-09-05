import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './BarChart.css';

function BarChart({ yValues }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const xValues = ["Party 1", "Party 2", "Party 3"];
    const barColors = ["red", "green", "blue"];

    const ctx = document.getElementById('myChart');
    if (ctx) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        }
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [yValues]);

  return (
    <div className="bar-chart-container">
      <canvas id="myChart" className="bar-chart"></canvas>
    </div>
  );
}

export default BarChart;
