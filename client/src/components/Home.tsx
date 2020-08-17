import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import './Home.css';

import GroceryInput from './GroceryInput';
import GroceryOutput from './GroceryOutput';

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

const Home: React.FC = () => {
  const [groceryOutput, setGroceryOutput] = useState<IGroceryOutput[]>([]);

  return (
    <main role="main">
      <Container>
        <h1>Groceries</h1>
        <GroceryInput setGroceryOutput={setGroceryOutput} />
        <GroceryOutput groceryOutput={groceryOutput} />
      </Container>
    </main>
  );
};

export default Home;
