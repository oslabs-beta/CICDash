import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-light py-4'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <span className='text-muted'>© 2024 CICDash™. All rights reserved.</span>
          </div>
          <div className='col-md-6 d-flex justify-content-md-end'>
            <Link
              to='https://www.linkedin.com/'
              className='text-muted'
              style={{ marginRight: '20px' }}
            >
              LinkedIn
            </Link>
            <Link to='https://github.com/oslabs-beta/FlowMetrics' className='text-muted'>
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
