import type { FieldErrors, UseFormRegister } from "react-hook-form";

export type ProductFormFieldsValues = {
  name: string;
  description?: string;
  price: unknown;
};

type ProductFormFieldsProps = {
  register: UseFormRegister<ProductFormFieldsValues>;
  errors: FieldErrors<ProductFormFieldsValues>;
};

export function ProductFormFields({ register, errors }: ProductFormFieldsProps) {
  return (
    <>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-200">Name</span>
        <input
          {...register("name")}
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/60"
          placeholder="MacBook Pro"
        />
        {errors.name ? <span className="mt-2 block text-sm text-rose-300">{errors.name.message}</span> : null}
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-200">Description</span>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/60 resize-none"
          placeholder="14-inch laptop"
        />
        {errors.description ? (
          <span className="mt-2 block text-sm text-rose-300">{errors.description.message}</span>
        ) : null}
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-200">Price</span>
        <input
          {...register("price")}
          type="number"
          step="0.01"
          min="0"
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/60"
          placeholder="1999.99"
        />
        {errors.price ? <span className="mt-2 block text-sm text-rose-300">{errors.price.message}</span> : null}
      </label>
    </>
  );
}
