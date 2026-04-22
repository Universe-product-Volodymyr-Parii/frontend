import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import type { Product } from "../../types/products.types";

type DeleteProductDialogProps = {
  product: Product | null;
  isDeleting: boolean;
  deleteError: string | null;
  onClose: () => void;
  onConfirm: (productId: number) => Promise<void>;
};

export function DeleteProductDialog({
  product,
  isDeleting,
  deleteError,
  onClose,
  onConfirm,
}: DeleteProductDialogProps) {
  const handleConfirm = () => {
    if (product) {
      onConfirm(product.id);
    }
  };

  return (
    <Dialog open={Boolean(product)} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-slate-950/80">
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-2xl font-semibold text-white">Remove product</DialogTitle>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              Close
            </button>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-300">
            Are you sure you want to remove <span className="font-medium text-white">{product?.name}</span>?
          </p>

          {deleteError ? (
            <div className="mt-4 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
              {deleteError}
            </div>
          ) : null}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!product || isDeleting}
              onClick={handleConfirm}
              className="rounded-full border border-rose-400/30 bg-rose-400/10 px-5 py-3 text-sm font-medium text-rose-200 transition hover:border-rose-300/50 hover:bg-rose-400/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? "Removing..." : "Remove product"}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
