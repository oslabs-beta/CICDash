import React, { useState, useEffect } from 'react';
import axios from 'axios';

const tempData = [
  {
    id: 22154564535,
    run_id: 8105751017,
    workflow_name: 'CI',
    head_branch: 'main',
    run_url:
      'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8105751017',
    run_attempt: 1,
    node_id: 'CR_kwDOLZiWUc8AAAAFKIPTtw',
    head_sha: 'b4f795fb582bfc95a32f8c391e6ea787561f69c8',
    url: 'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/jobs/22154564535',
    html_url:
      'https://github.com/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8105751017/job/22154564535',
    status: 'completed',
    conclusion: 'success',
    created_at: '2024-03-01T02:38:24Z',
    started_at: '2024-03-01T02:38:31Z',
    completed_at: '2024-03-01T02:39:23Z',
    name: 'build',
    steps: [
      {
        name: 'Set up job',
        status: 'completed',
        conclusion: 'success',
        number: 1,
        started_at: '2024-02-29T21:38:31.000-05:00',
        completed_at: '2024-02-29T21:38:31.000-05:00',
      },
      {
        name: 'Run actions/checkout@v4.1.1',
        status: 'completed',
        conclusion: 'success',
        number: 2,
        started_at: '2024-02-29T21:38:31.000-05:00',
        completed_at: '2024-02-29T21:38:32.000-05:00',
      },
      {
        name: 'Setup Node.js environment',
        status: 'completed',
        conclusion: 'success',
        number: 3,
        started_at: '2024-02-29T21:38:33.000-05:00',
        completed_at: '2024-02-29T21:38:33.000-05:00',
      },
      {
        name: 'Install Dependencies, Run Build, Run Unit Tests',
        status: 'completed',
        conclusion: 'success',
        number: 4,
        started_at: '2024-02-29T21:38:34.000-05:00',
        completed_at: '2024-02-29T21:39:21.000-05:00',
      },
      {
        name: 'Upload Test Data',
        status: 'completed',
        conclusion: 'success',
        number: 5,
        started_at: '2024-02-29T21:39:21.000-05:00',
        completed_at: '2024-02-29T21:39:21.000-05:00',
      },
      {
        name: 'Post Setup Node.js environment',
        status: 'completed',
        conclusion: 'success',
        number: 9,
        started_at: '2024-02-29T21:39:23.000-05:00',
        completed_at: '2024-02-29T21:39:23.000-05:00',
      },
      {
        name: 'Post Run actions/checkout@v4.1.1',
        status: 'completed',
        conclusion: 'success',
        number: 10,
        started_at: '2024-02-29T21:39:23.000-05:00',
        completed_at: '2024-02-29T21:39:23.000-05:00',
      },
      {
        name: 'Complete job',
        status: 'completed',
        conclusion: 'success',
        number: 11,
        started_at: '2024-02-29T21:39:21.000-05:00',
        completed_at: '2024-02-29T21:39:21.000-05:00',
      },
    ],
    check_run_url:
      'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/check-runs/22154564535',
    labels: ['ubuntu-latest'],
    runner_id: 3,
    runner_name: 'GitHub Actions 3',
    runner_group_id: 2,
    runner_group_name: 'GitHub Actions',
  },
];

function displayKeyValuePairs(obj) {
    return (
        <ul>
            {Object.keys(obj).map((key) => (
                <li key={key}>
                    <strong>{key}: </strong>
                    {Array.isArray(obj[key]) || typeof obj[key] === 'object'
                        ? displayKeyValuePairs(obj[key])
                        : obj[key]}
                </li>
            ))}
        </ul>
    );
}






const Mvpmetrics = () => {
  // const [metrics, setMetrics] = useState(['Loading Metrics...']);
  //   useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/api/getmetrics');
  //       setMetrics(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // return (
  //   <div className='flex-container'>
  //     <p>{{Object.keys(yourObject).map(function(key) { return <div>Key: {key}, Value: {yourObject[key]}</div>; })}}</p>
  //   </div>
  // );



return (
        <div>
            {tempData.map((item, index) => (
                <div key={index}>
                    <h2>Item {index + 1}</h2>
                    {displayKeyValuePairs(item)}
                </div>
            ))}
        </div>
    );


};

export default Mvpmetrics;
