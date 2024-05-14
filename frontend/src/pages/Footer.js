import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-light py-4'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <span className='text-muted'>© 2024 CICDEEZ™. All rights reserved.</span>
          </div>
          <div className='col-md-1 text-md-right d-flex justify-content-end'>
            <a href='#' className='text-muted mx-2'>
              LinkedIn
            </a>
            <a href='#' className='text-muted mx-2'>
              Github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
