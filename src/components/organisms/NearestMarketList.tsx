import React, { useEffect, useState } from "react";
import Card from "../molecules/Card";
import { getMarketByMarketId } from "../../services/productService";
import { getDistanceKm, getFallbackLocation, getUserLocation } from "../../utils/helper";



type Market = {
  _id: string;
  name: string;
  city: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
};

interface NearestMarketListProps{
    currentMarketId: string;
    allMarkets: Market[];
}

const NearestMarketList: React.FC<NearestMarketListProps> = ({currentMarketId, allMarkets}) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nearestMarkets, setNearestMarkets] = useState<(Market & { distance: number })[]>([]);

    const markets = [
        { 
            imageUrl: "https://cms.patrika.com/wp-content/uploads/2018/03/30/bhamashah_mandi_gate_1.jpg", 
            title: "Bhamasha mandi", 
            distance: "20 km",
            id: 1, 
        },
        {
            imageUrl: "https://chaloghumane.com/wp-content/uploads/2021/09/Bundi.jpg",
            title: "Kuwarti mandi",
            distance: "18 km",
            id: 2, 
        }, 
    ];

    // first get geolocation
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


  // Once location is available, calculate distances
  useEffect(() => {
    if (!userLocation) return;

    const sorted = allMarkets
      .map((market) => ({
        ...market,
        distance: getDistanceKm(userLocation.lat, userLocation.lng, market.lat, market.lng),
      }))
      .sort((a, b) => a.distance - b.distance);

    setNearestMarkets(sorted);
  }, [userLocation, allMarkets]);


  console.log("NearestMarkets", userLocation, nearestMarkets)


    return (
        <>
        <div>
            {
              nearestMarkets.map((market) => {
                return market.name
              })  
            }
        </div>
         <div className="max-w-4xl mx-auto sm:px-6 md:px-8 space-y-4">
            {markets.map((market, index) => (
                <Card key={index} {...market}/>
            ))}

            
        </div>
        </>
    );
};

export default NearestMarketList;
