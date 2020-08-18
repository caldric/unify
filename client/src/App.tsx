// React
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Home from './components/Home';
import NavComponent from './components/NavComponent';
import Login from './components/Login';
import Signup from './components/Signup';

const App: React.FC = () => {
  return (
    <div>
      <NavComponent />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route path="/test">
          <h2>This is the test route.</h2>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
