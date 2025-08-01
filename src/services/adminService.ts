// src/services/adminService.ts
import axios from "axios";
import { getFromLocalStorage } from "../utils/localStorage";

const API = "http://localhost:5001/api/v1"; // change this based on environment

interface PriceData {
  productId: string
  marketId: string
  minPrice: number,
  maxPrice: number,
  date: string
}
// Markets
export const createMarket = (data: { name: string }) =>
  axios.post(`${API}/markets`, data);

export const getAllMarkets = () =>
  axios.get(`${API}/markets`).then((res) => res.data);

// Categories
export const createCategory = (data: { name: string }) =>
  axios.post(`${API}/categories`, data);

export const getAllCategories = () =>
  axios.get(`${API}/categories`).then((res) => res.data);

// Products
export const createProduct = (data: { name: string, categoryId: string }) =>
  axios.post(`${API}/products`, data);

export const getAllProducts = () =>
  axios.get(`${API}/products`).then((res) => res.data);

// Prices
export const createPrice = (data: PriceData) =>
  axios.post(`${API}/prices`, data);

export const getPricesByProduct = (productId: string) =>
  axios.get(`${API}/prices/${productId}`).then((res) => res.data);

// market-categories
export const createMarketCategoriesLink = (data: { marketId: string, categoryId: string }) =>
  axios.post(`${API}/market-categories`, data);

export const getMarketCategoriesLink = () =>
  axios.get(`${API}/market-categories`).then((res) => res.data);

// market-products
export const createMarketProductsLink = (data: { marketId: string, categoryId: string, productId: string }) =>
  axios.post(`${API}/market-products`, data);

export const getMarketProductsLink = () =>
  axios.get(`${API}/market-products`).then((res) => res.data);


// login
export const login = (email: string, password: string) => 
  axios.post(`${API}/login`, { email, password }).then((res) => res.data);

export const getUserInfo = () => {
  const {token} = getFromLocalStorage('token');
  console.log("token", token)
  return axios
    .get(`${API}/user-info`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};
