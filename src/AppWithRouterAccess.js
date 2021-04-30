import React, {useState} from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';
import Chat from './components/chat/Chat'
import { oktaAuthConfig, oktaSignInConfig } from './config';
import UserContext from './UserContext';
import MessageContext from './MessageContext'

const oktaAuth = new OktaAuth(oktaAuthConfig);

const AppWithRouterAccess = () => {
  const history = useHistory();
  const [name, setName] = useState('')
  const [messageSection, setMessageSection] = useState(true)

  const customAuthHandler = () => {
    history.push('/login');
  };
  
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    const basepath = history.createHref({});
    const originalUriWithoutBasepath = originalUri.replace(basepath, '/');
    history.replace(toRelativeUrl(originalUriWithoutBasepath, window.location.origin));
  };

  return (
    <UserContext.Provider value={{name, setName, messageSection, setMessageSection}}>
    <MessageContext.Provider value={{messageSection, setMessageSection}}>
      <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <SecureRoute path='/chat' component={Chat} />
        <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
        <Route path='/login/callback' component={LoginCallback} />
      </Switch>
    </Security>
    </MessageContext.Provider>
    </UserContext.Provider>
  );
};
export default AppWithRouterAccess;
