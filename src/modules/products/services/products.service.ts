import type { CreateProductPayload, Product, ProductsResponse } from "../types/products.types";

const apiUrl = import.meta.env.VITE_API_URL;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function getProducts(
  limit: number,
  cursor?: number | null,
  signal?: AbortSignal,
): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    limit: String(limit),
  });

  if (cursor !== undefined && cursor !== null) {
    params.set("cursor", String(cursor));
  }

  const response = await fetch(`${apiUrl}/products?${params.toString()}`, {
    signal,
  });

  return handleResponse<ProductsResponse>(response);
}

export async function createProduct(payload: CreateProductPayload): Promise<Product> {
  const response = await fetch(`${apiUrl}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<Product>(response);
}

export async function deleteProduct(productId: number): Promise<void> {
  const response = await fetch(`${apiUrl}/products/${productId}`, {
    method: "DELETE",
  });

  await handleResponse<{ message: string }>(response);
}
