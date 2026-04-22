import { useGetProducts } from "../products/hooks/useGetProducts";

export function App() {
  const { products, isLoading, error } = useGetProducts();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-16">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl shadow-cyan-950/30 backdrop-blur">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            {isLoading ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-slate-300">
                Loading products from the backend...
              </div>
            ) : null}

            {error ? (
              <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-6 text-rose-100">
                {error}
              </div>
            ) : null}

            {!isLoading && !error && products.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-slate-300">
                The request succeeded, but the backend returned no products yet.
              </div>
            ) : null}

            {!isLoading && !error && products.length > 0 ? (
              <div className="space-y-3">
                {products.map((product) => (
                  <article
                    key={product.id}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {product.description}
                        </p>
                      </div>
                      <div className="shrink-0 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
                        ${product.price}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
