import React from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import Login from './components/login/Login'
import './Home.css'

const Home = () => {
  const history = useHistory();
  const { oktaAuth, authState } = useOktaAuth();
  
  if (authState.isPending) return null;

  const login = async () => history.push('/login');
  
  const logout = async () => oktaAuth.signOut();

  const logButton = authState.isAuthenticated ? 
    <button className="logout-btn" onClick={logout}>Logout</button> :
    <button className="login-btn" onClick={login}>Login</button>;

  return (
    <div>
      <Login logButton={logButton}/>
    </div>
  );
};
export default Home;
