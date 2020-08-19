import React from 'react';
import Container from 'react-bootstrap/Container';
// import ListGroup from 'react-bootstrap/ListGroup';

import { IGroceryOutput } from '../App';

interface Props {
  groceryOutput: IGroceryOutput[];
}

const GroceryOutput: React.FC<Props> = ({ groceryOutput }) => {
  return (
    <Container className="top-element">
      <h2>Shopping List</h2>
      {groceryOutput.map((group) => (
        <div className="grocery-section-output" key={group.section}>
          <h3>{group.section}</h3>
          <ul>
            {group.contents.map((item) => (
              <li
                key={item.name}
              >{`${item.quantity} ${item.unit} ${item.name}`}</li>
            ))}
          </ul>
        </div>
      ))}
    </Container>
  );
};

export default GroceryOutput;
