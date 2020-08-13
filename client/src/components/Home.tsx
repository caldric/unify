import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Home: React.FC = () => {
  const styles = {
    topComponent: {
      marginTop: '80px',
    },
  };

  const [groceries, setGroceries] = useState('');

  return (
    <div className="container" style={styles.topComponent}>
      <h2>Groceries</h2>
      <Form>
        <Form.Group controlId="grocery-list">
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Enter or paste your grocery list items here"
            value={groceries}
            onChange={(event) => setGroceries(event.currentTarget.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Home;
