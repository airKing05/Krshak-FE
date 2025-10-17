import React, { useEffect, useState } from "react";
import { getDistanceKm } from "../../utils/helper";
import NearestMarketCard from "../molecules/NearestMarketCard";
import { Market } from "../../types/common";

interface NearestMarketListProps{
    allMarkets: Market[];
    onMarketSelect: (marketId: string) => void;
    userLocation: { lat: number; lng: number } | null
}

const NearestMarketList: React.FC<NearestMarketListProps> = ({allMarkets, onMarketSelect, userLocation}) => {
 

  const [nearestMarkets, setNearestMarkets] = useState<(Market & { distance: number })[]>([]);


  // Once location is available, calculate distances
  useEffect(() => {
    if (!userLocation) return;

    const sorted = allMarkets
      .map((market) => ({
        ...market,
        distance: getDistanceKm(userLocation.lat, userLocation.lng, market.lat, market.lng),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);

    setNearestMarkets(sorted);
  }, [userLocation, allMarkets]);



    return (
        <>
        <div>
        </div>
         <div className="max-w-4xl mx-auto sm:px-6 md:px-8 space-y-4">
            {nearestMarkets.map((market, index) => (
                <NearestMarketCard 
                  key={index} 
                  title={market.name} 
                  city={market.city}
                  distance={`~${market.distance.toFixed(1)} KM`}
                  imageUrl="https://cms.patrika.com/wp-content/uploads/2018/03/30/bhamashah_mandi_gate_1.jpg"
                  handleClick={() => onMarketSelect(market._id)}
                  latitude={market.lat}
                  longitude={market.lng}
                />
            ))}
        </div>
        </>
    );
};

export default NearestMarketList;
