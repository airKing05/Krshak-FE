// src/components/molecules/MarketForm.tsx
import { useState } from "react";
import { createMarket } from "../../services/adminService";

export default function MarketForm() {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMarket({ name, city: 'kpatan', district: 'Bundi', state: 'raj' });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-3 py-2 w-64"
        placeholder="Enter market name"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Market
      </button>
    </form>
  );
}
