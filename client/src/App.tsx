// React
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import GroceryOutput from './components/GroceryOutput';
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
  // State Hook
  const [user, setUser] = useState('');
  const [groceryOutput, setGroceryOutput] = useState<IGroceryOutput[]>([]);

  const getUser = (): string => {
    const userString: string | null = sessionStorage.getItem('user');
    const user: string = userString ? JSON.parse(userString) : '';
    return user;
  };

  return (
    <div>
      <NavComponent getUser={getUser} />
      <Switch>
        <Route exact path="/">
          <GroceryInput setGroceryOutput={setGroceryOutput} user={user} />
        </Route>
        <Route exact path="/login">
          <Login setUser={setUser} />
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
