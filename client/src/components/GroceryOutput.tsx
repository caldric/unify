import React from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import { IGroceryOutput } from './Home';

interface Props {
  groceryOutput: IGroceryOutput[];
  // groceryOutput: string[];
}

const GroceryOutput: React.FC<Props> = ({ groceryOutput }) => {
  return (
    <Container>
      <h2>Output</h2>
      <ListGroup variant="flush">
        {groceryOutput.map((item) => (
          <ListGroup.Item>{item}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default GroceryOutput;
