import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

interface ResponseData {
  message: string;
  input: string;
  output: string[];
}

const Home: React.FC = () => {
  const styles = {
    topComponent: {
      marginTop: '80px',
    },
  };

  const [groceryInput, setGroceryInput] = useState('');
  const [groceryOutput, setGroceryOutput] = useState<string[]>([]);

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
    <div className="container" style={styles.topComponent}>
      <h1>Groceries</h1>
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
