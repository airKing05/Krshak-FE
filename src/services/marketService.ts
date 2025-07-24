// src/services/marketService.ts
import axios from "axios";

export const createMarket = async (data: { name: string }) => {
  return axios.post("http://localhost:5001/api/v1/markets", data);
};

export const getMarkets = async () => {
  return axios.get("http://localhost:5001/api/v1/markets");
};
