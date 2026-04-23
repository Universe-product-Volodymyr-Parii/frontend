import { ProductsSection } from "../components/ProductsSection";

export function ProductsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center px-6 py-16">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl shadow-cyan-950/30 backdrop-blur">
          <ProductsSection />
        </div>
      </div>
    </main>
  );
}
