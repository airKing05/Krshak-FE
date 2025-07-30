export type Filters = {
  market1Id: string;
  market2Id: string;
  categoryId: string;
  date: string;
};

export type FilterChangeEvent = {
  target: {
    name: string;
    value: string;
  };
};