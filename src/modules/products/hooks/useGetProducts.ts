import { useEffect, useState } from "react";
import type { Product, ProductsPagination, ProductsResponse } from "../types/products.types";

const apiUrl = import.meta.env.VITE_API_URL;
const initialPagination: ProductsPagination = {
  hasNextPage: false,
  limit: 15,
  nextCursor: null,
};

export const useGetProducts = (limit: number = 15) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<ProductsPagination>(initialPagination);

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
        setPagination(result.pagination);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;

        setError(e instanceof Error ? e.message : "Unexpected error");
        setProducts([]);
        setPagination(initialPagination);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();

    return () => controller.abort();
  }, [limit]);

  const loadMore = async () => {
    if (!pagination.hasNextPage || pagination.nextCursor === null) return;

    try {
      setIsLoadingMore(true);
      setError(null);

      const response = await fetch(`${apiUrl}/products?limit=${limit}&cursor=${pagination.nextCursor}`);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = (await response.json()) as ProductsResponse;

      setProducts((currentProducts) => [...currentProducts, ...result.data]);
      setPagination(result.pagination);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unexpected error");
    } finally {
      setIsLoadingMore(false);
    }
  };

  return {
    products,
    isLoading,
    isLoadingMore,
    error,
    hasNextPage: pagination.hasNextPage,
    loadMore,
  };
};
