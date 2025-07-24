// pages/admin/markets.tsx
import { useState } from "react";
// import Input from "@/components/atoms/Input";
// import Button from "@/components/atoms/Button";

export default function Markets() {
  const [marketName, setMarketName] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5001/api/v1/markets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: marketName, city: 'kpatan', district: 'Bundi', state: 'raj' }),
    });
    if (res.ok) {
      alert("Market added!");
      setMarketName("");
    }
  };

  console.log("admin markets called...")

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Add New Market</h2>
      <div className="flex gap-2 items-center">
        <input
          value={marketName}
          onChange={(e) => setMarketName(e.target.value)}
          placeholder="Enter market name"
          className="border border-gray-300 px-4 py-2 rounded w-full"
        />
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add
        </button>
      </div>
    </div>
  );
}
