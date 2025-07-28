import React, { useEffect, useRef, useState } from "react";
import NearestMarketList from "../organisms/NearestMarketList";
import ProductCategories from "../organisms/ProductCategories";
import Text from "../atoms/Text";
import LocationIcon from '../../assets/icons/location.svg';
import Image from "../atoms/Image";
import { useCityName } from "../../hooks/useCityName";
import { getAllMarkets } from "../../services/adminService";
import { getMarketCategories } from "../../services/productService";
import { getFromLocalStorage, setToLocalStorage } from "../../utils/localStorage";
import CustomSelect from "../atoms/CustomSelect";

const HomePageTemplate: React.FC = () => {
    const cityName = useCityName();
    const [categoriesList, setCategoryList] = useState([]);
    const [allMarketsOptions, setAllMarketsOptions] = useState([]);
    const [selectedMarket, setSelectedMarket] = useState("");
    // const typedInputMarket = useRef("");

    const fetchMandiData = () => {
        const url = '/resource/9ef84268-d588-465a-a308-a864a43d0070';
        const apiKey = '579b464db66ec23bdd0000019d440267cc2a4b69502c47bb07a153d5';
    }

    const getCategoriesListByMarketId = async(marketId: string) => {
        const res = await getMarketCategories(marketId);
        // console.log("res categorieslist", res)
        setCategoryList(res)
    }

    const filterMarketBasedOnLocation = (listOfMarkets: any) => {
      const testCity = 'kota'
      const marketDetails = listOfMarkets.find((market:any) => market.city === testCity.toLowerCase())
    //   console.log("marketId", marketDetails)
      setToLocalStorage('marketDetails', marketDetails)
     
    }

    const fetchMarketList = async () => {
        const res = await getAllMarkets();
        filterMarketBasedOnLocation(res);
        setAllMarketsOptions(res.map((m: any) => ({ label: m.name, value: m._id })));
        // console.log("data", res)
    }

    useEffect(() => {
        fetchMarketList();
    }, []);

    useEffect(() => {
        const marketDetails = getFromLocalStorage('marketDetails');
        console.log("selectedMarket", selectedMarket)
        getCategoriesListByMarketId(selectedMarket? selectedMarket : marketDetails._id);
    }, [selectedMarket]);



    return (
        <div className="p-4 space-y-6">
            <div className="flex gap-2 items-center">
                <Image src={LocationIcon} className="w-6 h-6" alt="icon"/>
                <Text variant="h3" className="">
                    {cityName}
                    {/* Kuwarti Mandi, Bundi (Raj.) */}
                </Text>
            </div>

            <div className="">
                <CustomSelect
                    options={allMarketsOptions}
                    value={selectedMarket}
                    onChange={setSelectedMarket}
                    // onInputChange={(val) => {
                    //  typedInputMarket.current = val; 
                    // }}
                    placeholder="Select or type..."
                />
            </div>
            
            <Text variant="h3" className="">Available Categories</Text>
            <ProductCategories categories = {categoriesList} />

            <Text variant="h3" className="">Nearby Market</Text>
            <NearestMarketList />
        </div>
    );
};

export default HomePageTemplate;
