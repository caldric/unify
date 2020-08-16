interface Category {
  name: string;
  categories: string[];
}

const categories: Category[] = [
  { name: 'chicken', categories: ['meat'] },
  { name: 'carrot', categories: ['produce'] },
];

export { categories };
