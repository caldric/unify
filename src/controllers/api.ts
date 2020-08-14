import express from 'express';

// Config
const apiRouter = express.Router();

interface Unit {
  name: string;
  type: 'volume' | 'weight';
  variants: string[];
}

const units: Unit[] = [
  {
    name: 'tablespoon',
    type: 'volume',
    variants: ['tbsp', 'tbsp', 'tablespoon', 'tablespoons'],
  },
  {
    name: 'pound',
    type: 'weight',
    variants: ['pound', 'pounds', 'lb', 'lbs'],
  },
];

// Main app logic function
const combineGroceries = (groceries: string): string[] => {
  // Initialize grocery list
  let groceryList: string[] = [];

  // Store each item as an element in an array
  groceryList = groceries.split('\n');

  // Remove extra whitespace
  // They should now just be ''
  groceryList = groceryList.filter((item) => item !== '');

  // Convert all items to lowercase
  groceryList = groceryList.map((item) => item.toLowerCase());

  // Remove characters after comma
  groceryList = groceryList.map((item) => {
    const commaIndex = item.indexOf(',');
    const filteredItem = item.slice(0, commaIndex);
    return filteredItem;
  });

  return groceryList;
};

// Routes
apiRouter.post('/', (req, res) => {
  const { input }: { input: string } = req.body;
  const combinedGroceries = combineGroceries(input);
  console.log(combinedGroceries);
  res.status(200).json({
    message: 'Post request successful',
    output: combinedGroceries,
    input,
  });
});

export default apiRouter;
