import { useState } from "react";
import MarketCategoryForm from "../../components/organisms/MarketCategoryForm";
import MarketProductForm from "../../components/organisms/MarketProductForm";

export default function Link() {
  const [activeTab, setActiveTab] = useState("category");

  return (
    <div className="p-4 pt-0">
      {/* Tabs */}
      <div className="flex mb-6 border-b border-gray-300">
        <button
          onClick={() => setActiveTab("category")}
          className={`px-4 py-2 font-semibold border-b-2 ${
            activeTab === "category"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-600 hover:text-blue-500"
          }`}
        >
          Link Category
        </button>
        <button
          onClick={() => setActiveTab("product")}
          className={`ml-4 px-4 py-2 font-semibold border-b-2 ${
            activeTab === "product"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-600 hover:text-blue-500"
          }`}
        >
          Link Product
        </button>
      </div>

      {/* Forms */}
      {activeTab === "category" ? (
        <>
          <MarketCategoryForm />
        </>
      ) : (
        <>
          <MarketProductForm />
        </>
      )}
    </div>
  );
}
