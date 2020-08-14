import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

interface Props {
  setGroceryOutput: React.Dispatch<React.SetStateAction<string[]>>;
}

interface ResponseData {
  message: string;
  input: string;
  output: string[];
}

const GroceryInput: React.FC<Props> = ({ setGroceryOutput }) => {
  const styles = {
    topComponent: {
      marginTop: '40px',
    },
  };

  const [groceryInput, setGroceryInput] = useState('');

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
    <Container style={styles.topComponent}>
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
    </Container>
  );
};

export default GroceryInput;
