import React, { useEffect, useState } from "react";
import LabeledInput from "../molecules/LabeledInput";
import SelectWithLabel from "../molecules/SelectWithLabel";
import Button from "../atoms/Button";
import { createProduct, getAllCategories } from "../../services/adminService";
import Text from "../atoms/Text";

type Category = {
  _id: string;
  name: string;
};

const ProductForm = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategoriesList = async () => {
    const res = await getAllCategories()
    setCategories(res);
  }
  useEffect(() => {
    getCategoriesList();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct({ name, categoryId });
    setName("");
    setCategoryId("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto">
      <Text 
        variant="h3"
        className="text-xl font-semibold text-gray-800 mb-6"
      >
        Add Product
      </Text>

      <div className="space-y-4">
        <LabeledInput
          label="Product Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <SelectWithLabel
          label="Select Category"
          name="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          options={categories.map((cat) => ({ label: cat.name, value: cat._id }))}
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-all duration-200"
      >Submit</Button>
    </form>
  );
};

export default ProductForm;
