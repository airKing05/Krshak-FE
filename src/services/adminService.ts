// src/services/adminService.ts
import apiClient from "../utils/apiClient";

interface PriceData {
  productId: string
  marketId: string
  minPrice: number,
  maxPrice: number,
  date: string
}
// Markets
export const createMarket = (data: any) =>{
  console.log("this is ", data)
  return apiClient.post(`/markets`, data);
}
export const getAllMarkets = () =>
  apiClient.get(`/markets`).then((res) => res.data);

// Categories
export const createCategory = (data: { name: string }) =>
  apiClient.post(`/categories`, data);

export const getAllCategories = () =>
  apiClient.get(`/categories`).then((res) => res.data);

// Products
export const createProduct = (data: { name: string, categoryId: string, images?: string[] }) =>
  apiClient.post(`/products`, data);

export const getAllProducts = () =>
  apiClient.get(`/products`).then((res) => res.data);

// Prices
export const createPrice = (data: PriceData) =>
  apiClient.post(`/prices`, data);

export const getPricesByProduct = (productId: string) =>
  apiClient.get(`/prices/${productId}`).then((res) => res.data);

// market-categories
export const createMarketCategoriesLink = (data: { marketId: string, categoryId: string }) =>
  apiClient.post(`/market-categories`, data);

export const getMarketCategoriesLink = () =>
  apiClient.get(`/market-categories`).then((res) => res.data);

// market-products
export const createMarketProductsLink = (data: { marketId: string, categoryId: string, productId: string }) =>
  apiClient.post(`/market-products`, data);

export const getMarketProductsLink = () =>
  apiClient.get(`/market-products`).then((res) => res.data);

export const deleteSingleMarketProduct = (marketId: string, productId?:string) =>
  apiClient
    .delete(`/market-products/${marketId}/product/${productId}`)
    .then((res) => res.data);


// login
export const login = (email: string, password: string) => 
  apiClient.post(`/login`, { email, password }).then((res) => res.data);

export const getUserInfo = (token: string) => {

  return apiClient
    .get(`/user-info`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};
