import { useEffect } from 'react';
import Chart from 'chart.js/auto';

const BooksRatingBarLineChart = ({ books, averageRating }) => {
  console.log(books);
  useEffect(() => {
    const data = {
      labels: books.map((book) => book.name),
      datasets: [
        {
          type: 'line',
          label: 'Average Rating',
          data: Array(books.length).fill(averageRating),
          borderColor: '#82ca9d',
          fill: false,
        },
        {
          label: 'Rating',
          data: books.map((book) => book.rating),
          backgroundColor: '#574ef8',
          barPercentage: 0.5,
        },
      ],
    };

    const ctx = document.getElementById('booksRatingBarLineChart').getContext('2d');
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
  }, [books, averageRating]);

  return <canvas id="booksRatingBarLineChart" width="200" height="90"></canvas>;
};

export default BooksRatingBarLineChart;
