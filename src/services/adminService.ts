// src/services/adminService.ts
import axios from "axios";

const API = "http://localhost:5001/api/v1"; // change this based on environment

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
export const createProduct = (data: { name: string }) =>
  axios.post(`${API}/products`, data);

export const getAllProducts = () =>
  axios.get(`${API}/products`).then((res) => res.data);

// Prices
export const createPrice = (data: any) =>
  axios.post(`${API}/prices`, data);

export const getPricesByProduct = (productId: string) =>
  axios.get(`${API}/prices/${productId}`).then((res) => res.data);
