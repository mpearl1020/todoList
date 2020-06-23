import React, { useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';

const Routes = () => {
  const baseURL = process.env.PUBLIC_URL;

  const [username, setUsername] = useState('');
  // const [userID, setUserID] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Switch>
        <Route exact path={baseURL + '/'} render={(props) => <HomePage {...props} username={username} setUsername={setUsername} setLoggedIn={setLoggedIn} />}/>
        <Route exact path={baseURL + '/dashboard'} render={(props) => (username !== '') ? <DashboardPage {...props} username={username} /> : <HomePage {...props} username={username} setUsername={setUsername} setLoggedIn={setLoggedIn} />}/>
      </Switch>
    </Router>
  );
}

export default Routes;
