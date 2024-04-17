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

const tempData = [
  {
    _id: '661f368ae3d085fb89fa51b5',
    username: 'heyitsrusss',
    refresh_token: '',
    runs: [
      {
        repo_owner: 'ptri-13-cat-snake',
        repo: 'unit-12-testing-gha',
        run_id: 8309250480,
        workflow_name: 'CI',
        head_branch: 'main',
        run_url:
          'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8309250480',
        run_attempt: 1,
        node_id: 'CR_kwDOLZiWUc8AAAAFS28KQg',
        head_sha: '8b5f1077ade5961a8280c10bd6b953c60f991749',
        url: 'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/jobs/22740404802',
        html_url:
          'https://github.com/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8309250480/job/22740404802',
        status: 'completed',
        conclusion: 'success',
        created_at: '2024-03-16T17:07:01.000Z',
        started_at: '2024-03-16T17:07:08.000Z',
        completed_at: '2024-03-16T17:08:07.000Z',
        job_completion_time_ms: 59000,
        name: 'build',
        steps: [
          {
            name: 'Set up job',
            status: 'completed',
            conclusion: 'success',
            number: 1,
            started_at: '2024-03-16T10:07:07.000-07:00',
            completed_at: '2024-03-16T10:07:08.000-07:00',
            step_completion_time: 1000,
          },
          {
            name: 'Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 2,
            started_at: '2024-03-16T10:07:08.000-07:00',
            completed_at: '2024-03-16T10:07:11.000-07:00',
            step_completion_time: 3000,
          },
          {
            name: 'Setup Node.js environment',
            status: 'completed',
            conclusion: 'success',
            number: 3,
            started_at: '2024-03-16T10:07:12.000-07:00',
            completed_at: '2024-03-16T10:07:13.000-07:00',
            step_completion_time: 1000,
          },
          {
            name: 'Install Dependencies, Run Build, Run Unit Tests',
            status: 'completed',
            conclusion: 'success',
            number: 4,
            started_at: '2024-03-16T10:07:14.000-07:00',
            completed_at: '2024-03-16T10:08:06.000-07:00',
            step_completion_time: 52000,
          },
          {
            name: 'Upload Test Data',
            status: 'completed',
            conclusion: 'success',
            number: 5,
            started_at: '2024-03-16T10:08:06.000-07:00',
            completed_at: '2024-03-16T10:08:06.000-07:00',
            step_completion_time: 0,
          },
          {
            name: 'Post Setup Node.js environment',
            status: 'completed',
            conclusion: 'success',
            number: 9,
            started_at: '2024-03-16T10:08:06.000-07:00',
            completed_at: '2024-03-16T10:08:06.000-07:00',
            step_completion_time: 0,
          },
          {
            name: 'Post Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 10,
            started_at: '2024-03-16T10:08:06.000-07:00',
            completed_at: '2024-03-16T10:08:06.000-07:00',
            step_completion_time: 0,
          },
          {
            name: 'Complete job',
            status: 'completed',
            conclusion: 'success',
            number: 11,
            started_at: '2024-03-16T10:08:06.000-07:00',
            completed_at: '2024-03-16T10:08:06.000-07:00',
            step_completion_time: 0,
          },
        ],
        check_run_url:
          'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/check-runs/22740404802',
        labels: ['ubuntu-latest'],
        runner_id: 4,
        runner_name: 'GitHub Actions 4',
        runner_group_id: 2,
        runner_group_name: 'GitHub Actions',
        _id: '661f3b650bf93475a98dd82a',
      },
      {
        repo_owner: 'ptri-13-cat-snake',
        repo: 'unit-12-testing-gha',
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
        created_at: '2024-03-01T02:38:24.000Z',
        started_at: '2024-03-01T02:38:31.000Z',
        completed_at: '2024-03-01T02:39:23.000Z',
        job_completion_time_ms: 52000,
        name: 'build',
        steps: [
          {
            name: 'Set up job',
            status: 'completed',
            conclusion: 'success',
            number: 1,
            started_at: '2024-02-29T18:38:31.000-08:00',
            completed_at: '2024-02-29T18:38:31.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 2,
            started_at: '2024-02-29T18:38:31.000-08:00',
            completed_at: '2024-02-29T18:38:32.000-08:00',
            step_completion_time: 1000,
          },
          {
            name: 'Setup Node.js environment',
            status: 'completed',
            conclusion: 'success',
            number: 3,
            started_at: '2024-02-29T18:38:33.000-08:00',
            completed_at: '2024-02-29T18:38:33.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Install Dependencies, Run Build, Run Unit Tests',
            status: 'completed',
            conclusion: 'success',
            number: 4,
            started_at: '2024-02-29T18:38:34.000-08:00',
            completed_at: '2024-02-29T18:39:21.000-08:00',
            step_completion_time: 47000,
          },
          {
            name: 'Upload Test Data',
            status: 'completed',
            conclusion: 'success',
            number: 5,
            started_at: '2024-02-29T18:39:21.000-08:00',
            completed_at: '2024-02-29T18:39:21.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Post Setup Node.js environment',
            status: 'completed',
            conclusion: 'success',
            number: 9,
            started_at: '2024-02-29T18:39:23.000-08:00',
            completed_at: '2024-02-29T18:39:23.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Post Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 10,
            started_at: '2024-02-29T18:39:23.000-08:00',
            completed_at: '2024-02-29T18:39:23.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Complete job',
            status: 'completed',
            conclusion: 'success',
            number: 11,
            started_at: '2024-02-29T18:39:21.000-08:00',
            completed_at: '2024-02-29T18:39:21.000-08:00',
            step_completion_time: 0,
          },
        ],
        check_run_url:
          'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/check-runs/22154564535',
        labels: ['ubuntu-latest'],
        runner_id: 3,
        runner_name: 'GitHub Actions 3',
        runner_group_id: 2,
        runner_group_name: 'GitHub Actions',
        _id: '661f3b650bf93475a98dd82b',
      },
      {
        repo_owner: 'ptri-13-cat-snake',
        repo: 'unit-12-testing-gha',
        run_id: 8105698111,
        workflow_name: 'CI',
        head_branch: 'main',
        run_url:
          'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8105698111',
        run_attempt: 1,
        node_id: 'CR_kwDOLZiWUc8AAAAFKIHKZw',
        head_sha: 'd8ba46b1c2252d6fc22f6b995540d37ecfbfc29b',
        url: 'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/jobs/22154431079',
        html_url:
          'https://github.com/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8105698111/job/22154431079',
        status: 'completed',
        conclusion: 'success',
        created_at: '2024-03-01T02:32:13.000Z',
        started_at: '2024-03-01T02:32:19.000Z',
        completed_at: '2024-03-01T02:33:23.000Z',
        job_completion_time_ms: 64000,
        name: 'build',
        steps: [
          {
            name: 'Set up job',
            status: 'completed',
            conclusion: 'success',
            number: 1,
            started_at: '2024-02-29T18:32:19.000-08:00',
            completed_at: '2024-02-29T18:32:19.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 2,
            started_at: '2024-02-29T18:32:19.000-08:00',
            completed_at: '2024-02-29T18:32:20.000-08:00',
            step_completion_time: 1000,
          },
          {
            name: 'Setup Node.js environment',
            status: 'completed',
            conclusion: 'success',
            number: 3,
            started_at: '2024-02-29T18:32:21.000-08:00',
            completed_at: '2024-02-29T18:32:22.000-08:00',
            step_completion_time: 1000,
          },
          {
            name: 'Install Dependencies, Run Build, Run Unit Tests',
            status: 'completed',
            conclusion: 'success',
            number: 4,
            started_at: '2024-02-29T18:32:22.000-08:00',
            completed_at: '2024-02-29T18:33:21.000-08:00',
            step_completion_time: 59000,
          },
          {
            name: 'Upload Test Data',
            status: 'completed',
            conclusion: 'success',
            number: 5,
            started_at: '2024-02-29T18:33:21.000-08:00',
            completed_at: '2024-02-29T18:33:21.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Post Setup Node.js environment',
            status: 'completed',
            conclusion: 'success',
            number: 9,
            started_at: '2024-02-29T18:33:21.000-08:00',
            completed_at: '2024-02-29T18:33:21.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Post Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 10,
            started_at: '2024-02-29T18:33:21.000-08:00',
            completed_at: '2024-02-29T18:33:21.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Complete job',
            status: 'completed',
            conclusion: 'success',
            number: 11,
            started_at: '2024-02-29T18:33:21.000-08:00',
            completed_at: '2024-02-29T18:33:21.000-08:00',
            step_completion_time: 0,
          },
        ],
        check_run_url:
          'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/check-runs/22154431079',
        labels: ['ubuntu-latest'],
        runner_id: 5,
        runner_name: 'GitHub Actions 5',
        runner_group_id: 2,
        runner_group_name: 'GitHub Actions',
        _id: '661f3b650bf93475a98dd82c',
      },
      {
        repo_owner: 'ptri-13-cat-snake',
        repo: 'unit-12-testing-gha',
        run_id: 8105578958,
        workflow_name: 'CI',
        head_branch: 'main',
        run_url:
          'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8105578958',
        run_attempt: 1,
        node_id: 'CR_kwDOLZiWUc8AAAAFKHz6LQ',
        head_sha: '3afb3ff3ddbe40aae93cda634127cabc31839905',
        url: 'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/jobs/22154115629',
        html_url:
          'https://github.com/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8105578958/job/22154115629',
        status: 'completed',
        conclusion: 'success',
        created_at: '2024-03-01T02:18:33.000Z',
        started_at: '2024-03-01T02:18:40.000Z',
        completed_at: '2024-03-01T02:19:45.000Z',
        job_completion_time_ms: 65000,
        name: 'build',
        steps: [
          {
            name: 'Set up job',
            status: 'completed',
            conclusion: 'success',
            number: 1,
            started_at: '2024-02-29T18:18:39.000-08:00',
            completed_at: '2024-02-29T18:18:40.000-08:00',
            step_completion_time: 1000,
          },
          {
            name: 'Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 2,
            started_at: '2024-02-29T18:18:40.000-08:00',
            completed_at: '2024-02-29T18:18:41.000-08:00',
            step_completion_time: 1000,
          },
          {
            name: 'Setup Node.js environment',
            status: 'completed',
            conclusion: 'success',
            number: 3,
            started_at: '2024-02-29T18:18:42.000-08:00',
            completed_at: '2024-02-29T18:18:45.000-08:00',
            step_completion_time: 3000,
          },
          {
            name: 'Install Dependencies, Run Build, Run Unit Tests',
            status: 'completed',
            conclusion: 'success',
            number: 4,
            started_at: '2024-02-29T18:18:46.000-08:00',
            completed_at: '2024-02-29T18:19:44.000-08:00',
            step_completion_time: 58000,
          },
          {
            name: 'Post Setup Node.js environment',
            status: 'completed',
            conclusion: 'success',
            number: 7,
            started_at: '2024-02-29T18:19:44.000-08:00',
            completed_at: '2024-02-29T18:19:44.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Post Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 8,
            started_at: '2024-02-29T18:19:44.000-08:00',
            completed_at: '2024-02-29T18:19:44.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Complete job',
            status: 'completed',
            conclusion: 'success',
            number: 9,
            started_at: '2024-02-29T18:19:44.000-08:00',
            completed_at: '2024-02-29T18:19:44.000-08:00',
            step_completion_time: 0,
          },
        ],
        check_run_url:
          'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/check-runs/22154115629',
        labels: ['ubuntu-latest'],
        runner_id: 5,
        runner_name: 'GitHub Actions 5',
        runner_group_id: 2,
        runner_group_name: 'GitHub Actions',
        _id: '661f3b650bf93475a98dd82d',
      },
      {
        repo_owner: 'ptri-13-cat-snake',
        repo: 'unit-12-testing-gha',
        run_id: 8105394985,
        workflow_name: 'CI',
        head_branch: 'main',
        run_url:
          'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8105394985',
        run_attempt: 1,
        node_id: 'CR_kwDOLZiWUc8AAAAFKHXoZQ',
        head_sha: '10f6e24aff1b2649607b4d6622da666d132deec3',
        url: 'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/jobs/22153652325',
        html_url:
          'https://github.com/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8105394985/job/22153652325',
        status: 'completed',
        conclusion: 'success',
        created_at: '2024-03-01T01:58:31.000Z',
        started_at: '2024-03-01T01:58:38.000Z',
        completed_at: '2024-03-01T01:59:45.000Z',
        job_completion_time_ms: 67000,
        name: 'build',
        steps: [
          {
            name: 'Set up job',
            status: 'completed',
            conclusion: 'success',
            number: 1,
            started_at: '2024-02-29T17:58:38.000-08:00',
            completed_at: '2024-02-29T17:58:39.000-08:00',
            step_completion_time: 1000,
          },
          {
            name: 'Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 2,
            started_at: '2024-02-29T17:58:39.000-08:00',
            completed_at: '2024-02-29T17:58:40.000-08:00',
            step_completion_time: 1000,
          },
          {
            name: 'Setup Node.js environment',
            status: 'completed',
            conclusion: 'success',
            number: 3,
            started_at: '2024-02-29T17:58:42.000-08:00',
            completed_at: '2024-02-29T17:58:42.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Install Dependencies, Run Build, Run Unit Tests',
            status: 'completed',
            conclusion: 'success',
            number: 4,
            started_at: '2024-02-29T17:58:42.000-08:00',
            completed_at: '2024-02-29T17:59:41.000-08:00',
            step_completion_time: 59000,
          },
          {
            name: 'Post Setup Node.js environment',
            status: 'completed',
            conclusion: 'success',
            number: 7,
            started_at: '2024-02-29T17:59:42.000-08:00',
            completed_at: '2024-02-29T17:59:42.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Post Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 8,
            started_at: '2024-02-29T17:59:42.000-08:00',
            completed_at: '2024-02-29T17:59:42.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Complete job',
            status: 'completed',
            conclusion: 'success',
            number: 9,
            started_at: '2024-02-29T17:59:42.000-08:00',
            completed_at: '2024-02-29T17:59:42.000-08:00',
            step_completion_time: 0,
          },
        ],
        check_run_url:
          'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/check-runs/22153652325',
        labels: ['ubuntu-latest'],
        runner_id: 1,
        runner_name: 'GitHub Actions 1',
        runner_group_id: 2,
        runner_group_name: 'GitHub Actions',
        _id: '661f3b650bf93475a98dd82e',
      },
      {
        repo_owner: 'ptri-13-cat-snake',
        repo: 'unit-12-testing-gha',
        run_id: 8105294721,
        workflow_name: 'CI',
        head_branch: 'main',
        run_url:
          'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8105294721',
        run_attempt: 1,
        node_id: 'CR_kwDOLZiWUc8AAAAFKHISZw',
        head_sha: '092944e605fa89722004a84fbbc641ca16b73700',
        url: 'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/jobs/22153400935',
        html_url:
          'https://github.com/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8105294721/job/22153400935',
        status: 'completed',
        conclusion: 'failure',
        created_at: '2024-03-01T01:47:12.000Z',
        started_at: '2024-03-01T01:47:18.000Z',
        completed_at: '2024-03-01T01:48:06.000Z',
        job_completion_time_ms: 48000,
        name: 'build',
        steps: [
          {
            name: 'Set up job',
            status: 'completed',
            conclusion: 'success',
            number: 1,
            started_at: '2024-02-29T17:47:17.000-08:00',
            completed_at: '2024-02-29T17:47:18.000-08:00',
            step_completion_time: 1000,
          },
          {
            name: 'Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 2,
            started_at: '2024-02-29T17:47:18.000-08:00',
            completed_at: '2024-02-29T17:47:19.000-08:00',
            step_completion_time: 1000,
          },
          {
            name: 'Setup Node.js environment',
            status: 'completed',
            conclusion: 'success',
            number: 3,
            started_at: '2024-02-29T17:47:19.000-08:00',
            completed_at: '2024-02-29T17:47:19.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Install Dependencies, Run Build, Run Unit Tests',
            status: 'completed',
            conclusion: 'failure',
            number: 4,
            started_at: '2024-02-29T17:47:20.000-08:00',
            completed_at: '2024-02-29T17:48:05.000-08:00',
            step_completion_time: 45000,
          },
          {
            name: 'Post Setup Node.js environment',
            status: 'completed',
            conclusion: 'skipped',
            number: 7,
            started_at: '2024-02-29T17:48:06.000-08:00',
            completed_at: '2024-02-29T17:48:06.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Post Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 8,
            started_at: '2024-02-29T17:48:06.000-08:00',
            completed_at: '2024-02-29T17:48:06.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Complete job',
            status: 'completed',
            conclusion: 'success',
            number: 9,
            started_at: '2024-02-29T17:48:05.000-08:00',
            completed_at: '2024-02-29T17:48:05.000-08:00',
            step_completion_time: 0,
          },
        ],
        check_run_url:
          'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/check-runs/22153400935',
        labels: ['ubuntu-latest'],
        runner_id: 1,
        runner_name: 'GitHub Actions 1',
        runner_group_id: 2,
        runner_group_name: 'GitHub Actions',
        _id: '661f3b650bf93475a98dd82f',
      },
      {
        repo_owner: 'ptri-13-cat-snake',
        repo: 'unit-12-testing-gha',
        run_id: 8090773777,
        workflow_name: 'CI',
        head_branch: 'main',
        run_url:
          'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8090773777',
        run_attempt: 1,
        node_id: 'CR_kwDOLZiWUc8AAAAFJclTZA',
        head_sha: 'ef1f20c159a57e7ac356b046d9d4415068a1b0e4',
        url: 'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/jobs/22108787556',
        html_url:
          'https://github.com/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8090773777/job/22108787556',
        status: 'completed',
        conclusion: 'failure',
        created_at: '2024-02-29T03:54:34.000Z',
        started_at: '2024-02-29T03:54:41.000Z',
        completed_at: '2024-02-29T03:55:40.000Z',
        job_completion_time_ms: 59000,
        name: 'build',
        steps: [
          {
            name: 'Set up job',
            status: 'completed',
            conclusion: 'success',
            number: 1,
            started_at: '2024-02-28T19:54:40.000-08:00',
            completed_at: '2024-02-28T19:54:41.000-08:00',
            step_completion_time: 1000,
          },
          {
            name: 'Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 2,
            started_at: '2024-02-28T19:54:41.000-08:00',
            completed_at: '2024-02-28T19:54:42.000-08:00',
            step_completion_time: 1000,
          },
          {
            name: 'Setup Node.js environment',
            status: 'completed',
            conclusion: 'success',
            number: 3,
            started_at: '2024-02-28T19:54:42.000-08:00',
            completed_at: '2024-02-28T19:54:43.000-08:00',
            step_completion_time: 1000,
          },
          {
            name: 'Install Dependencies, Run Build, Run Unit Tests',
            status: 'completed',
            conclusion: 'failure',
            number: 4,
            started_at: '2024-02-28T19:54:43.000-08:00',
            completed_at: '2024-02-28T19:55:38.000-08:00',
            step_completion_time: 55000,
          },
          {
            name: 'Post Setup Node.js environment',
            status: 'completed',
            conclusion: 'skipped',
            number: 7,
            started_at: '2024-02-28T19:55:40.000-08:00',
            completed_at: '2024-02-28T19:55:40.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Post Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 8,
            started_at: '2024-02-28T19:55:40.000-08:00',
            completed_at: '2024-02-28T19:55:40.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Complete job',
            status: 'completed',
            conclusion: 'success',
            number: 9,
            started_at: '2024-02-28T19:55:38.000-08:00',
            completed_at: '2024-02-28T19:55:38.000-08:00',
            step_completion_time: 0,
          },
        ],
        check_run_url:
          'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/check-runs/22108787556',
        labels: ['ubuntu-latest'],
        runner_id: 3,
        runner_name: 'GitHub Actions 3',
        runner_group_id: 2,
        runner_group_name: 'GitHub Actions',
        _id: '661f3b650bf93475a98dd830',
      },
      {
        repo_owner: 'ptri-13-cat-snake',
        repo: 'unit-12-testing-gha',
        run_id: 8090705978,
        workflow_name: 'CI',
        head_branch: 'main',
        run_url:
          'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8090705978',
        run_attempt: 1,
        node_id: 'CR_kwDOLZiWUc8AAAAFJcaQ1w',
        head_sha: '5b2276509765c17345619acb34f0b1b85fa54ae1',
        url: 'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/jobs/22108606679',
        html_url:
          'https://github.com/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8090705978/job/22108606679',
        status: 'completed',
        conclusion: 'failure',
        created_at: '2024-02-29T03:43:22.000Z',
        started_at: '2024-02-29T03:43:28.000Z',
        completed_at: '2024-02-29T03:44:25.000Z',
        job_completion_time_ms: 57000,
        name: 'build',
        steps: [
          {
            name: 'Set up job',
            status: 'completed',
            conclusion: 'success',
            number: 1,
            started_at: '2024-02-28T19:43:28.000-08:00',
            completed_at: '2024-02-28T19:43:28.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 2,
            started_at: '2024-02-28T19:43:28.000-08:00',
            completed_at: '2024-02-28T19:43:29.000-08:00',
            step_completion_time: 1000,
          },
          {
            name: 'Setup Node.js environment',
            status: 'completed',
            conclusion: 'success',
            number: 3,
            started_at: '2024-02-28T19:43:30.000-08:00',
            completed_at: '2024-02-28T19:43:30.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Install Dependencies, Run Build, Run Unit Tests',
            status: 'completed',
            conclusion: 'failure',
            number: 4,
            started_at: '2024-02-28T19:43:30.000-08:00',
            completed_at: '2024-02-28T19:44:23.000-08:00',
            step_completion_time: 53000,
          },
          {
            name: 'Post Setup Node.js environment',
            status: 'completed',
            conclusion: 'skipped',
            number: 7,
            started_at: '2024-02-28T19:44:24.000-08:00',
            completed_at: '2024-02-28T19:44:24.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Post Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 8,
            started_at: '2024-02-28T19:44:24.000-08:00',
            completed_at: '2024-02-28T19:44:24.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Complete job',
            status: 'completed',
            conclusion: 'success',
            number: 9,
            started_at: '2024-02-28T19:44:24.000-08:00',
            completed_at: '2024-02-28T19:44:24.000-08:00',
            step_completion_time: 0,
          },
        ],
        check_run_url:
          'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/check-runs/22108606679',
        labels: ['ubuntu-latest'],
        runner_id: 3,
        runner_name: 'GitHub Actions 3',
        runner_group_id: 2,
        runner_group_name: 'GitHub Actions',
        _id: '661f3b650bf93475a98dd831',
      },
      {
        repo_owner: 'ptri-13-cat-snake',
        repo: 'unit-12-testing-gha',
        run_id: 8090661246,
        workflow_name: 'CI',
        head_branch: 'main',
        run_url:
          'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8090661246',
        run_attempt: 1,
        node_id: 'CR_kwDOLZiWUc8AAAAFJcTeNw',
        head_sha: '7918171fb28c657c14aa5ece7df7822f99301722',
        url: 'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/actions/jobs/22108495415',
        html_url:
          'https://github.com/ptri-13-cat-snake/unit-12-testing-gha/actions/runs/8090661246/job/22108495415',
        status: 'completed',
        conclusion: 'cancelled',
        created_at: '2024-02-29T03:36:31.000Z',
        started_at: '2024-02-29T03:36:38.000Z',
        completed_at: '2024-02-29T03:41:30.000Z',
        job_completion_time_ms: 292000,
        name: 'build',
        steps: [
          {
            name: 'Set up job',
            status: 'completed',
            conclusion: 'success',
            number: 1,
            started_at: '2024-02-28T19:36:37.000-08:00',
            completed_at: '2024-02-28T19:36:38.000-08:00',
            step_completion_time: 1000,
          },
          {
            name: 'Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 2,
            started_at: '2024-02-28T19:36:38.000-08:00',
            completed_at: '2024-02-28T19:36:39.000-08:00',
            step_completion_time: 1000,
          },
          {
            name: 'Setup Node.js environment',
            status: 'completed',
            conclusion: 'success',
            number: 3,
            started_at: '2024-02-28T19:36:40.000-08:00',
            completed_at: '2024-02-28T19:36:41.000-08:00',
            step_completion_time: 1000,
          },
          {
            name: 'Install Dependencies, Run Build, Run Unit Tests',
            status: 'completed',
            conclusion: 'cancelled',
            number: 4,
            started_at: '2024-02-28T19:36:41.000-08:00',
            completed_at: '2024-02-28T19:41:28.000-08:00',
            step_completion_time: 287000,
          },
          {
            name: 'Post Setup Node.js environment',
            status: 'completed',
            conclusion: 'skipped',
            number: 7,
            started_at: '2024-02-28T19:41:28.000-08:00',
            completed_at: '2024-02-28T19:41:28.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Post Run actions/checkout@v4.1.1',
            status: 'completed',
            conclusion: 'success',
            number: 8,
            started_at: '2024-02-28T19:41:28.000-08:00',
            completed_at: '2024-02-28T19:41:28.000-08:00',
            step_completion_time: 0,
          },
          {
            name: 'Complete job',
            status: 'completed',
            conclusion: 'success',
            number: 9,
            started_at: '2024-02-28T19:41:28.000-08:00',
            completed_at: '2024-02-28T19:41:28.000-08:00',
            step_completion_time: 0,
          },
        ],
        check_run_url:
          'https://api.github.com/repos/ptri-13-cat-snake/unit-12-testing-gha/check-runs/22108495415',
        labels: ['ubuntu-latest'],
        runner_id: 5,
        runner_name: 'GitHub Actions 5',
        runner_group_id: 2,
        runner_group_name: 'GitHub Actions',
        _id: '661f3b650bf93475a98dd832',
      },
    ],
    __v: 0,
  },
];


const labels = [
  "January '23",
  "February '23",
  "March '23",
  "April '23",
  "May '23",
  "June '23",
  "July '23",
]; //months


// Example ISO 8601 date string
const isoDateString = "2024-03-16T17:07:01.000+00:00";

// Parse the ISO 8601 date string
// const date = new Date(isoDateString);

// Get the month and year components
// const month = date.toLocaleString('default', { month: 'long' }); // Get month name
// const year = date.getFullYear(); // Get the full year

// Format the result
// const monthYearFormat = `${month} ${year}`;

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
  const [metrics, setMetrics] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching runs from db ...');
      try {
        const findJobs = await axios.get('http://localhost:3000/api/github/findRuns', {
          withCredentials: true,
        });
        console.log('findJobs:', findJobs.data[0].runs);
        setMetrics(findJobs.data[0].runs);
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
      </div>
    </>
  );
};

export default Mvpmetrics;
