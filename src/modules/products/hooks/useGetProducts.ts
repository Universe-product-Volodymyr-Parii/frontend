import { useCallback, useEffect, useState } from "react";
import type { Product, ProductsPagination } from "../types/products.types";
import { getProducts } from "../services/products.service";

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

  const fetchProducts = useCallback(async (signal?: AbortSignal) => getProducts(limit, undefined, signal), [limit]);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchProducts(controller.signal);

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
  }, [fetchProducts]);

  const loadMore = async () => {
    if (!pagination.hasNextPage || pagination.nextCursor === null) return;

    try {
      setIsLoadingMore(true);
      setError(null);
      const result = await getProducts(limit, pagination.nextCursor);

      setProducts((currentProducts) => [...currentProducts, ...result.data]);
      setPagination(result.pagination);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unexpected error");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const refreshProducts = async () => {
    try {
      setIsLoadingMore(true);
      setError(null);

      const result = await fetchProducts();

      setProducts(result.data);
      setPagination(result.pagination);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unexpected error");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const loadNewProducts = async () => {
    const lastProductId = products.at(-1)?.id;

    if (lastProductId === undefined) {
      await refreshProducts();
      return;
    }

    try {
      setIsLoadingMore(true);
      setError(null);

      const result = await getProducts(limit, lastProductId);

      setProducts((currentProducts) => [...currentProducts, ...result.data]);
      setPagination(result.pagination);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unexpected error");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const removeProduct = (productId: number) => {
    setProducts((currentProducts) => currentProducts.filter((product) => product.id !== productId));
  };

  const addProduct = (product: Product) => {
    setProducts((currentProducts) => [...currentProducts, product]);
  };

  return {
    products,
    isLoading,
    isLoadingMore,
    error,
    hasNextPage: pagination.hasNextPage,
    loadMore,
    refreshProducts,
    loadNewProducts,
    removeProduct,
    addProduct,
  };
};
