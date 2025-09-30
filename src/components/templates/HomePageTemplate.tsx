import React, { useEffect, useState } from "react";
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
import { Market } from "../../types/common";
import WeatherCard from "../molecules/WeatherCard";
import { getFallbackLocation, getUserLocation } from "../../utils/helper";
import { getRainProbability7Days } from "../../services/weather";
import { getDayByDate, getRainEmoji } from "../../utils/common";

const HomePageTemplate: React.FC = () => {
    // const cityName = useCityName();
    const [categoriesList, setCategoryList] = useState([]);
    const [allMarkets, setAllMarkets] = useState([]);
    const [selectedMarket, setSelectedMarket] = useState(getFromLocalStorage('marketDetails')?._id || null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [selectedMarketDetails, setSelectedMarketDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rainData, setRainData] = useState<Array<{ date: string; rainChance: number }>>([]);
      const [error, setError] = useState<string | null>(null);

    // const typedInputMarket = useRef("");

    // const fetchMandiData = () => {
    //     const url = '/resource/9ef84268-d588-465a-a308-a864a43d0070';
    //     const apiKey = '579b464db66ec23bdd0000019d440267cc2a4b69502c47bb07a153d5';
    // }

    console.log("......", selectedMarket)
    const getCategoriesListByMarketId = async(marketId: string) => {
        const res = await getMarketCategories(marketId);
        // console.log("res categorieslist", res)
        setCategoryList(res)
    }

    const filterMarketBasedOnLocation = (listOfMarkets: Market[]) => {
      const testCity = 'kota'
      const marketDetails = listOfMarkets.find((market: Market) => market.city === testCity.toLowerCase())
    //   console.log("marketId", marketDetails)
      setToLocalStorage('marketDetails', marketDetails)
     
    }

    const fetchMarketList = async () => {
        const res = await getAllMarkets();
        filterMarketBasedOnLocation(res);
        setAllMarkets(res);
        // console.log("data", res)
    }

    useEffect(() => {
        fetchMarketList();
    }, []);

    const filterOutSelectedMarketDetails = (selectedMarketId : string) => {
        console.log("foundedMarket",allMarkets, selectedMarketId )

        const foundedMarket = allMarkets.find((_market) => _market._id === selectedMarketId);
        setSelectedMarketDetails(foundedMarket)
    }

    useEffect(() => {
        const marketDetails = getFromLocalStorage('marketDetails') as Market;
       
        getCategoriesListByMarketId(selectedMarket? selectedMarket : marketDetails?._id);
        filterOutSelectedMarketDetails(selectedMarket? selectedMarket : marketDetails?._id);
    }, [selectedMarket]);

    useEffect(() => {
        const marketDetails = getFromLocalStorage('marketDetails') as Market;
        filterOutSelectedMarketDetails(selectedMarket? selectedMarket : marketDetails?._id);
    }, [selectedMarket, allMarkets.length]);

     console.log("selectedMarket", selectedMarket, selectedMarketDetails)

    useEffect(() => {
        const detectLocation = async () => {
          try {
            const geoLoc = await getUserLocation();
            console.log("📍 Geolocation success:", geoLoc);
            setUserLocation(geoLoc);
          } catch (geoError) {
            console.warn("❌ Geolocation failed, trying fallback:", geoError);
    
            const fallbackLoc = await getFallbackLocation();
            if (fallbackLoc) {
              console.log("📍 IP-based fallback location:", fallbackLoc);
              setUserLocation(fallbackLoc);
            } else {
              setError("Could not detect your location.");
            }
          }
        };
    
        detectLocation();
    }, []);


    useEffect(() => {
        console.log("selectedMarketDetails", selectedMarketDetails)
        if(selectedMarketDetails?.lat || selectedMarketDetails?.lng){
            async function loadRainData() {
            setLoading(true);
            const data = await getRainProbability7Days(selectedMarketDetails?.lat, selectedMarketDetails?.lng);
            setRainData(data);
            setLoading(false);
        }
        loadRainData();
        }
    }, [selectedMarketDetails?.lat, selectedMarketDetails?.lng]);


    console.log("rainData", rainData)

    return (
        <div className="p-4 space-y-6">
            <div className="flex gap-2 items-center">
                <Image src={LocationIcon} className="w-6 h-6" alt="icon"/>
                <Text variant="h3" className="">
                    {/* {cityName} */}
                    {/* Kuwarti Mandi, Bundi (Raj.) */}
                </Text>
            </div>



            <div className="">
                <CustomSelect
                    options={allMarkets.map((m: Market) => ({ label: m.name, value: m._id }))}
                    value={selectedMarket}
                    onChange={setSelectedMarket}
                    // onInputChange={(val) => {
                    //  typedInputMarket.current = val; 
                    // }}
                    placeholder="Select or type..."
                />
            </div>

            <Text variant="h3" className="">Available Categories</Text>
            <div className="flex overflow-x-auto p-4 space-x-4 custom-scrollbar justify-center"> {/* Added custom-scrollbar for better UX */}
                {rainData.map((weather, index) => (
                    <WeatherCard
                        key={index}
                        day={getDayByDate(weather.date)}
                        icon={getRainEmoji(weather.rainChance)}
                        rainChance={weather.rainChance + '%'}
                    />
                ))}
            </div>
            
            <Text variant="h3" className="">Available Categories</Text>
            <ProductCategories categories = {categoriesList} />

            <Text variant="h3" className="">Nearby Market</Text>
            {/* <NearestMarketList 
                allMarkets={allMarkets}
                onMarketSelect={(marketId: string) => setSelectedMarket(marketId)}
                userLocation={userLocation}
            /> */}
        </div>
    );
};

export default HomePageTemplate;
