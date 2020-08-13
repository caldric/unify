import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <h2>This is the index route.</h2>
        </Route>
        <Route path="/test">
          <h2>This is the test route.</h2>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
