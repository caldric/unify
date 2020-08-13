import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Home: React.FC = () => {
  const styles = {
    topComponent: {
      marginTop: '80px',
    },
  };

  return (
    <div className="container" style={styles.topComponent}>
      <h2>Groceries</h2>
      <Form>
        <Form.Group controlId="GroceryListTextarea">
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Enter or paste your grocery list items here"
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
