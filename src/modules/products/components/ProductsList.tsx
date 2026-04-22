import type { Product } from "../types/products.types";
import { ProductCard } from "./ProductCard";

type ProductsListProps = {
  products: Product[];
};

export function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="space-y-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
