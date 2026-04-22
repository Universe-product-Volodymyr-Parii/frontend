import { useGetProducts } from "../hooks/useGetProducts";
import { ProductsList } from "./ProductsList";
import { ProductsState } from "./ProductsState";

export function ProductsSection() {
  const { products, isLoading, isLoadingMore, error, hasNextPage, loadMore } = useGetProducts();
  const isEmpty = !isLoading && !error && products.length === 0;
  const hasProducts = !isLoading && !error && products.length > 0;
  let statusText = `${products.length} loaded`;

  if (isLoading) {
    statusText = "Loading...";
  } else if (isLoadingMore) {
    statusText = "Loading more...";
  } else if (error) {
    statusText = "Request failed";
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Products</h2>
        <div className="text-sm text-slate-400">{statusText}</div>
      </div>

      <ProductsState isLoading={isLoading} error={error} isEmpty={isEmpty} />

      {hasProducts ? (
        <>
          <ProductsList products={products} />
          <div className="mt-6 flex justify-center">
            {hasNextPage ? (
              <button
                type="button"
                onClick={loadMore}
                disabled={isLoadingMore}
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/50 hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoadingMore ? "Loading..." : "Load more products"}
              </button>
            ) : (
              <div className="text-sm text-slate-400">All products are loaded.</div>
            )}
          </div>
        </>
      ) : null}
    </section>
  );
}
