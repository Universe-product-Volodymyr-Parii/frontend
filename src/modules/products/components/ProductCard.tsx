import type { Product } from "../types/products.types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium text-white">{product.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">{product.description}</p>
        </div>
        <div className="shrink-0 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
          ${product.price}
        </div>
      </div>
    </article>
  );
}
