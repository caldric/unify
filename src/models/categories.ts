interface Category {
  item: string;
  section: 'meat' | 'produce' | 'oil' | 'condiment' | 'beverage';
}

const categories: Category[] = [
  {
    item: 'chicken',
    section: 'meat',
  },
  {
    item: 'carrot',
    section: 'produce',
  },
  {
    item: 'zucchini',
    section: 'produce',
  },
  {
    item: 'olive oil',
    section: 'oil',
  },
  {
    item: 'sausage',
    section: 'meat',
  },
  {
    item: 'red pepper flakes',
    section: 'condiment',
  },
  {
    item: 'salt',
    section: 'condiment',
  },
  {
    item: 'pepper',
    section: 'condiment',
  },
  {
    item: 'onion',
    section: 'produce',
  },
  {
    item: 'tomato',
    section: 'produce',
  },
  {
    item: 'bread',
    section: 'bread',
  },
  {
    item: 'cheese',
    section: 'dairy',
  },
  {
    item: 'basil',
    section: 'produce',
  },
  {
    item: 'garlic',
    section: 'produce',
  },
  {
    item: 'beef',
    section: 'meat',
  },
  {
    item: 'cabbage',
    section: 'produce',
  },
  {
    item: 'pechay',
    section: 'produce',
  },
  {
    item: 'corn',
    section: 'produce',
  },
  {
    item: 'water',
    section: 'beverage',
  },
  {
    item: 'fish sauce',
    section: 'condiment',
  },
];

export { categories };
