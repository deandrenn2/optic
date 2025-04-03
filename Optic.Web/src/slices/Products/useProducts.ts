import { useMutation, useQuery } from '@tanstack/react-query';
import {
   createCategoryService,
   createProductService,
   deleteProductService,
   getCategories,
   getPagerProducts,
   getPagerProductsStock,
   getProducts,
   getValidateProduct,
   updateCategoryService,
   updateProductService,
   updateQuantityService,
} from './ProductsServices';
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

export const useProductsPager = (page: number = 1, pageSize: number = 5) => {
   const queryProducts = useQuery({
      queryKey: [`${KEY}_pager`, page, pageSize],
      queryFn: () => getPagerProducts(page, pageSize),
      refetchOnWindowFocus: false,
   });

   return {
      queryProducts,
      products: queryProducts?.data?.data,
   };
};

export const useProductsStockPager = (page: number = 1, pageSize: number = 5) => {
   const queryProducts = useQuery({
      queryKey: [`${KEY}_stock_pager`, page, pageSize],
      queryFn: () => getPagerProductsStock(page, pageSize),
      refetchOnWindowFocus: false,
   });

   return {
      queryProducts,
      products: queryProducts?.data?.data,
      count: queryProducts?.data?.count,
      pager: queryProducts?.data,
   };
};

export const useValidateProduct = (code?: string | null) => {
   const queryValidateProduct = useQuery({
      queryKey: [`${KEY}_Validate_${code}`],
      queryFn: () => getValidateProduct(code),
      enabled: !!code && code.length > 0,
   });

   const mutationValidateProduct = useMutation({
      mutationFn: getValidateProduct,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.error?.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryValidateProduct.refetch();
            }
         }
      },
   });

   return {
      queryValidateProduct,
      mutationValidateProduct,
      validateProduct: queryValidateProduct?.data?.data,
   };
};

export const useCategories = () => {
   const queryCategories = useQuery({
      queryKey: [`CATEGORIES`],
      queryFn: getCategories,
      refetchOnWindowFocus: false,
   });

   const createCategory = useMutation({
      mutationFn: createCategoryService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
               queryCategories.refetch();
            }
         }
      },
   });

   const updateCategory = useMutation({
      mutationFn: updateCategoryService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
            queryCategories.refetch();
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
            }
         }
      },
   });

   return {
      queryCategories,
      categories: queryCategories?.data?.data,
      createCategory,
      updateCategory,
   };
};

export const useQuantity = () => {
   const updateQuantity = useMutation({
      mutationFn: updateQuantityService,
      onSuccess: (data) => {
         if (!data.isSuccess) {
            toast.info(data.message);
         } else {
            if (data.isSuccess) {
               toast.success(data.message);
            }
         }
      },
   });
   return {
      updateQuantity,
   };
};
