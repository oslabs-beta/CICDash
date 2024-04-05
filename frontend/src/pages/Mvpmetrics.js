import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import faker from 'faker'; //this is for mock data
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

let delayed;
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Total Workflow Runs',
    },
  },
  animation: {
    onComplete: () => {
      delayed = true;
    },
    delay: context => {
      let delay = 0;
      if (context.type === 'data' && context.mode === 'default' && !delayed) {
        delay = context.dataIndex * 300 + context.datasetIndex * 100;
      }
      return delay;
    },
  },
};

const labels = [
  "January '23",
  "February '23",
  "March '23",
  "April '23",
  "May '23",
  "June '23",
  "July '23",
]; //months

//Vertical Bar Chart
export const data = {
  labels,
  datasets: [
    {
      label: 'Success',
      data: [1, 2, 3, 4, 5, 6, 7],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Failure',
      data: [5, 5, 5, 5, 5, 5, 5],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

//Pie
export const pieData = {
  labels: ['Failure', 'Success'],
  datasets: [
    {
      label: 'Lifetime Workflow Attempts',
      data: [12, 19],
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
      borderWidth: 1,
    },
  ],
};

export const pieOptions = {
  aspectRatio: 0.5,
};

//Horizontal Bar Options
export const horizBarOptions = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Monthly Run Time vs Lifetime Average Run Time (seconds)',
    },
  },
};

//Horizontal Bar Data
export const horizBarData = {
  labels,
  datasets: [
    {
      label: '2024',
      data: [-5, 12, -13, 4, -5, 6, -7], //Month avg workflow run - Lifetime avg workflow run (seconds)
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const Mvpmetrics = () => {
  return (
    <>
      <div className={'grid-container'}>
        <div className={'viz-a'}>
          <Bar options={options} data={data} />
        </div>
        <div className={'viz-b'}>
          <Pie data={pieData} />
        </div>
        <div className={'viz-c'}>
          <Bar options={horizBarOptions} data={horizBarData} />
        </div>
      </div>
    </>
  );
};

export default Mvpmetrics;
