type ProductsStateProps = {
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
};

export function ProductsState({ isLoading, error, isEmpty }: ProductsStateProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-slate-300">Loading products...</div>
    );
  }

  if (error) {
    return <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-6 text-rose-100">{error}</div>;
  }

  if (isEmpty) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-slate-300">
        The request succeeded, but product list empty.
      </div>
    );
  }

  return null;
}
