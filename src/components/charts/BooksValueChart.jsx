import { useEffect } from 'react';
import Chart from 'chart.js/auto';

const BooksValuesBarLineChart = ({ books, averageValue }) => {
  useEffect(() => {
    const data = {
      labels: books.map((book) => book.name),
      datasets: [
        {
          type: 'line',
          label: 'Average Value',
          data: Array(books.length).fill(averageValue),
          borderColor: '#82ca9d',
          fill: false,
        },
        {
          label: 'Value',
          data: books.map((book) => +book.value),
          backgroundColor: '#574ef8',
          barPercentage: 0.5,
        },
      ],
    };

    const ctx = document.getElementById('booksValuesBarLineChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        scales: {
          y: {
            grid: {
              display: false,
            },
            beginAtZero: true,
          },
          x: {
            ticks: {
              display: window.innerWidth > 576 ? true : false,
            },
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }, [books, averageValue]);

  return <canvas id="booksValuesBarLineChart"></canvas>;
};

export default BooksValuesBarLineChart;
