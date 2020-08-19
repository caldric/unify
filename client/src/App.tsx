// React & Axios
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [groceryOutput, setGroceryOutput] = useState<IGroceryOutput[]>([]);

  const getShoppingList = async () => {
    if (loggedIn) {
      // Request shopping list from API
      const response = await axios({
        method: 'get',
        url: `/api/${user}`,
      });

      // Set state
      const { shoppingList } = response.data;
      const items = Object.keys(shoppingList).length ? shoppingList.items : [];
      setGroceryOutput(items);
    } else {
      setGroceryOutput([]);
    }
  };

  const getUser = async () => {
    // Obtain user email from sessionStorage
    const userString = sessionStorage.getItem('user');
    console.log('User string: ', userString);
    const user = userString ? userString : '';
    setUser(user);

    // Obtain logged in status from API
    const response = await axios({
      method: 'get',
      url: `/api/login/status/${user}`,
    });
    const { data } = response;
    const { loggedIn }: { loggedIn: boolean } = data;
    setLoggedIn(loggedIn);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getShoppingList();
  }, [loggedIn]);

  return (
    <div>
      <NavComponent
        user={user}
        setUser={setUser}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <Switch>
        <Route exact path="/">
          <GroceryInput setGroceryOutput={setGroceryOutput} user={user} />
        </Route>
        <Route exact path="/login">
          <Login setUser={setUser} setLoggedIn={setLoggedIn} />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/shopping-list">
          <GroceryOutput
            groceryOutput={groceryOutput}
            user={user}
            setGroceryOutput={setGroceryOutput}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
