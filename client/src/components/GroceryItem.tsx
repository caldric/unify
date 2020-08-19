import React, { useState } from 'react';
import './GroceryItem.css';

interface Props {
  content: string;
}

const GroceryItem: React.FC<Props> = ({ content }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <li
      className={clicked ? 'clickable strikethrough' : 'clickable'}
      onClick={() => setClicked(!clicked)}
    >
      {content}
    </li>
  );
};

export default GroceryItem;
