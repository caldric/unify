import { units } from './units';
import { categories } from './categories';

interface GroceryOutput {
  input: string;
  quantity: number;
  unit: string;
  name: string;
  section: string;
}

interface GroupedGroceryOutput {
  section: string;
  contents: GroceryOutput[];
}

// Store each item as an element in an array
const inputToList = (input: string): GroceryOutput[] => {
  const output: GroceryOutput[] = input.split('\n').map((item) => {
    // Set up default values
    return { input: item, quantity: 0, unit: 'count', name: '', section: '' };
  });
  return output;
};

// Remove new line characters from list
const removeWhitespace = (input: GroceryOutput[]): GroceryOutput[] => {
  return input.filter((item) => item.input !== '');
};

// Convert all items to lowercase
const inputToLowercase = (input: GroceryOutput[]): GroceryOutput[] => {
  const output: GroceryOutput[] = input.map((item) => {
    const { input, quantity, unit, name, section } = item;
    const newInput = input.toLowerCase();
    return { quantity, unit, section, name, input: newInput };
  });

  return output;
};

// Main app logic function
const combineGroceries = (groceries: string): GroupedGroceryOutput[] => {
  let groceryList = inputToList(groceries);
  groceryList = removeWhitespace(groceryList);
  groceryList = inputToLowercase(groceryList);

  // Remove characters after comma
  // Assumption: adjectives after the comma are unneeded
  groceryList.forEach((item) => {
    if (item.input) {
      const commaIndex = item.input.indexOf(',');
      const filteredItem =
        commaIndex !== -1 ? item.input.slice(0, commaIndex) : item.input;
      item.input = filteredItem;
    }
  });

  // Extract quantity
  const qtyRegex = /\d+/;
  groceryList.forEach(
    (item) =>
      (item.quantity = item.input ? Number(item.input.match(qtyRegex)) : 0)
  );

  // Extract units and item
  // console.log('Prior to extracting units and item: ', groceryList);
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
            unitVariantIndex + unitVariant.length + 1
          );

          // Exit loops
          exitEarly = true;
          break;
        }
      }

      if (exitEarly) break;
    }

    // If unit is not found at this point, extract item name differently
    if (!item.name) {
      if (item.quantity) {
        // One or more digits followed by zero or more spaces
        const qtyRegex = /\d+\s*/;
        item.name = item.input.replace(qtyRegex, '');
      }
    }
  });

  // Combine similar items
  let combinedGroceryList: GroceryOutput[] = [];
  const combinedItemNames: string[] = [];

  // console.log('Current grocery list: ', groceryList);
  groceryList.forEach((item) => {
    // console.log('Current item: ', item);
    // Check if item is already present in the grocery list inputs
    if (!combinedItemNames.includes(item.name)) {
      // Case: item is not yet present
      // console.log(`${item.name} is not yet present`);
      combinedItemNames.push(item.name);

      // Store the new item in combinedGroceryList
      const { input, quantity, unit, name, section } = item;
      combinedGroceryList.push({ input, quantity, unit, name, section });
      // console.log('Combined grocery list: ', combinedGroceryList);
    } else {
      // Case: item is already present
      // console.log(`${item.name} is already present`);

      // Search for the index of the matching item in combined list
      const matchingItemIndex = combinedGroceryList.findIndex(
        (matchingItem) => matchingItem.name === item.name
      );

      // Increment the quantity of the item
      // console.log(item);
      const { quantity } = item;
      const matchingItem = combinedGroceryList[matchingItemIndex];
      if (matchingItem.quantity && quantity) matchingItem.quantity += quantity;
    }
  });

  // Assign category to item
  combinedGroceryList.forEach((item) => {
    for (const category of categories) {
      if (item.name.includes(category.item)) {
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
    if (!groups.includes(item.section)) {
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

export { combineGroceries };
