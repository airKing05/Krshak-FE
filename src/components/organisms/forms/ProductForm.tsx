import React, { useEffect, useState } from "react";
import SelectWithLabel from "../../molecules/SelectWithLabel";
import Button from "../../atoms/Button";
import { createProduct, getAllCategories } from "../../../services/adminService";
import Text from "../../atoms/Text";
import Input from "../../atoms/Input";
import InputWithLabel from "../../molecules/InputWithLabel";

type Category = {
  _id: string;
  name: string;
};

const MAX_IMAGES = 5;
const MIN_IMAGES = 1;

const ProductForm = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<string[]>([""]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getCategoriesList = async () => {
    const res = await getAllCategories();
    setCategories(res);
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  const handleImageChange = (index: number, value: string) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  const addImageField = () => {
    if (images.length < MAX_IMAGES) {
      setImages([...images, ""]);
    }
  };

  const removeImageField = (index: number) => {
    if (images.length > 1) {
      const updated = images.filter((_, i) => i !== index);
      setImages(updated);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim()) return setError("Product name is required.");
    if (!categoryId.trim()) return setError("Category is required.");
    if (images.length < MIN_IMAGES) return setError("At least one image URL is required.");
    if (images.length > MAX_IMAGES) return setError("Maximum 5 image URLs allowed.");
    if (images.some((url) => !url.trim())) return setError("Image URLs cannot be empty.");

    // Proceed with API call
    await createProduct({ name, categoryId, images });
    setName("");
    setCategoryId("");
    setImages([""]);
    setError(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto"
    >
      <Text variant="h3" className="text-xl font-semibold text-gray-800 mb-6">
        Add Product
      </Text>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="space-y-4">
        <InputWithLabel
          label="Product Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`Product Name`}
        />

        <SelectWithLabel
          label="Select Category"
          name="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          options={categories.map((cat) => ({
            label: cat.name,
            value: cat._id,
          }))}
        />

        <div>
          <label className="block font-medium mb-1 text-gray-700">Image URLs</label>
          {images.map((url, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input
                name={`image-${index+1}`}
                type="text"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder={`Image URL ${index + 1}`}
                // className="flex-1 border rounded px-3 py-2 text-sm"
              />
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="text-red-600 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {images.length < MAX_IMAGES && (
            <button
              type="button"
              onClick={addImageField}
              className="text-blue-600 text-sm mt-1"
            >
              + Add Image
            </button>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-6 transition-all duration-200"
      >
        Submit
      </Button>
    </form>
  );
};

export default ProductForm;
