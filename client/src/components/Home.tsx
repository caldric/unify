import React, { useState } from 'react';
import GroceryInput from './GroceryInput';
import GroceryOutput from './GroceryOutput';

const Home: React.FC = () => {
  const [groceryOutput, setGroceryOutput] = useState<string[]>([]);

  return (
    <div>
      <h1>Groceries</h1>
      <GroceryInput setGroceryOutput={setGroceryOutput} />
      <GroceryOutput groceryOutput={groceryOutput} />
    </div>
  );
};

export default Home;
