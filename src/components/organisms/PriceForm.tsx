import React, { useEffect, useState } from "react";
import axios from "axios";
import LabeledInput from "../molecules/LabeledInput";

const PriceForm = () => {
  const [productId, setProductId] = useState("");
  const [marketId, setMarketId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [date, setDate] = useState("");
  const [products, setProducts] = useState([]);
  const [markets, setMarkets] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:5001/api/v1/products").then((res) => setProducts(res.data));
    axios.get("http://localhost:5001/api/v1/markets").then((res) => setMarkets(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:5001/api/v1/prices", {
      productId,
      marketId,
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
      date,
    });
    setProductId("");
    setMarketId("")
    setMinPrice("");
    setMaxPrice("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Add Price</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Select Market</label>
        <select
          className="w-full border px-4 py-2 rounded"
          value={marketId}
          onChange={(e) => setMarketId(e.target.value)}
        >
          <option value="">-- Select Product --</option>
          {markets.map((market) => (
            <option key={market._id} value={market._id}>
              {market.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Select Product</label>
        <select
          className="w-full border px-4 py-2 rounded"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">-- Select Product --</option>
          {products.map((prod) => (
            <option key={prod._id} value={prod._id}>
              {prod.name}
            </option>
          ))}
        </select>
      </div>

      <LabeledInput
        label="Min Price"
        name="minPrice"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        type="number"
      />
      <LabeledInput
        label="Max Price"
        name="maxPrice"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        type="number"
      />
      <LabeledInput
        label="Date"
        name="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        type="date"
      />

      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Submit
      </button>
    </form>
  );
};

export default PriceForm;
