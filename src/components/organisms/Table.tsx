import React from "react";
import CustomSelect, { Option } from "../atoms/CustomSelect";
import { FilterChangeEvent, Filters } from "../../types/common";

const productsImages: Record<string, string> = {
    "lokwan": 'https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop.jpg',
    "lamaba gehu": 'https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop.jpg',
    "piddi": 'https://gachwala.in/wp-content/uploads/2023/02/WHEAT.jpg',
    "4037" : 'https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop.jpg',
    "js": 'https://5.imimg.com/data5/SELLER/Default/2025/3/496240959/PG/EK/GQ/186090800/non-gmo-soybean-500x500.png'
};

type priceData = {
  minPrice: string;
  maxPrice: string;
}

type RowData = {
  name: string;
  image: string;
  market1: priceData;
  market2: priceData;
};

type TableProps = {
  data: RowData[];
  marketOptions: Option[];
  filters: Filters;
  handleChangeFilters: (e: FilterChangeEvent) => void;
};

export const Table: React.FC<TableProps> = ({
  data,
  marketOptions,
  filters,
  handleChangeFilters
}) => {

    console.log("table filters", filters)
  return (
    <div className="overflow-x-auto scrollbar-visible">
      <div className="max-h-[40vh] overflow-y-auto border border-gray-500 rounded-md">
        <table className="w-full table-auto border-collapse text-sm bg-white">
          <thead className="sticky  top-0 bg-gray-50 z-20 text-gray-700">
            <tr>
              <th className="sticky left-0 z-10 bg-gray-50 px-3 py-2 text-left font-semibold whitespace-nowrap">
                Product
              </th>
              <th className="px-3 py-2 text-left font-semibold whitespace-nowrap">
                Image
              </th>
              <th className="px-3 py-2 min-w-40 text-left font-semibold whitespace-nowrap">
                <CustomSelect
                  name="market1Id"
                  placeholder="Market-1"
                  options={marketOptions}
                  value={filters?.market1Id}
                  onChange={(val) => handleChangeFilters({ target: { name: 'market1Id', value: val } })}
                />
              </th>
              <th className="px-3 py-2 min-w-40 text-left font-semibold whitespace-nowrap">
                <CustomSelect
                  name="market2Id"
                  placeholder="Market-2"
                  options={marketOptions}
                  value={filters?.market2Id}
                  onChange={(val) => handleChangeFilters({ target: { name: 'market2Id', value: val } })}
                />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                <td className="sticky left-0 z-10 bg-white px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                  {row.name}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <img
                    src={productsImages[row.name]}
                    alt={row.name}
                    className="w-12 h-12 object-cover rounded border border-gray-200"
                  />
                </td>
                <td className="px-3 py-2 text-gray-800 whitespace-nowrap">
                  {row.market1 && (row.market1?.minPrice ?? "—")} {row.market1?.minPrice ? "-" : null} {row.market1 && (row.market1?.maxPrice ?? "—")}
                </td>
                <td className="px-3 py-2 text-gray-800 whitespace-nowrap">
                  {row.market2 && (row.market2?.minPrice ?? "—")} {row.market2?.minPrice ? "-" : null} {row.market1 && (row.market2?.maxPrice ?? "—")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
