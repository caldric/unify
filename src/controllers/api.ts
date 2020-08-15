import express from 'express';

interface Unit {
  name: string;
  type: 'volume' | 'weight';
  variants: string[];
}

interface GroceryOutput {
  input: string;
  quantity?: number;
  unit?: string;
  name?: string;
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
const combineGroceries = (groceries: string): GroceryOutput[] => {
  // Store each item as an element in an array
  let groceryList: GroceryOutput[] = groceries.split('\n').map((item) => {
    return { input: item };
  });

  // Remove extra whitespace
  // They should now just be ''
  groceryList = groceryList.filter((item) => item.input !== '');

  // Convert all items to lowercase
  groceryList.forEach((item) => (item.input = item.input.toLowerCase()));

  // Remove characters after comma
  groceryList.forEach((item) => {
    const commaIndex = item.input.indexOf(',');
    const filteredItem = item.input.slice(0, commaIndex);
    item.input = filteredItem;
  });

  // Extract quantity
  const qtyRegex = /\d/;
  groceryList.forEach(
    (item) => (item.quantity = Number(item.input.match(qtyRegex)))
  );

  // Extract units and item
  groceryList.forEach((item) => {
    for (const unit of units) {
      let exitEarly = false;

      for (const unitVariant of unit.variants) {
        if (item.input.includes(unitVariant)) {
          // Extract unit
          item.unit = unit.name;

          // Extract item
          const unitVariantIndex = item.input.indexOf(unitVariant);
          // This is making the assumption that there's always a space
          // between the unit and the item name
          item.name = item.input.slice(
            unitVariantIndex + unitVariant.length + 2
          );

          // Exit loops
          exitEarly = true;
          break;
        }
      }

      if (exitEarly) break;
    }
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
