import React from 'react';
import { Link } from 'react-router-dom';

import logo from '/frontend/assets/cicdeez_logo_h.png';
import metricsGif from '/frontend/assets/metrics.gif';
import ghaLogo from '/frontend/assets/gha_logo.jpg';
import chartjsLogo from '/frontend/assets/chartjs_logo.jpg';
import cicdeezLogoV from '/frontend/assets/cicdeez_logo_v.png';
import '/frontend/src/stylesheet.css';

const teamMembers = [
  {
    name: 'Arthur Cheung',
    pictureUrl: '/frontend/assets/cicdeez_logo_v.png',
    linkedInUrl: 'https://www.linkedin.com/in/arthurtcheung/',
  },
  {
    name: 'Russ Apolonio',
    pictureUrl: '/frontend/assets/john_doe.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/russellapolonio/',
  },
  {
    name: 'Jason Kuroda',
    pictureUrl: '/frontend/assets/john_doe.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/jasonkuroda/',
  },
  {
    name: 'Garrett Zeal',
    pictureUrl: '/frontend/assets/john_doe.jpg',
    linkedInUrl: 'https://www.linkedin.com/in/garrettzeal/',
  },
];

const Home = () => {
  return (
    <div className='Home'>
      <header className='Home-header'>
        <img src={logo} alt='CICDEEZ Logo' className='logo' />
        <nav>
          <ul>
            <li>
              <a href='#'>Home</a>
            </li>
            <li>
              <a href='#'>About</a>
            </li>
            <li>
              <a href='#'>Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <section className='Home-login'>
        <h2>Metrics Visualization for GitHub Actions</h2>
        <h3>Gain actionable insights on your CI/CD pipeline.</h3>
        <Link to='https://github.com/login/oauth/authorize?client_id=Iv1.cdabdacb14c5030c'>
          <button type='button' className='gh-login-button'>
            {/* <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              fill='currentColor'
              viewBox='0 0 1792 1792'
            >
              <path d='M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z'></path>
            </svg> */}
            <a>Sign in with GitHub</a>
          </button>
        </Link>
        <img src={metricsGif} alt='Metrics GIF' className='metrics-gif' />
        <div className='Home-login-core-tech'>
          <h2 className='Home-login-core-tech-text'>A tool built with ❤️</h2>
          <div className='Home-login-core-tech-body'>
            <img src={ghaLogo} alt='GHA Logo' className='gha-logo' />
            <h1 className='plus'>+</h1>
            <img src={chartjsLogo} alt='Chart.js Logo' className='chartjs-logo' />
            <h1 className='equal'>=</h1>
            <img src={cicdeezLogoV} alt='CICDEEZ Logo Vertical' className='cicdeez-logo-v' />
          </div>
        </div>
      </section>

      <section className='Home-about'>
        <div className='Home-about-left'>
          <h2>About Left Section</h2>
        </div>
        <div className='Home-about-right'>
          <h2>About Right Section</h2>
        </div>
      </section>

      <section className='Home-contact'>
        <h2>Contact</h2>
        <h3>Meet Our Team</h3>
        <div className='team-members'>
          {teamMembers.map((member, index) => (
            <a
              key={index}
              href={member.linkedInUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='member'
            >
              <img src={member.pictureUrl} alt='profile picture' />
              <p>{member.name}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
