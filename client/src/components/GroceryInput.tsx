import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
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
    '2 lbs beef shank',
    '1/2 small cabbage, whole leaf individually detached',
    '1 small bundle Pechay',
    '3 pcs Corn, each cut into 3 parts',
    '2 tbsp Whole pepper corn',
    '1/2 cup Green onions',
    '1 medium sized onion',
    '4.25 cups water',
    '2 tbsp fish sauce (optional)',
    '1 lb pancit bihon',
    '1/2 lb pork, cut into small thin slices',
    '1/2 lb chicken, cooked, deboned, and cut into thin slices',
    '1/8 lb pea pods or snow pea',
    '1 cup carrot',
    '1/2 small cabbage, chopped',
    '1 cup celery leaves, chopped finely',
    '1 medium sized onion, chopped',
    '1 clove garlic, minced',
    '1 pc chicken cube',
    '5 tbsp soy sauce',
    '4 cups water',
    '2 lbs beef, cubed',
    '3 cloves garlic, crushed and chopped',
    '1 piece onion, finely chopped',
    '2 cups beef broth',
    '1 piece red bell pepper, sliced',
    '1 piece green bell pepper, sliced',
    '1 cup tomato sauce',
    '1/2 cup liver spread, processed using blender',
    '1 teaspoon chili flakes',
    '3 pieces dried bay leaves',
    '2 cups potatoes, sliced',
    '2 cups carrots, sliced',
    '1/4 cup cooking oil',
    '2/3 cup green olives',
    'salt and pepper to taste',
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
    <Container>
      <Row className="grocery-input top-element">
        <Col>
          <h2>Ingredients</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="grocery-list">
              <Form.Control
                as="textarea"
                rows={25}
                placeholder="Enter or paste your grocery list items here"
                value={groceryInput}
                onChange={(event) => setGroceryInput(event.currentTarget.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add All Ingredients to Shopping List
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default GroceryInput;
