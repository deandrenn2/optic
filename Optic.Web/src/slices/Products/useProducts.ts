import { useMutation, useQuery } from '@tanstack/react-query';
import { createProductService, deleteProductService, getCategories, getProducts, updateProductService } from './ProductsServices';
import { toast } from 'react-toastify';

const KEY = 'Products';

export const useProducts = () => {
   const queryProducts = useQuery({
      queryKey: [KEY],
      queryFn: getProducts,
   });

   const createProduct = useMutation({
      mutationFn: createProductService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryProducts.refetch();
            }
         }
      },
   });

   const deleteProduct = useMutation({
      mutationFn: deleteProductService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryProducts.refetch();
            }
         }
      },
   });

   const updateProduct = useMutation({
      mutationFn: updateProductService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryProducts.refetch();
            }
         }
      },
   });

   return {
      queryProducts,
      products: queryProducts?.data?.data,
      createProduct,
      deleteProduct,
      updateProduct,
   };
};

export const useCategories = () => {
   const queryCategories = useQuery({
      queryKey: [`CATEGORIES`],
      queryFn: getCategories,
   });

   return {
      queryCategories,
      categories: queryCategories?.data?.data,
   };
};
