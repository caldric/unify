import express from 'express';

interface Unit {
  name: string;
  type: 'volume' | 'weight';
  variants: string[];
}

interface GroceryOutput {
  input?: string;
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
    variants: ['tbsps', 'tbsp', 'tablespoons', 'tablespoon'],
  },
  {
    name: 'pound',
    type: 'weight',
    variants: ['pounds', 'pound', 'lbs', 'lb'],
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
  groceryList.forEach(
    (item) => (item.input = item.input ? item.input.toLowerCase() : '')
  );

  // Remove characters after comma
  groceryList.forEach((item) => {
    if (item.input) {
      const commaIndex = item.input.indexOf(',');
      const filteredItem = item.input.slice(0, commaIndex);
      item.input = filteredItem;
    }
  });

  // Extract quantity
  const qtyRegex = /\d/;
  groceryList.forEach(
    (item) =>
      (item.quantity = item.input ? Number(item.input.match(qtyRegex)) : 0)
  );

  // Extract units and item
  groceryList.forEach((item) => {
    for (const unit of units) {
      let exitEarly = false;

      for (const unitVariant of unit.variants) {
        if (item.input && item.input.includes(unitVariant)) {
          // Extract unit
          item.unit = unit.name;

          // Extract item
          const unitVariantIndex = item.input.indexOf(unitVariant);
          // This is making the assumption that there's always a space
          // between the unit and the item name
          item.name = item.input.slice(
            unitVariantIndex + unitVariant.length + 1
          );

          // Exit loops
          exitEarly = true;
          break;
        }
      }

      if (exitEarly) break;
    }
  });

  // Combine similar items
  const combinedGroceryList: GroceryOutput[] = [];
  const combinedItemNames: string[] = [];

  groceryList.forEach((item) => {
    // Check if item is already present in the grocery list inputs
    if (item.name && !combinedItemNames.includes(item.name)) {
      // Case: item is not yet present
      // console.log(`${item.name} is not yet present`);
      combinedItemNames.push(item.name);

      // Store the new item in combinedGroceryList
      const { quantity, unit, name } = item;
      combinedGroceryList.push({ quantity, unit, name });
      // console.log('Combined grocery list: ', combinedGroceryList);
    } else {
      // Case: item is already present
      // console.log(`${item.name} is already present`);

      // Search for the index of the matching item in combined list
      const matchingItemIndex = combinedGroceryList.findIndex(
        (matchingItem) => matchingItem.name === item.name
      );

      // Increment the quantity of the item
      const { quantity } = item;
      const matchingItem = combinedGroceryList[matchingItemIndex];
      if (matchingItem.quantity && quantity) matchingItem.quantity += quantity;
    }
  });

  return combinedGroceryList;
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
