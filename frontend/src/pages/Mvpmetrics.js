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
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import faker from 'faker'; //this is for mock data
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
);
import colorLib from '@kurkle/color';

//Reads shapedMetrics for conversion to chartData for ChartJS display
const genChartData = (arr) => {
  arr.forEach(el => {
    chartData.labels.push(el.label);
    chartData.success.push(el.success);
    chartData.failure.push(el.failure);
    chartData.pieData[0] += el.failure;
    chartData.pieData[1] += el.success;
    chartData.horizBarData.push(calcAvg(el.runTimes) - shapedMetrics.lifetimeAvg);
    chartData.straightLine.push(shapedMetrics.lifetimeAvg);
    chartData.monthAvg.push(el.monthAvg);
  });
  // test1 = chartData.horizBarData.reduce((max, num) => Math.max(max, Math.abs(num)), 0);
  // horizBarOptions.scales.x.min = -test1;
  // horizBarOptions.scales.x.min = test1;
}
//This is the data for ChartJS
const chartData = {
  labels: [],
  success: [], //[1, 2, 3, 4, 5, 6, 7]
  failure: [], //[5, 5, 5, 5, 5, 5, 5]
  pieData: [0, 0], //[12, 19] [Failure, Success]
  horizBarData: [], //[-5, 12, -13, 4, -5, 6, -7] Month avg workflow run - Lifetime avg workflow run (seconds)
  straightLine: [], //Lifetime average run line
  monthAvg: [], //Monthly average
};

//*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
//HELPER FUNCTIONS TO GENERATE METRICS

const createMonthYear = isoDate => {
  const date = new Date(isoDate);
  const month = date.toLocaleString('default', { month: 'long' }); // Get month name
  const year = date.getFullYear().toString().substr(-2); // Get the last two digits of year
  return {
    name: `${month.toLowerCase()}${year}`, //January '24
    label: `${month} '${year}`, //january24
    runTimes: [],
    monthAvg: null,
    success: 0,
    failure: 0,
    total: 0,
  };
};

const getMonthDate = isoDate => {
  const date = new Date(isoDate);
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear().toString().substr(-2);
  return `${month.toLowerCase()}${year}`; //january24
};

const timeDifSeconds = (start, end) => {
  const time1 = new Date(start);
  const time2 = new Date(end);
  return (time2.getTime() - time1.getTime()) / 1000;
};

const calcAvg = array => {
  if (array.length === 0) {
    return 0;
  }
  let sum = array.reduce((acc, val) => acc + val, 0);
  let average = sum / array.length;
  return parseFloat(average.toFixed(1));
};

//New shape of metrics after parsing response of /api/github/findRuns
const shapedMetrics = {
  lifetimeRuns: [],
  monthData: [],
  lifetimeAvg: null,
};


//CALCULATE METRICS FROM RUNS ARRAY
const reformatData = array => {
  let monthObj = {};
  const monthDataArr = []
  array.forEach(run => {
    const runMonthYear = getMonthDate(run.started_at); //'january24'
    //check to see if month already exists
    if (monthObj.name === undefined) {
      monthObj = createMonthYear(run.started_at);
    }
    const existingMonth = monthDataArr.find(month => month.name === runMonthYear);

    // If the month doesn't exist, create a new monthObj and push it to monthDataArr
    if (!existingMonth) {
      monthObj = createMonthYear(run.started_at);
      monthDataArr.push(monthObj);
    } else {
      // If the month already exists, assign the existing monthObj to monthObj
      monthObj = existingMonth;
    }
      if (run.conclusion === 'cancelled' || run.conclusion === 'failure') {
        //get success and failures
        monthObj.failure++;
        monthObj.total++;
      } else if (run.conclusion === 'success') {
        monthObj.success++;
        monthObj.total++;
      }

    //get workflow run time in seconds
    const workFlowStart = run.steps[0].started_at;
    const workFlowEnd = run.steps[run.steps.length - 1].completed_at;
    const runTime = timeDifSeconds(workFlowStart, workFlowEnd);
    monthObj.runTimes.push(runTime);
    shapedMetrics.lifetimeRuns.push(runTime);
    monthObj.monthAvg = calcAvg(monthObj.runTimes);
  });
  shapedMetrics.monthData = monthDataArr;
  shapedMetrics.lifetimeAvg = calcAvg(shapedMetrics.lifetimeRuns);
};

//*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
//CHARTJS
//options for loading ChartJS animations
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
//CHARTJS UTILS
export function transparentize(value, opacity) {
  var alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}

export const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
};

//Vertical Bar Chart
export const data = {
  labels: chartData.labels,
  datasets: [
    {
      label: 'Success',
      data: chartData.success,
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Failure',
      data: chartData.failure,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

//Pie
export const pieOptions = {
  aspectRatio: 0.5,
};
export const pieData = {
  labels: ['Failure', 'Success'],
  datasets: [
    {
      label: 'Lifetime Workflow Attempts',
      data: chartData.pieData,
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
      borderWidth: 1,
    },
  ],
};

let test1;


//Horizontal Bar Chart
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
  scales: {
    x:
      {
        min: -50,
        max: 50,
      },
  },
};
export const horizBarData = {
  labels: chartData.labels,
  datasets: [
    {
      label: '2024',
      data: chartData.horizBarData, //Month avg workflow run - Lifetime avg workflow run (seconds)
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

//Combo Bar Chart
export const comboBarOptions = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly vs Lifetime Average (seconds)',
      },
    },
  },
};

export const comboBarData = {
  labels: chartData.labels,
  datasets: [
    {
      label: 'Month',
      data: chartData.monthAvg,
      borderColor: CHART_COLORS.red,
      backgroundColor: transparentize(CHART_COLORS.red, 0.5),
      order: 0,
    },
    {
      label: 'Lifetime',
      data: chartData.straightLine,
      borderColor: CHART_COLORS.blue,
      backgroundColor: transparentize(CHART_COLORS.blue, 0.5),
      type: 'line',
      order: 1,
    },
  ],
};

const Mvpmetrics = () => {
  const [metricState, setMetricState] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching runs from db ...');
      try {
        let findJobs = await axios.get('http://localhost:3000/api/github/findRuns', {
          withCredentials: true,
        });
        console.log('findJobs:', findJobs.data[0].runs);
        reformatData(findJobs.data[0].runs.reverse());
        console.log('shapedMetrics:', shapedMetrics);
        reformatData(findJobs.data[0].runs);
        genChartData(shapedMetrics.monthData);
        console.log('chartData: ', chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

  }, []);



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
        <div className={'viz-d'}>
          <Bar options={comboBarOptions} data={comboBarData} />
        </div>
      </div>
    </>
  );
};

export default Mvpmetrics;
