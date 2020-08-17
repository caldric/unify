import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

import { IGroceryOutput } from './Home';

interface Props {
  setGroceryOutput: React.Dispatch<React.SetStateAction<IGroceryOutput[]>>;
}

interface ResponseData {
  message: string;
  input: string;
  output: IGroceryOutput[];
}

const GroceryInput: React.FC<Props> = ({ setGroceryOutput }) => {
  // const [groceryInput, setGroceryInput] = useState('');
  const testInput = [
    '2 zucchini, ends trimmed',
    '3 tablespoons olive oil',
    '2 links Italian-style chicken sausage, casings removed',
    '2 teaspoons crushed red pepper flakes (optional)',
    'salt and ground black pepper to taste',
    '1/2 sweet onion (such as Vidalia®), chopped',
    '3 cloves garlic, chopped',
    '14.5 ounce can whole peeled tomatoes, drained and chopped',
    '1/2 cup dry bread crumbs',
    '1/4 cup grated Parmesan cheese',
    '1 tablespoon chopped fresh basil',
  ].join('\n');
  const [groceryInput, setGroceryInput] = useState(testInput);

  const handleSubmit = async (
    event: React.FormEvent<HTMLElement>
  ): Promise<void> => {
    // Prevent page refresh
    event.preventDefault();

    console.log(`Form submitted with value: '${groceryInput}'`);

    // Make post request
    const response = await axios({
      method: 'post',
      url: '/api',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ input: groceryInput }),
    });
    const { data }: { data: ResponseData } = response;
    console.log(data);

    // Assign output data to state
    setGroceryOutput(data.output);
  };

  return (
    <Row className="grocery-input">
      <Col>
        <h2>Input</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="grocery-list">
            <Form.Control
              as="textarea"
              rows={10}
              placeholder="Enter or paste your grocery list items here"
              value={groceryInput}
              onChange={(event) => setGroceryInput(event.currentTarget.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default GroceryInput;
