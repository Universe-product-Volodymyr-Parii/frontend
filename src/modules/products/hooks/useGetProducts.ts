import { useEffect, useState } from "react";
import type { Product, ProductsResponse } from "../types/products.types";

const apiUrl = import.meta.env.VITE_API_URL;

export const useGetProducts = (limit: number = 15) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${apiUrl}/products?limit=${limit}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const result = (await response.json()) as ProductsResponse;

        setProducts(result.data);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;

        setError(e instanceof Error ? e.message : "Unexpected error");
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();

    return () => {
      controller.abort();
    };
  }, [limit]);

  return { products, isLoading, error };
};
