import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import NavComponent from './components/NavComponent';
import Login from './components/Login';

const App: React.FC = () => {
  return (
    <div>
      <NavComponent />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/test">
          <h2>This is the test route.</h2>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
