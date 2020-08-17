interface Unit {
  name: string;
  type: 'volume' | 'weight' | 'count';
  variants: string[];
}

const units: Unit[] = [
  {
    name: 'tbsp',
    type: 'volume',
    variants: ['tbsps', 'tbsp', 'tablespoons', 'tablespoon'],
  },
  {
    name: 'tsp',
    type: 'volume',
    variants: ['tsps', 'tsp', 'teaspoons', 'teaspoon'],
  },
  {
    name: 'cups',
    type: 'volume',
    variants: ['cups', 'cup'],
  },
  {
    name: 'lb',
    type: 'weight',
    variants: ['pounds', 'pound', 'lbs', 'lb'],
  },
  {
    name: 'oz',
    type: 'weight',
    variants: ['ounces', 'ounce', 'oz'],
  },
  {
    name: 'count',
    type: 'count',
    variants: ['count'],
  },
  {
    name: 'links',
    type: 'count',
    variants: ['links', 'link'],
  },
  {
    name: 'cloves',
    type: 'count',
    variants: ['cloves', 'clove'],
  },
];

export { units };
