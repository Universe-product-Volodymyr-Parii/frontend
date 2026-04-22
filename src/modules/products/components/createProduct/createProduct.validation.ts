import { z } from "zod";

import type { CreateProductPayload } from "../../types/products.types";
import type { ProductFormFieldsValues } from "./ProductFormFields";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().optional(),
  price: z.coerce.number().positive("Price should be greater than 0"),
});

export type CreateProductFormInput = z.input<typeof createProductSchema> & ProductFormFieldsValues;
export type CreateProductFormValues = z.output<typeof createProductSchema>;

export const createProductFormDefaultValues: CreateProductFormInput = {
  name: "",
  description: "",
  price: undefined,
};

export function toCreateProductPayload(values: CreateProductFormValues): CreateProductPayload {
  return {
    ...values,
    description: values.description?.trim() || undefined,
    name: values.name.trim(),
  };
}
