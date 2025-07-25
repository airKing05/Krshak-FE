import React, { useEffect, useState } from "react";
import SelectWithLabel from "../molecules/SelectWithLabel";
import InputWithLabel from "../molecules/InputWithLabel";
import Button from "../atoms/Button";
import { createPrice, getAllMarkets, getAllProducts } from "../../services/adminService";
import Text from "../atoms/Text";


const PriceForm = () => {
  const [productId, setProductId] = useState("");
  const [marketId, setMarketId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [date, setDate] = useState("");
  const [products, setProducts] = useState([]);
  const [markets, setMarkets] = useState([]);


  useEffect(() => {
    getAllProducts().then((res) => setProducts(res));
    getAllMarkets().then((res) => setMarkets(res));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPrice({
      productId,
      marketId,
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
      date,
    })

    setProductId("");
    setMarketId("");
    setMinPrice("");
    setMaxPrice("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
      <Text 
        variant="h3"
        className="text-xl font-semibold text-gray-800 mb-6"
      >
        Add Price
      </Text>

      <SelectWithLabel
        label="Select Market"
        name="market"
        value={marketId}
        onChange={(e) => setMarketId(e.target.value)}
        options={markets.map((market) => ({
          label: market.name,
          value: market._id,
        }))}
      />

      <SelectWithLabel
        label="Select Product"
        name="product"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        options={products.map((product) => ({
          label: product.name,
          value: product._id,
        }))}
      />

      <InputWithLabel
        label="Min Price"
        name="minPrice"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <InputWithLabel
        label="Max Price"
        name="maxPrice"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <InputWithLabel
        label="Date"
        name="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-all duration-200"
      >Submit</Button>
    </form>
  );
};

export default PriceForm;
