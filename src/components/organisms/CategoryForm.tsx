import React, { useState } from "react";
import InputWithLabel from "../molecules/InputWithLabel";
import Button from "../atoms/Button";
import { createCategory } from "../../services/adminService";
import Text from "../atoms/Text";

const CategoryForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCategory({ name });
    setName("");
  };

  return (
    <div className="bg-white max-w-md mx-auto rounded-xl shadow-md p-6">
      <Text 
        variant="h3"
        className="text-xl font-semibold text-gray-800 mb-6"
      >
        Add New Category
      </Text>

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputWithLabel
          label="Category Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
        />
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-all duration-200"
        >Submit</Button>
      </form>
    </div>
  );
};

export default CategoryForm;
