import axios from "axios";

const API = "http://localhost:5001/api/v1"; // change this based on environment

interface dataForComparisonTypes {
  market1Id: string
  market2Id: string
  categoryId: string,
  date: string,
  page: number,
  limit: number
}

// market-categories
export const getMarketCategories = (marketId:string) =>
  axios.get(`${API}/market-categories/${marketId}/categories`).then((res) => res.data);

// market-products
export const getMarketProducts = (marketId: string, categoryId?:string, product?:string) =>
  axios.get(`${API}/market-products/${marketId}?categoryId=${categoryId}&product=${product}`).then((res) => res.data);

// single products details with prices history by marketId and productId
export const getSingleProductDetail = (marketId: string, productId?:string) =>
  axios.get(`${API}/market-products/${marketId}/product/${productId}?days=6`).then((res) => res.data);

// compare two different market prices by date or category's filters
export const getCompareProductPriceOf2Markets = (dataForComparison: dataForComparisonTypes) =>{
  const { market1Id, market2Id, categoryId, date, page, limit } = dataForComparison;
  return axios.get(`${API}/compare-price?market1Id=${market1Id}&market2Id=${market2Id}&categoryId=${categoryId}&date=${date}`,
    {
      params: {
        page: page,
        limit: limit
      }
    }
  ).then((res) => res.data);
}