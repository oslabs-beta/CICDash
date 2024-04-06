import React from 'react';
import background from '/frontend/assets/5156046.jpg';
import '/frontend/src/stylesheet.css';

const Landing = () => {
  const history = useHistory();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        // Make a request to the backend to refresh the access token
        const response = await axios.get('http://localhost:3000/', {
          withCredentials: true, // Include cookies in the request
        });

        // If token refresh is successful, continue with landing page functionality
        console.log('Token refreshed:', response.data);
      } catch (error) {
        // If token refresh fails (e.g., due to expired refresh token), redirect to login page
        console.error('Error refreshing token:', error);
      }
    };

    refreshToken();
  }, []); // Run this effect only once when component mounts

  return (
    <div className='flex-container' style={{ backgroundImage: `url(${background})` }}>
      <h1 className='logo'>CICDEEZ</h1>
    </div>
  );
};

export default Landing;
