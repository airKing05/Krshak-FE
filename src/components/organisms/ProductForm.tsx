import React, { useEffect, useState } from "react";
import axios from "axios";
import LabeledInput from "../molecules/LabeledInput";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/v1/categories").then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:5001/api/v1/products", { name, categoryId });
    setName("");
    setCategoryId("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Add Product</h2>
      <LabeledInput
        label="Product Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Select Category</label>
        <select
          className="w-full border px-4 py-2 rounded"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
