import { useState } from "react";

import { useCreateProduct } from "../hooks/useCreateProduct";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { useGetProducts } from "../hooks/useGetProducts";
import { CreateProductDialog } from "./createProduct/CreateProductDialog";
import { DeleteProductDialog } from "./deleteProduct/DeleteProductDialog";
import { ProductsState } from "./productList/ProductsState";
import { ProductsList } from "./productList/ProductsList";
import type { Product } from "../types/products.types";

export function ProductsSection() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [hasPendingCreatedProducts, setHasPendingCreatedProducts] = useState(false);
  const {
    products,
    isLoading,
    isLoadingMore,
    error,
    hasNextPage,
    loadMore,
    refreshProducts,
    removeProduct,
    addProduct,
  } = useGetProducts();
  const { isSubmitting, submitError, createProduct, resetSubmitError } = useCreateProduct();
  const { isDeleting, deleteError, deleteProduct, resetDeleteError } = useDeleteProduct();
  const isEmpty = !isLoading && !error && products.length === 0;
  const hasProducts = !isLoading && !error && products.length > 0;
  let statusText = `${products.length} loaded`;

  if (isLoading) {
    statusText = "Loading...";
  } else if (isLoadingMore) {
    statusText = "Loading more...";
  } else if (error) {
    statusText = "Request failed";
  }

  const openCreateDialog = () => {
    resetSubmitError();
    setIsCreateDialogOpen(true);
  };

  const closeCreateDialog = () => {
    resetSubmitError();
    setIsCreateDialogOpen(false);
  };

  const openDeleteDialog = (product: Product) => {
    resetDeleteError();
    setProductToDelete(product);
  };

  const closeDeleteDialog = () => {
    resetDeleteError();
    setProductToDelete(null);
  };

  const handleCreateProduct = async (payload: { name: string; description?: string; price: number }) => {
    const shouldAddCreatedProduct = isEmpty && !hasNextPage;
    const createdProduct = await createProduct(payload);

    if (createdProduct && shouldAddCreatedProduct) {
      addProduct(createdProduct);
    } else if (createdProduct) {
      setHasPendingCreatedProducts(true);
    }

    return createdProduct;
  };

  const handleDeleteProduct = async (productId: number) => {
    const shouldLoadMore = products.length === 1 && hasNextPage;
    const isDeleted = await deleteProduct(productId);

    if (isDeleted) {
      removeProduct(productId);
      closeDeleteDialog();

      if (shouldLoadMore) {
        await loadMore();
      }
    }
  };

  const handleRefreshProducts = async () => {
    await refreshProducts();
    setHasPendingCreatedProducts(false);
  };

  return (
    <>
      <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Products</h2>
            <div className="mt-1 text-sm text-slate-400">{statusText}</div>
          </div>
          <button
            type="button"
            onClick={openCreateDialog}
            className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/50 hover:bg-cyan-400/20"
          >
            Create new product
          </button>
        </div>

        <ProductsState isLoading={isLoading} error={error} isEmpty={isEmpty} />

        {hasProducts ? <ProductsList products={products} onDelete={openDeleteDialog} /> : null}

        {!isLoading && !error ? (
          <div className="mt-6 flex justify-center">
            {hasNextPage ? (
              <button
                type="button"
                onClick={loadMore}
                disabled={isLoadingMore}
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/50 hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoadingMore ? "Loading..." : "Load more products"}
              </button>
            ) : hasPendingCreatedProducts ? (
              <button
                type="button"
                onClick={handleRefreshProducts}
                disabled={isLoadingMore}
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-200 transition hover:border-cyan-300/50 hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoadingMore ? "Loading..." : "Load new products"}
              </button>
            ) : hasProducts ? (
              <div className="text-sm text-slate-400">All products are loaded.</div>
            ) : null}
          </div>
        ) : null}
      </section>

      <CreateProductDialog
        isOpen={isCreateDialogOpen}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onClose={closeCreateDialog}
        onCreate={handleCreateProduct}
      />
      <DeleteProductDialog
        product={productToDelete}
        isDeleting={isDeleting}
        deleteError={deleteError}
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteProduct}
      />
    </>
  );
}
