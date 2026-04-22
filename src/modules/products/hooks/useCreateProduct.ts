import { useState } from "react";

import type { CreateProductPayload, Product } from "../types/products.types";
import { createProduct as createProductRequest } from "../services/products.service";

export function useCreateProduct() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const createProduct = async (payload: CreateProductPayload): Promise<Product | null> => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      return await createProductRequest(payload);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Unexpected error");
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetSubmitError = () => {
    setSubmitError(null);
  };

  return {
    isSubmitting,
    submitError,
    createProduct,
    resetSubmitError,
  };
}
