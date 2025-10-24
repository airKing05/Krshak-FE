import React, { useCallback, useEffect, useState } from "react";
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
import SpinnerLoader from "../atoms/SpinnerLoader";

const HomePageTemplate: React.FC = () => {
    const cityName = useCityName();
    const [categoriesList, setCategoryList] = useState([]);
    const [allMarkets, setAllMarkets] = useState([]);
    const [selectedMarketId, setSelectedMarketId] = useState<string | null>(() => {
        const market = getFromLocalStorage<Market>('marketDetails');
        return market && typeof market === 'object' ? market._id : null;
    });
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [selectedMarketDetails, setSelectedMarketDetails] = useState<Market>({
        _id: "",
        name: "",
        city: "",
        district: "",
        state:"",
        lat: 0,
        lng: 0
    });
    const [loading, setLoading] = useState(false);
    const [rainData, setRainData] = useState<Array<{ date: string; rainChance: number, rainAmount: number }>>([]);
    const [error, setError] = useState<string | null>(null);

    // const typedInputMarket = useRef("");

    // const fetchMandiData = () => {
    //     const url = '/resource/9ef84268-d588-465a-a308-a864a43d0070';
    //     const apiKey = '579b464db66ec23bdd0000019d440267cc2a4b69502c47bb07a153d5';
    // }


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

    const filterOutSelectedMarketDetails = useCallback((selectedMarketId: string) => {
        const foundedMarket = allMarkets.find((_market: Market) => _market._id === selectedMarketId);
        if(foundedMarket){
            setSelectedMarketDetails(foundedMarket);
            setToLocalStorage('marketDetails', foundedMarket)
            
        }
    }, [allMarkets, setSelectedMarketDetails]);

    useEffect(() => {
        const marketDetails = getFromLocalStorage('marketDetails') as Market;
        getCategoriesListByMarketId(selectedMarketId? selectedMarketId : marketDetails?._id);
    }, [selectedMarketId]);

    useEffect(() => {
        const marketDetails = getFromLocalStorage('marketDetails') as Market;
        filterOutSelectedMarketDetails(selectedMarketId? selectedMarketId : marketDetails?._id);
    }, [filterOutSelectedMarketDetails, selectedMarketId]);


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
        if (
            selectedMarketDetails &&
            typeof selectedMarketDetails.lat === 'number' &&
            typeof selectedMarketDetails.lng === 'number'
        ) {
            async function loadRainData() {
                setLoading(true);
                const data = await getRainProbability7Days(selectedMarketDetails.lat, selectedMarketDetails.lng);
                setRainData(data);
                setLoading(false);
            }
            loadRainData();
        }
    }, [selectedMarketDetails]);


    if (loading) {
        return <SpinnerLoader fullScreen size="lg"/>;
    }

    if(error){
        return <div className="text-center">{error}</div>
    }

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
                    options={allMarkets.map((m: Market) => ({ label: m.name, value: m._id }))}
                    value={selectedMarketId}
                    onChange={setSelectedMarketId}
                    // onInputChange={(val) => {
                    //  typedInputMarket.current = val; 
                    // }}
                    placeholder="Select or type..."
                />
            </div>

            <Text variant="h4">Weather at <span className="capitalize">{selectedMarketDetails?.name}</span></Text>
            <div className="flex overflow-x-auto p-4 space-x-4 custom-scrollbar justify-start"> {/* Added custom-scrollbar for better UX */}
                {rainData.map((weather, index) => (
                    <WeatherCard
                        key={index}
                        day={getDayByDate(weather.date)}
                        icon={getRainEmoji(weather.rainChance)}
                        rainChance={weather.rainChance + '%'}
                        rainAmount={weather.rainAmount + 'mm'}
                    />
                ))}
            </div>
            
            <Text variant="h3" className="">Available Categories</Text>
            <ProductCategories categories = {categoriesList} />

            <Text variant="h3" className="">Nearby Market</Text>
            <NearestMarketList 
                allMarkets={allMarkets}
                onMarketSelect={(marketId: string) => setSelectedMarketId(marketId)}
                userLocation={userLocation}
            />
        </div>
    );
};

export default HomePageTemplate;
