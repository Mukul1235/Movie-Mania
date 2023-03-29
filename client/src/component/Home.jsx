import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks'
import Container from './Container';
import NotVerified from './user/NotVerified';

const Home = () => {

  return (
<NotVerified />
  );
};

export default Home


// import React from 'react'

// const Home = () => {
//   const { authInfo } = useAuth();
//   const isVerified = authInfo.profile?.isVerified;
//   const { isLoggedIn } = authInfo;
//   return ({isLoggedIn!isVerified? (< Container ><Container/>):null});
// }

// export default Home
