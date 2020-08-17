import { units } from './units';
import { categories } from './categories';

interface GroceryItem {
  input: string;
  quantity: number;
  unit: string;
  name: string;
  section: string;
}

interface GroceryOutput {
  section: string;
  contents: GroceryItem[];
}

// General functions
const convertToDecimal = (fractionString: string): number => {
  const numbers: string[] = fractionString.split('/');
  if (numbers.length === 2) {
    const numerator: number = Number(numbers[0]);
    const denominator: number = Number(numbers[1]);
    return numerator / denominator;
  } else {
    return 0;
  }
};

// Conversion functions
// Store each item as an element in an array
const inputToList = (userTextInput: string): GroceryItem[] => {
  const output: GroceryItem[] = userTextInput.split('\n').map((item) => {
    // Set up default values
    return { input: item, quantity: 0, unit: 'count', name: '', section: '' };
  });
  return output;
};

// Remove new line characters from list
const removeWhitespace = (groceryList: GroceryItem[]): GroceryItem[] => {
  return groceryList.filter((item) => item.input !== '');
};

// Convert all items to lowercase
const inputToLowercase = (groceryList: GroceryItem[]): GroceryItem[] => {
  const output: GroceryItem[] = groceryList.map((item) => {
    const { input, quantity, unit, name, section } = item;
    const newInput = input.toLowerCase();
    return { quantity, unit, section, name, input: newInput };
  });

  return output;
};

// Remove adjectives, i.e., characters after comma
// Assumption: adjectives after the comma are unneeded
const removeAdjectives = (groceryList: GroceryItem[]): GroceryItem[] => {
  const output: GroceryItem[] = groceryList.map((item) => {
    const { input, quantity, unit, name, section } = item;
    const commaIndex = input.indexOf(',');
    const newInput = commaIndex !== -1 ? input.slice(0, commaIndex) : input;
    return { quantity, unit, name, section, input: newInput };
  });

  return output;
};

// Extract quantity from input
const getQuantities = (groceryList: GroceryItem[]): GroceryItem[] => {
  const output: GroceryItem[] = groceryList.map((item) => {
    const { input, unit, name, section } = item;

    const qtyRegex = /\d+((\/\d+)|(.\d+))?/;
    const regexMatch = input.match(qtyRegex);
    const quantityString: string = regexMatch ? regexMatch[0] : '';
    const newQuantity: number = input.includes('/')
      ? convertToDecimal(quantityString)
      : Number(quantityString);

    return { input, unit, name, section, quantity: newQuantity };
  });

  return output;
};

// Extract units from input
const getUnits = (groceryList: GroceryItem[]): GroceryItem[] => {
  const output: GroceryItem[] = groceryList.map((item) => {
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
const getName = (groceryList: GroceryItem[]): GroceryItem[] => {
  const output = groceryList.map((item) => {
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
      // Regex: one or more digits followed by an optional denominator
      // or an optional decimal part followed by a whitespace character
      const qtyRegex = /\d+((\/\d+)|(.\d+))?\s+/;
      newName = input.replace(qtyRegex, '');
    }

    return { input, quantity, unit, section, name: newName };
  });

  return output;
};

// Assign categories based on name
const assignCategories = (groceryList: GroceryItem[]): GroceryItem[] => {
  const output: GroceryItem[] = groceryList.map((item) => {
    const { input, quantity, unit, name, section } = item;
    let newSection = section;

    for (const category of categories) {
      if (item.name.includes(category.item)) {
        newSection = category.section;
        break;
      } else {
        newSection = 'other';
      }
    }

    return { input, quantity, unit, name, section: newSection };
  });

  return output;
};

// Combine the quantities of similar items
const combineQuantities = (groceryList: GroceryItem[]): GroceryItem[] => {
  let combinedGroceryList: GroceryItem[] = [];
  const combinedItemNames: string[] = [];

  groceryList.forEach((item) => {
    // Check if item is already present in the grocery list inputs
    if (!combinedItemNames.includes(item.name)) {
      // Case: item is not yet present
      combinedItemNames.push(item.name);

      // Store the new item in combinedGroceryList
      const { input, quantity, unit, name, section } = item;
      combinedGroceryList.push({ input, quantity, unit, name, section });
    } else {
      // Case: item is already present
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

// Sort by section
const sortBySection = (groceryList: GroceryItem[]): GroceryItem[] => {
  return [...groceryList].sort((a, b) => a.section.localeCompare(b.section));
};

// Group by section
const groupBySection = (groceryList: GroceryItem[]): GroceryOutput[] => {
  const groupedGroceryList: GroceryOutput[] = [];
  const groups: string[] = [];

  groceryList.forEach((item) => {
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

// Main app logic function
const combineGroceries = (groceries: string): GroceryOutput[] => {
  let groceryList = inputToList(groceries);
  groceryList = removeWhitespace(groceryList);
  groceryList = inputToLowercase(groceryList);
  groceryList = removeAdjectives(groceryList);
  groceryList = getQuantities(groceryList);
  groceryList = getUnits(groceryList);
  groceryList = getName(groceryList);

  let combinedGroceryList = combineQuantities(groceryList);
  combinedGroceryList = assignCategories(combinedGroceryList);
  combinedGroceryList = sortBySection(combinedGroceryList);

  const groupedGroceryList = groupBySection(combinedGroceryList);

  return groupedGroceryList;
};

export { combineGroceries };
