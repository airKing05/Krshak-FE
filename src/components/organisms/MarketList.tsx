// src/components/organisms/MarketList.tsx
import { useEffect, useState } from "react";
import { getAllMarkets } from "../../services/adminService";


export default function MarketList() {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    getAllMarkets().then(setMarkets);
  }, []);

  return (
    <ul className="space-y-2">
      {markets.map((market: any) => (
        <li
          key={market._id}
          className="border p-3 bg-white rounded shadow-sm"
        >
          {market.name}
        </li>
      ))}
    </ul>
  );
}
