import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../../components/organisms/ProductForm";

export default function Products() {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/v1/markets").then(res => {
      setMarkets(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Product to Category</h1>
      <ProductForm markets={markets} />
    </div>
  );
}
