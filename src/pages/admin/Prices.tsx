import { useEffect, useState } from "react";
import axios from "axios";
import PriceForm from "../../components/organisms/PriceForm";

export default function Prices() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/v1/products").then(res => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Prices to Product</h1>
      <PriceForm products={products} />
    </div>
  );
}
