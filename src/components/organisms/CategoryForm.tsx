import React, { useState } from "react";
import axios from "axios";
import LabeledInput from "../molecules/LabeledInput";

const CategoryForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:5001/api/v1/categories", { name });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Add Category</h2>
      <LabeledInput
        label="Category Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
