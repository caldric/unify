import React from 'react';
import axios from 'axios';
import './GroceryOutput.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { IGroceryOutput } from '../App';
import GroceryItem from './GroceryItem';

interface Props {
  groceryOutput: IGroceryOutput[];
  user: string;
  setGroceryOutput: React.Dispatch<React.SetStateAction<IGroceryOutput[]>>;
}

const GroceryOutput: React.FC<Props> = ({
  groceryOutput,
  user,
  setGroceryOutput,
}) => {
  const clearList = async () => {
    // do something
    if (user) {
      // Request shopping list from API
      await axios({
        method: 'delete',
        url: `/api/${user}`,
      });

      // Set state
      setGroceryOutput([]);
    }
  };

  return (
    <Container className="top-element">
      <h2>Shopping List</h2>
      {groceryOutput.length ? (
        <>
          <Button
            id="delete-shopping-list"
            variant="danger"
            onClick={clearList}
          >
            Clear Shopping List
          </Button>
          {groceryOutput.map((group) => (
            <div className="grocery-section-output" key={group.section}>
              <h3 className="grocery-item-section">{group.section}</h3>
              <hr />
              <ul>
                {group.contents.map((item) => (
                  <GroceryItem
                    key={item.name}
                    content={`${item.quantity} ${item.unit} ${item.name}`}
                  />
                ))}
              </ul>
            </div>
          ))}
        </>
      ) : null}
    </Container>
  );
};

export default GroceryOutput;
