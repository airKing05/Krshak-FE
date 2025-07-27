// src/components/molecules/MarketForm.tsx
import { useState } from "react";
import { createMarket } from "../../../services/adminService";
import InputWithLabel from "../../molecules/InputWithLabel";
import Button from "../../atoms/Button";
import Text from "../../atoms/Text";

const MarketForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    district: "",
    state: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMarket(formData);
    setFormData({ name: "", city: "", district: "", state: "" });
  };

  return (
    <div className="bg-white max-w-xl mx-auto rounded-xl shadow-md p-6">
      <Text 
        variant="h3"
        className="text-xl font-semibold text-gray-800 mb-6"
      >
        Add New Market
      </Text>

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputWithLabel
          label="Market Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter market name"
        />
        <InputWithLabel
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter city name"
        />
        <InputWithLabel
          label="District"
          name="district"
          value={formData.district}
          onChange={handleChange}
          placeholder="Enter district name"
        />
        <InputWithLabel
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="Enter state name"
        />
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-all duration-200"
        >Submit</Button>
      </form>
    </div>
  );
};

export default MarketForm;
