import axios from "axios";

const API = "http://localhost:5001/api/v1"; // change this based on environment

// market-categories
export const getMarketCategories = (marketId:string) =>
  axios.get(`${API}/market-categories/${marketId}/categories`).then((res) => res.data);

// market-products
export const getMarketProducts = (marketId: string, categoryId?:string) =>
  axios.get(`${API}/market-products/${marketId}?categories=${categoryId}`).then((res) => res.data);
