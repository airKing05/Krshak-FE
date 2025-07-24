import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function MarketCategoryLinkForm() {
  const [markets, setMarkets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [marketId, setMarketId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await axios.get("http://localhost:5001/api/v1/markets");
      const res2 = await axios.get("http://localhost:5001/api/v1/categories");
      setMarkets(res1.data);
      setCategories(res2.data);
    };
    fetchData();
  }, []);

  const handleLink = async () => {
    try {
      await axios.post("http://localhost:5001/api/v1/market-categories", {
        marketId,
        categoryId,
      });
      toast.success("Linked successfully!");
      setMarketId("");
      setCategoryId("");
    } catch (err) {
      toast.error("Linking failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Link Market & Category</h2>
      <div className="mb-4">
        <label className="block font-medium">Market</label>
        <select
          className="mt-1 w-full border border-gray-300 rounded p-2"
          value={marketId}
          onChange={(e) => setMarketId(e.target.value)}
        >
          <option value="">Select Market</option>
          {markets.map((mkt) => (
            <option key={mkt._id} value={mkt._id}>
              {mkt.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-medium">Category</label>
        <select
          className="mt-1 w-full border border-gray-300 rounded p-2"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleLink}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Link
      </button>
    </div>
  );
}
