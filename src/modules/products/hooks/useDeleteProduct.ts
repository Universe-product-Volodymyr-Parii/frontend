import { useState } from "react";
import { deleteProduct as deleteProductRequest } from "../services/products.service";

export function useDeleteProduct() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteProduct = async (productId: number): Promise<boolean> => {
    try {
      setIsDeleting(true);
      setDeleteError(null);
      await deleteProductRequest(productId);
      return true;
    } catch (e) {
      setDeleteError(e instanceof Error ? e.message : "Unexpected error");
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const resetDeleteError = () => {
    setDeleteError(null);
  };

  return {
    isDeleting,
    deleteError,
    deleteProduct,
    resetDeleteError,
  };
}
