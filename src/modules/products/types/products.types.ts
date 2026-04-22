export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
};

export type ProductsResponse = {
  data: Product[];
  pagination: {
    hasNextPage: boolean;
    limit: number;
    nextCursor: number | null;
  };
};
