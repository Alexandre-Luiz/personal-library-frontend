import { useEffect } from 'react';
import Chart from 'chart.js/auto';

// Chart books read and not read
const BooksReadDoughnutChart = ({ totalBooksRead, totalBooks }) => {
  useEffect(() => {
    const data = {
      labels: ['Books Read', 'Books Not Read'],
      datasets: [
        {
          data: [totalBooksRead, totalBooks - totalBooksRead],
          backgroundColor: ['#aaf7ad', '#f18787'],
        },
      ],
    };

    const ctx = document.getElementById('booksReadDoughnutChart').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: data,
    });
  }, [totalBooksRead, totalBooks]);

  return <canvas id="booksReadDoughnutChart"></canvas>;
};

export default BooksReadDoughnutChart;
