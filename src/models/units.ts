interface Unit {
  name: string;
  type: 'volume' | 'weight';
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
];

export { units };
