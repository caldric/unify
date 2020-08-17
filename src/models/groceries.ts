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

// Remove adjectives, i.e., characters after comma
// Assumption: adjectives after the comma are unneeded
const removeAdjectives = (input: GroceryOutput[]): GroceryOutput[] => {
  const output: GroceryOutput[] = input.map((item) => {
    const { input, quantity, unit, name, section } = item;
    const commaIndex = input.indexOf(',');
    const newInput = commaIndex !== -1 ? input.slice(0, commaIndex) : input;
    return { quantity, unit, name, section, input: newInput };
  });

  return output;
};

// Extract quantity from input
const getQuantities = (input: GroceryOutput[]): GroceryOutput[] => {
  const output: GroceryOutput[] = input.map((item) => {
    const { input, unit, name, section } = item;
    const qtyRegex = /\d+/;
    const newQuantity: number = Number(input.match(qtyRegex));
    return { input, unit, name, section, quantity: newQuantity };
  });

  return output;
};

// Extract units from input
const getUnits = (input: GroceryOutput[]): GroceryOutput[] => {
  const output: GroceryOutput[] = input.map((item) => {
    const { input, quantity, unit, name, section } = item;
    let newUnit = unit;

    for (const unit of units) {
      let unitFound = false;

      for (const unitVariant of unit.variants) {
        // console.log('Current unit variant: ', unitVariant);
        if (input.includes(unitVariant)) {
          newUnit = unit.name;
          unitFound = true;
          break;
        }
      }

      if (unitFound) break;
    }

    return { input, quantity, name, section, unit: newUnit };
  });

  return output;
};

// Extract name from input
const getName = (input: GroceryOutput[]): GroceryOutput[] => {
  const output = input.map((item) => {
    const { input, quantity, unit, name, section } = item;
    let newName = name;

    if (unit !== 'count') {
      // If unit is present, item name is after the unit

      // Get matching unit and its variants
      const matchingUnitIndex = units.findIndex((u) => u.name === unit);
      const unitVariants = units[matchingUnitIndex].variants;

      // Get matching unit variant
      let matchingUnitVariant = '';
      for (const unitVariant of unitVariants) {
        if (input.includes(unitVariant)) {
          matchingUnitVariant = unitVariant;
          break;
        }
      }

      // Get item name after unit
      // Assumption: item name is after the unit and ONE space
      const matchingUnitVariantIndex = input.indexOf(matchingUnitVariant);
      newName = input.slice(
        matchingUnitVariantIndex + matchingUnitVariant.length + 1
      );
    } else {
      // If unit is not present, item name is after the quantity
      // Regex: one or more digits followed by zero or more spaces
      const qtyRegex = /\d+\s*/;
      newName = input.replace(qtyRegex, '');
    }

    return { input, quantity, unit, section, name: newName };
  });

  return output;
};

// Main app logic function
const combineGroceries = (groceries: string): GroupedGroceryOutput[] => {
  let groceryList = inputToList(groceries);
  groceryList = removeWhitespace(groceryList);
  groceryList = inputToLowercase(groceryList);
  groceryList = removeAdjectives(groceryList);
  groceryList = getQuantities(groceryList);
  groceryList = getUnits(groceryList);
  groceryList = getName(groceryList);

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
