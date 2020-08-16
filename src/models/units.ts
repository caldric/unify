interface Unit {
  name: string;
  type: 'volume' | 'weight';
  variants: string[];
}

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

export { units };
