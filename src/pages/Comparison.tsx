import { useEffect, useState } from 'react'
import { Table } from '../components/organisms/Table';
import { getCompareProductPriceOf2Markets } from '../services/productService';
import { getAllCategories, getAllMarkets } from '../services/adminService';
import SelectWithLabel from '../components/molecules/SelectWithLabel';
import { Option } from '../components/atoms/CustomSelect';
import InputWithLabel from '../components/molecules/InputWithLabel';
import { Filters } from '../types/common';
import InfiniteScroll from 'react-infinite-scroll-component';



const initialFilters = {
  market1Id: '68831655d93a5d7d8bb59ca0',
  market2Id: '68839617d93a5d7d8bb59dd7',
  categoryId: 'all',  // '68825af9b3d068cc2b8e2ba3',
  date: new Date().toISOString().split('T')[0],
}
const PageSize = 5;

function Comparison() {
  const [allMarketsOptions, setAllMarketsOptions] = useState([]);
  const [comparedData, setComparedData] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState<Option[]>([]);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMarketOptions = async () => {
    const res = await getAllMarkets();
    setAllMarketsOptions(res.map((m: any) => ({ label: m.name, value: m._id })));
  }

  const fetchCategoriesOptions = async () => {
    const res = await  getAllCategories();
    setCategoriesOptions([{ label: 'All', value: 'all' }, ...res.map((c: any) => ({ label: c.name, value: c._id }))]);
  }

  useEffect(() => {
    fetchMarketOptions();
    fetchCategoriesOptions();
  }, [])

  const fetchCompareData = async () => {
    const res = await getCompareProductPriceOf2Markets({...filters, page, limit: PageSize,});

    if (res.length < PageSize) setHasMore(false);
    setComparedData(res);
    setPage((prev) => prev + 1);

  }

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setComparedData([]);
    fetchCompareData();
  }, [filters]);
  

  const handleChangeFilters = (e: { target: { name: string; value: string } }) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex flex-col md:gap-4 sm:flex-row mb-2">
        <div className="w-full sm:w-1/2">
          <SelectWithLabel
            label="Category"
            name="categoryId"
            value={filters.categoryId}
            onChange={handleChangeFilters}
            options={categoriesOptions}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <InputWithLabel
            label="Date"
            name="date"
            type="date"
            value={filters.date}
            onChange={handleChangeFilters}
            className="bg-white"
          />
        </div>
      </div>
      <InfiniteScroll
        dataLength={comparedData.length}
        next={fetchCompareData}
        hasMore={hasMore}
        loader={<p className="text-center py-4 text-sm text-gray-500">Loading more...</p>}
        scrollThreshold={0.9}
      >
        <Table
          data={comparedData}
          marketOptions={allMarketsOptions}
          filters={filters}
          handleChangeFilters={handleChangeFilters}
        />
      </InfiniteScroll>
     
    </div>
  );
}

export default Comparison