import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { CreateProductPayload, Product } from "../../types/products.types";
import { ProductFormFields } from "./ProductFormFields";
import {
  createProductFormDefaultValues,
  createProductSchema,
  toCreateProductPayload,
  type CreateProductFormInput,
  type CreateProductFormValues,
} from "./createProduct.validation";

type CreateProductDialogProps = {
  isOpen: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  onClose: () => void;
  onCreate: (payload: CreateProductPayload) => Promise<Product | null>;
};

export function CreateProductDialog({
  isOpen,
  isSubmitting,
  submitError,
  onClose,
  onCreate,
}: CreateProductDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductFormInput, undefined, CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: createProductFormDefaultValues,
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (values: CreateProductFormValues) => {
    const payload: CreateProductPayload = toCreateProductPayload(values);

    const createdProduct = await onCreate(payload);

    if (createdProduct) {
      reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-slate-950/80">
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-2xl font-semibold text-white">Create product</DialogTitle>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <ProductFormFields register={register} errors={errors} />

            {submitError ? (
              <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                {submitError}
              </div>
            ) : null}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/50 hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Creating..." : "Create product"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
