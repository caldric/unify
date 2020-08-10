import React from 'react';
import { Route, Switch } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <p>This is the index route.</p>
        </Route>
        <Route path="/test">
          <p>This is the test route.</p>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
