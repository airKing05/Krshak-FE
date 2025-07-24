import React, { useEffect } from "react";
import NearestMarketList from "../organisms/NearestMarketList";
import ProductCategories from "../organisms/ProductCategories";
import Text from "../atoms/Text";
import LocationIcon from '../../assets/icons/location.svg';
import Image from "../atoms/Image";
import { useCityName } from "../../hooks/useCityName";

const HomePageTemplate: React.FC = () => {
     const cityName = useCityName();
    

    const fetchMandiData = () => {
        const url = '/resource/9ef84268-d588-465a-a308-a864a43d0070';
        const apiKey = '579b464db66ec23bdd0000019d440267cc2a4b69502c47bb07a153d5';
    }

    const fetchMandisList = async () => {
        let data  = await fetch('http://localhost:5001/api/v1/markets');
        data = await data.json();
        console.log("data", data)
    }

    useEffect(() => {
        fetchMandisList();
    }, [])
    return (
        <div className="p-4 space-y-6">
            <div className="flex gap-2 items-center">
                <Image src={LocationIcon} className="w-6 h-6" alt="icon"/>
                <Text variant="h3" className="">
                    {cityName}
                    {/* Kuwarti Mandi, Bundi (Raj.) */}
                    </Text>
            </div>
            
            <Text variant="h3" className="">Available Categories</Text>
            <ProductCategories />

            <Text variant="h3" className="">Nearby Market</Text>
            <NearestMarketList />
        </div>
    );
};

export default HomePageTemplate;
