// src/components/organisms/MarketCategoryForm.tsx
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SelectWithLabel from "../../molecules/SelectWithLabel";
import { Option } from "../../atoms/CustomSelect";
import Button from "../../atoms/Button";
import { createMarketCategoriesLink, getAllCategories, getAllMarkets } from "../../../services/adminService";
import Text from "../../atoms/Text";

const MarketCategoryForm = () => {
  const [markets, setMarkets] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [formData, setFormData] = useState({
    marketId: "",
    categoryId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          getAllMarkets(),
          getAllCategories(),
        ]);
        setMarkets(res1.map((m: any) => ({ label: m.name, value: m._id })));
        setCategories(res2.map((c: any) => ({ label: c.name, value: c._id })));
      } catch (error) {
        toast.error("Error fetching data");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { marketId, categoryId } = formData;

    if (!marketId || !categoryId) {
      toast.error("Please select both fields");
      return;
    }

    try {
      await createMarketCategoriesLink({
        marketId,
        categoryId,
      })
      toast.success("Linked successfully!");
      setFormData({ marketId: "", categoryId: "" });
    } catch (err) {
      console.error(err);
      toast.error("Linking failed");
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
        🔗 Link Market & Category
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

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-all duration-200"
      >Submit</Button>
    </form>
  );
};

export default MarketCategoryForm;
