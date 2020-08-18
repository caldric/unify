interface Category {
  item: string;
  section:
    | 'meat'
    | 'produce'
    | 'oil'
    | 'condiment'
    | 'beverage'
    | 'noodle'
    | 'dairy'
    | 'soup'
    | 'pasta'
    | 'ethnic'
    | 'bread';
}

const categories: Category[] = [
  {
    item: 'broth',
    section: 'soup',
  },
  {
    item: 'chili flakes',
    section: 'condiment',
  },
  {
    item: 'tomato sauce',
    section: 'pasta',
  },
  {
    item: 'bay leaves',
    section: 'condiment',
  },
  {
    item: 'olives',
    section: 'condiment',
  },
  {
    item: 'potato',
    section: 'produce',
  },
  {
    item: 'oil',
    section: 'oil',
  },
  {
    item: 'bell pepper',
    section: 'produce',
  },
  {
    item: 'soy sauce',
    section: 'condiment',
  },
  {
    item: 'chicken cube',
    section: 'condiment',
  },
  {
    item: 'pork',
    section: 'meat',
  },
  {
    item: 'pea pods',
    section: 'produce',
  },
  {
    item: 'snow peas',
    section: 'produce',
  },
  {
    item: 'celery',
    section: 'produce',
  },
  {
    item: 'pancit',
    section: 'ethnic',
  },
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
