export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
};

export type CreateProductPayload = {
  name: string;
  description?: string;
  price: number;
};

export type ProductsPagination = {
  hasNextPage: boolean;
  limit: number;
  nextCursor: number | null;
};

export type ProductsResponse = {
  data: Product[];
  pagination: ProductsPagination;
};
