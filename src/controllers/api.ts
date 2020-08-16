import express from 'express';
import { units } from '../models/units';
import { categories } from '../models/categories';

interface GroceryOutput {
  input?: string;
  quantity?: number;
  unit?: string;
  name?: string;
  section?: string;
}

interface GroupedGroceryOutput {
  section: string;
  contents: GroceryOutput[];
}

// Config
const apiRouter = express.Router();

// Main app logic function
const combineGroceries = (groceries: string): GroupedGroceryOutput[] => {
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
      const filteredItem =
        commaIndex !== -1 ? item.input.slice(0, commaIndex) : item.input;
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
  let combinedGroceryList: GroceryOutput[] = [];
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

  // Assign category to item
  combinedGroceryList.forEach((item) => {
    for (const category of categories) {
      if (item.name && item.name.includes(category.item)) {
        item.section = category.section;
        break;
      } else {
        item.section = 'other';
      }
    }
  });

  // Sort output by section
  combinedGroceryList = combinedGroceryList.sort((a, b) => {
    if (a.section && b.section) {
      return a.section.localeCompare(b.section);
    } else {
      return 0;
    }
  });

  // Group output by section
  const groupedGroceryList: GroupedGroceryOutput[] = [];
  const groups: string[] = [];
  combinedGroceryList.forEach((item) => {
    // Check if group already exists
    if (item.section && !groups.includes(item.section)) {
      // Case: group does not yet exist
      // Push new group onto groups
      groups.push(item.section);

      // Add new section and content to groupedGroceryList
      groupedGroceryList.push({
        section: item.section,
        contents: [item],
      });
    } else {
      // Search for the index of the matching group
      const matchingGroupIndex = groupedGroceryList.findIndex(
        (matchingItem) => matchingItem.section === item.section
      );

      // Add new content to pre-existing group
      const matchingGroup = groupedGroceryList[matchingGroupIndex];
      matchingGroup.contents.push(item);
    }
  });

  return groupedGroceryList;
};

// Routes
apiRouter.post('/', (req, res) => {
  // Obtain input from client
  const { input }: { input: string } = req.body;

  // Run input through main logic function
  const combinedGroceries = combineGroceries(input);
  console.log(combinedGroceries);

  // Send response
  res.status(200).json({
    message: 'Post request successful',
    output: combinedGroceries,
    input,
  });
});

export default apiRouter;
