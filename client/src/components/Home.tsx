import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import GroceryInput from './GroceryInput';

const Home: React.FC = () => {
  const styles = {
    topComponent: {
      marginTop: '80px',
    },
  };

  const [groceryOutput, setGroceryOutput] = useState<string[]>([]);

  return (
    <div className="container" style={styles.topComponent}>
      <h1>Groceries</h1>
      <GroceryInput setGroceryOutput={setGroceryOutput} />
      <h2>Output</h2>
      <ListGroup variant="flush">
        {groceryOutput.map((item) => (
          <ListGroup.Item>{item}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Home;
