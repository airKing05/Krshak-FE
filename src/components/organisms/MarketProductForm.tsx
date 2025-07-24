import { useEffect, useState } from "react";
import axios from "axios";

const MarketProductForm = () => {
  const [formData, setFormData] = useState({
    marketId: "",
    categoryId: "",
    productId: "",
  });

  const [markets, setMarkets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/v1/markets").then((res) => setMarkets(res.data));
    axios.get("http://localhost:5001/api/v1/categories").then((res) => setCategories(res.data));
    axios.get("http://localhost:5001/api/v1/products").then((res) => setProducts(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/v1/market-products", formData);
      alert("Market-Product linked successfully!");
      setFormData({ marketId: "", categoryId: "", productId: "" });
    } catch (error) {
      console.error(error);
      alert("Error submitting form");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-md w-full"
    >
      <h2 className="text-xl font-semibold mb-4">Link Market Product</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Market</label>
        <select
          name="marketId"
          value={formData.marketId}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Market</option>
          {markets.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Category</label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Product</label>
        <select
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default MarketProductForm;
