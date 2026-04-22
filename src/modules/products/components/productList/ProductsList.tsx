import type { Product } from "../../types/products.types";
import { ProductCard } from "./ProductCard";

type ProductsListProps = {
  products: Product[];
  onDelete: (product: Product) => void;
};

export function ProductsList({ products, onDelete }: ProductsListProps) {
  return (
    <div className="space-y-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onDelete={onDelete} />
      ))}
    </div>
  );
}
