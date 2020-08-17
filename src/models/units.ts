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
    name: 'lb',
    type: 'weight',
    variants: ['pounds', 'pound', 'lbs', 'lb'],
  },
  {
    name: 'count',
    type: 'count',
    variants: ['count'],
  },
];

export { units };
