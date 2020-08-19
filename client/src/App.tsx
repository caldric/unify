// React
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import GroceryOutput from './components/GroceryOutput';
import Home from './components/Home';
import Login from './components/Login';
import NavComponent from './components/NavComponent';
import Signup from './components/Signup';
import GroceryInput from './components/GroceryInput';

interface GroceryContent {
  quantity: number;
  unit: string;
  name: string;
  section: string;
}

export interface IGroceryOutput {
  section: string;
  contents: GroceryContent[];
}

const App: React.FC = () => {
  const [groceryOutput, setGroceryOutput] = useState<IGroceryOutput[]>([]);

  return (
    <div>
      <NavComponent />
      <Switch>
        <Route exact path="/">
          <GroceryInput setGroceryOutput={setGroceryOutput} />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/shopping-list">
          <GroceryOutput groceryOutput={groceryOutput} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
