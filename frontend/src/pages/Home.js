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
import logo from '/frontend/assets/CICDash_logo_h.png';
import mainMan from '/frontend/assets/main_man.png';
import metricsDummy from '/frontend/assets/enter_owner_repo.gif';
import graphDemo from '/frontend/assets/graph_demo.gif';
import technologies from '/frontend/assets/technologies.png';
import arthurPfp from '/frontend/assets/arthur.png';
import russPfp from '/frontend/assets/russ.png';
import jasonPfp from '/frontend/assets/jason.png';
import garrettPfp from '/frontend/assets/garrett.png';
import githubLogo from '/frontend/assets/github_logo.png';
import linkedinLogo from '/frontend/assets/linkedin_logo.png';
import emblem from '/frontend/assets/CICDash_emblem.png';

const Home = () => {
  return (
    <>
      <Navbar bg='light' expand='lg' fixed='top'>
        <Container>
          <Navbar.Brand href='/'>
            <img src={logo} height='40' className='d-inline-block align-top' alt='CICDash Logo' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse className='justify-content-end' id='basic-navbar-nav'>
            <ul className='navbar-nav'>
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
              <li className='nav-item'>
                <NavLink smooth to='#learn-more' className='nav-link'>
                  Learn More
                </NavLink>
              </li>
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container
        id='main'
        className='text-center d-flex flex-column justify-content-center align-items-center position-relative' // Add flexbox classes
        style={{ paddingTop: '180px', paddingBottom: '500px' }}
      >
        <img
          src={mainMan}
          alt='Main Man'
          className='img-fluid position-absolute top-1 start-1'
          style={{ zIndex: '-1', maxHeight: '100%', maxWidth: '100%', marginTop: '700px' }}
        />
        <h1 style={{ fontWeight: 'bold', fontSize: '50px' }}>
          Metrics Visualization for GitHub Actions
        </h1>
        <p style={{ marginTop: '20px', fontSize: '26px', color: 'gray' }}>
          Gain actionable insights on any workflow, any job, any step, from anytime.
        </p>
        <Link to='https://github.com/login/oauth/authorize?client_id=Iv1.cdabdacb14c5030c'>
          <Button variant='success' size='lg'>
            Log In with GitHub
          </Button>
        </Link>
      </Container>

      <Container
        id='technologies'
        className='text-center d-flex flex-column justify-content-center align-items-center position-relative'
        style={{ paddingTop: '10px', paddingBottom: '50px' }}
      >
        <img src={technologies} alt='Technologies' style={{ height: '9vh' }} />
      </Container>

      <div id='about' className='bg-light py-5'>
        <Container>
          <Row className='align-items-center'>
            <Col xs={12} md={6} className='order-md-2'>
              <img src={metricsDummy} className='img-fluid' alt='Metrics Dummy' />
            </Col>
            <Col xs={12} md={6} className='order-md-1'>
              <h2 style={{ fontWeight: 'bold', fontSize: '35px' }}>Designed for GitHub Actions</h2>
              <p>
                CICDash was designed to be tightly integrated with the GitHub Actions API. Simply
                sign-in using your GitHub account and input the owner and desired repo to pull your
                saved workflow data from.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <div id='about' className='bg-white py-5'>
        <Container>
          <Row className='align-items-center'>
            <Col xs={12} md={6} className='order-md-2'>
              <h2 style={{ fontWeight: 'bold', fontSize: '35px' }}>
                Gain Actionable Insights on Your GitHub Actions Workflow Data
              </h2>
              <p>
                Our metrics page features interactive bar graphs, pie charts, and line charts for
                you to analyze your workflow data trends. Metrics collected include Average Run
                Time, Workflow Runs per Month, Lifetime Workflow Attempts, Execution Time Trend, and
                Failure Rate by Job Step
              </p>
            </Col>
            <Col xs={12} md={6} className='order-md-1'>
              <img src={graphDemo} className='img-fluid' alt='Graph Demo GIF' />
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
              CICDash was developed by our distributed team of engineers from NYC and LA
            </p>
          </div>
          <Row className='align-items-center justify-content-center'>
            <Col className='text-center'>
              <img src={arthurPfp} alt='Profile Pic' style={{ width: '130px' }} />
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
              <img src={russPfp} alt='Profile Pic' style={{ width: '130px' }} />
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
              <img src={jasonPfp} alt='Profile Pic' style={{ width: '130px' }} />
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
              <img src={garrettPfp} alt='Profile Pic' style={{ width: '130px' }} />
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
        id='learn-more'
        className='text-center d-flex flex-column justify-content-center align-items-center position-relative'
        style={{ paddingTop: '50px', paddingBottom: '150px' }}
      >
        <img src={emblem} alt='CICDash Emblem' style={{ width: '30vh' }} />
        <h2 style={{ fontWeight: 'bold', fontSize: '35px' }}>
          Providing Insights for Modern-Day CICD Pipelines
        </h2>
        <p style={{ marginTop: '20px', fontSize: '20px', color: 'gray' }}>
          CICDash is a workflow data visualization platform that utilizes Chart.js to provide a
          free, lightweight tool for software engineers.
        </p>
        <p style={{ marginTop: '20px', fontSize: '20px', color: 'gray' }}>
          Read our Medium article to learn more about the problem we're tackling and how we landed
          on the idea
        </p>
        <Link to='https://medium.com/@russell1740/cicdeez-a-github-actions-metrics-dashboard-00b600393709'>
          Learn More
        </Link>
      </Container>

      <Footer />
    </>
  );
};

export default Home;
