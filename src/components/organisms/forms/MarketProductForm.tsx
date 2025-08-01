// src/components/organisms/MarketProductForm.tsx
import { useEffect, useState } from "react";
import SelectWithLabel from "../../molecules/SelectWithLabel";
import { Option } from "../../atoms/CustomSelect";
import Button from "../../atoms/Button";
import { createMarketProductsLink, getAllCategories, getAllMarkets, getAllProducts } from "../../../services/adminService";
import Text from "../../atoms/Text";

interface MarketProductFormData {
  marketId: string;
  categoryId: string;
  productId: string;
}

const MarketProductForm = () => {
  const [formData, setFormData] = useState<MarketProductFormData>({
    marketId: "",
    categoryId: "",
    productId: "",
  });

  const [markets, setMarkets] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [products, setProducts] = useState<Option[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2, res3] = await Promise.all([
          getAllMarkets(),
          getAllCategories(),
          getAllProducts()
        ]);
        setMarkets(res1.map((m: any) => ({ label: m.name, value: m._id })));
        setCategories(res2.map((c: any) => ({ label: c.name, value: c._id })));
        setProducts(res3.map((p: any) => ({ label: p.name, value: p._id })));
      } catch (error) {
        // toast.error("Error fetching data");
        console.error("Error fetching data", error)
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMarketProductsLink(formData);
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
      className="bg-white p-8 rounded-xl shadow-xl max-w-xl mx-auto"
    >
      <Text 
        variant="h3"
        className="text-xl font-semibold text-gray-800 mb-6"
      >
        🛒 Link Market & Product
      </Text>

      <SelectWithLabel
        label="Market"
        name="marketId"
        value={formData.marketId}
        onChange={handleChange}
        options={markets}
        required
      />

      <SelectWithLabel
        label="Category"
        name="categoryId"
        value={formData.categoryId}
        onChange={handleChange}
        options={categories}
        required
      />

      <SelectWithLabel
        label="Product"
        name="productId"
        value={formData.productId}
        onChange={handleChange}
        options={products}
        required
      />

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-all duration-200"
      >Submit</Button>
    </form>
  );
};

export default MarketProductForm;
