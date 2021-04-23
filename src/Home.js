import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import Login from './components/login/Login'

const Home = () => {
  const history = useHistory();
  const { oktaAuth, authState } = useOktaAuth();
  

  if (authState.isPending) return null;

  const login = async () => history.push('/login');
  
  const logout = async () => oktaAuth.signOut();

  const logButton = authState.isAuthenticated ? 
    <button onClick={logout}>Logout</button> :
    <button onClick={login}>Login</button>;

  return (
    <div>
      {/* <Link to='/'>Home</Link><br/> */}
      <Login logButton={logButton}/>
      {/* <Link to='/chat'>Enter Chat</Link><br/> */}
      {/* {logButton} */}
    </div>
  );
};
export default Home;
