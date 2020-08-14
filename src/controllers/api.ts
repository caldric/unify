import express from 'express';

interface Unit {
  name: string;
  type: 'volume' | 'weight';
  variants: string[];
}

interface GroceryOutput {
  input?: string;
  quantity?: number;
}

// Config
const apiRouter = express.Router();

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
const combineGroceries = (groceries: string): any => {
  // Initialize grocery list
  // let groceryList: GroceryList[] = [];
  let groceryList: any = [];

  // Store each item as an element in an array
  groceryList = groceries.split('\n').map((item) => {
    return { input: item };
  });

  // // Remove extra whitespace
  // // They should now just be ''
  // groceryList = groceryList.filter((item) => item.input !== '');

  // // Convert all items to lowercase
  // groceryList = groceryList.map((item) => item.input?.toLowerCase());

  // // Remove characters after comma
  // groceryList = groceryList.map((item) => {
  //   const commaIndex = item.indexOf(',');
  //   const filteredItem = item.slice(0, commaIndex);
  //   return filteredItem;
  // });

  // // Extract quantity
  // const qtyRegex = /\d/;
  // groceryList = groceryList.map((item) => {
  //   return {
  //     quantity: Number(item.match(qtyRegex)),
  //     input: item,
  //   };
  // });

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
