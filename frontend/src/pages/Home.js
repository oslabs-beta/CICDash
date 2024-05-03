import React from 'react';
import { Link } from 'react-router-dom';

// Bootstrap Styling/Page Layout
import { Container, Row, Col, Button, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Scroll to specific section functionality
import { HashLink as NavLink } from 'react-router-hash-link'; // Import HashLink

// Components
import Footer from './Footer';

// Assets
import logo from '/frontend/assets/cicdeez_logo_h.png';
import metricsDummy from '/frontend/assets/metrics_dummy.gif';
import technologies from '/frontend/assets/technologies.png';
import arthurPfp from '/frontend/assets/arthur.png';
import russPfp from '/frontend/assets/russ.png';
import jasonPfp from '/frontend/assets/jason.png';
import garrettPfp from '/frontend/assets/garrett.png';
import githubLogo from '/frontend/assets/github_logo.png';
import linkedinLogo from '/frontend/assets/linkedin_logo.png';

const Home = () => {
  return (
    <>
      <Navbar bg='light' expand='lg' fixed='top'>
        <Container>
          <Navbar.Brand href='/'>
            <img src={logo} height='40' className='d-inline-block align-top' alt='CICDEEZ Logo' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <ul className='navbar-nav ml-auto'>
              {/* Use HashLink to scroll to specific section */}
              <li className='nav-item'>
                <NavLink smooth to='#main' className='nav-link'>
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink smooth to='#about' className='nav-link'>
                  About
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink smooth to='#contact' className='nav-link'>
                  Contact
                </NavLink>
              </li>
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container
        id='main'
        className='text-center d-flex flex-column justify-content-center align-items-center position-relative' // Add flexbox classes
        style={{ paddingTop: '130px', paddingBottom: '650px' }}
      >
        <img
          src={metricsDummy}
          alt='Metrics GIF'
          className='img-fluid position-absolute top-1 start-1'
          style={{ zIndex: '-1', maxHeight: '70%', maxWidth: '70%', marginTop: '750px' }}
        />
        <h1 style={{ fontWeight: 'bold', fontSize: '50px' }}>
          Metrics Visualization for GitHub Actions
        </h1>
        <p style={{ marginTop: '20px', fontSize: '26px', color: 'gray' }}>
          Gain actionable insights on any workflow, any job, any step, from anytime.
        </p>
        <Link to='https://github.com/login/oauth/authorize?client_id=Iv1.cdabdacb14c5030c'>
          <Button
            variant='primary'
            size='lg'
            style={{
              backgroundImage: 'linear-gradient(to right, #00bf63, #01937b)',
              border: 'none',
              marginTop: '10px',
              transition: 'background-image 0.3s ease', // Add transition property
              cursor: 'pointer', // Change cursor on hover
            }}
            className='gradient-hover'
          >
            Log In with GitHub
          </Button>
        </Link>
      </Container>

      <Container
        id='technologies'
        className='text-center d-flex flex-column justify-content-center align-items-center position-relative' // Add flexbox classes
        style={{ paddingTop: '30px', paddingBottom: '80px' }}
      >
        <img src={technologies} alt='Technologies' style={{ height: '10vh' }} />
      </Container>

      <div id='about' className='bg-light py-5'>
        <Container>
          <Row className='align-items-center'>
            <Col xs={12} md={6} className='order-md-2'>
              <img src={metricsDummy} className='img-fluid' alt='Metrics Dummy' />
            </Col>
            <Col xs={12} md={6} className='order-md-1'>
              <h2 style={{ fontWeight: 'bold', fontSize: '35px' }}>About</h2>
              <p>Write your about text here.</p>
            </Col>
          </Row>
        </Container>
      </div>

      <div id='about' className='bg-white py-5'>
        <Container>
          <Row className='align-items-center'>
            <Col xs={12} md={6} className='order-md-2'>
              <h2 style={{ fontWeight: 'bold', fontSize: '35px' }}>About</h2>
              <p>Write your about text here.</p>
            </Col>
            <Col xs={12} md={6} className='order-md-1'>
              <img src={metricsDummy} className='img-fluid' alt='Metrics Dummy' />
            </Col>
          </Row>
        </Container>
      </div>

      <div id='contact' className='bg-light py-5'>
        <Container style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div style={{ paddingBottom: '80px' }}>
            <h1 className='text-center' style={{ fontWeight: 'bold', fontSize: '35px' }}>
              Our Team
            </h1>
            <p
              className='text-center'
              style={{ marginTop: '20px', fontSize: '20px', color: 'gray' }}
            >
              CICDEEZ was developed by our distributed team of engineers from NYC and LA
            </p>
          </div>
          <Row className='align-items-center justify-content-center'>
            <Col className='text-center'>
              <img src={arthurPfp} alt='Profile Pic' style={{ width: '100px' }} />
              <p>Arthur Cheung</p>
              <Link to='https://www.linkedin.com/in/arthurtcheung/'>
                <img
                  src={linkedinLogo}
                  alt='Linkedin Logo'
                  style={{ width: '25px', marginRight: '15px' }}
                />
              </Link>
              <Link to='https://github.com/arthurtcheung'>
                <img src={githubLogo} alt='GitHub Logo' style={{ width: '25px' }} />
              </Link>
            </Col>
            <Col className='text-center'>
              <img src={russPfp} alt='Profile Pic' style={{ width: '100px' }} />
              <p>Russ Apolonio</p>
              <Link to='https://www.linkedin.com/in/russellapolonio/'>
                <img
                  src={linkedinLogo}
                  alt='Linkedin Logo'
                  style={{ width: '25px', marginRight: '15px' }}
                />
              </Link>
              <Link to='https://github.com/heyitsrusss'>
                <img src={githubLogo} alt='GitHub Logo' style={{ width: '25px' }} />
              </Link>
            </Col>
            <Col className='text-center'>
              <img src={jasonPfp} alt='Profile Pic' style={{ width: '100px' }} />
              <p>Jason Kuroda</p>
              <Link to='https://www.linkedin.com/in/jasonkuroda/'>
                <img
                  src={linkedinLogo}
                  alt='Linkedin Logo'
                  style={{ width: '25px', marginRight: '15px' }}
                />
              </Link>
              <Link to='https://github.com/j-s-n'>
                <img src={githubLogo} alt='GitHub Logo' style={{ width: '25px' }} />
              </Link>
            </Col>
            <Col className='text-center'>
              <img src={garrettPfp} alt='Profile Pic' style={{ width: '100px' }} />
              <p>Garrett Zeal</p>
              <Link to='https://www.linkedin.com/in/garrettzeal/'>
                <img
                  src={linkedinLogo}
                  alt='Linkedin Logo'
                  style={{ width: '25px', marginRight: '15px' }}
                />
              </Link>
              <Link to='https://github.com/ZealousOne'>
                <img src={githubLogo} alt='GitHub Logo' style={{ width: '25px' }} />
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

      <Container
        id='main'
        className='text-center d-flex flex-column justify-content-center align-items-center position-relative' // Add flexbox classes
        style={{ paddingTop: '130px', paddingBottom: '250px' }}
      >
        <h1 style={{ fontWeight: 'bold', fontSize: '50px' }}>
          Metrics Visualization for GitHub Actions
        </h1>
        <p style={{ marginTop: '20px', fontSize: '26px', color: 'gray' }}>
          Gain actionable insights on any workflow, any job, any step, from anytime.
        </p>
      </Container>

      <Footer />
    </>
  );
};

export default Home;
