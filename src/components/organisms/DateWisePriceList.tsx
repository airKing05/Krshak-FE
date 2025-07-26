import React from "react";
import PriceCard from "../molecules/PriceCard";


export interface PriceDataTypes {
    date: string;
    minPrice: string;
    maxPrice: string;
}
const DateWisePriceList: React.FC = ({price}) => {
    const priceData = [
        { date: "2025-03-20", minPrice: "₹2300", maxPrice: "₹2800" },
        { date: "2025-03-21", minPrice: "₹2400", maxPrice: "₹2900" },
        { date: "2025-03-22", minPrice: "₹2500", maxPrice: "₹2950" },
        { date: "2025-03-23", minPrice: "₹2350", maxPrice: "₹2700" },
        { date: "2025-03-24", minPrice: "₹2450", maxPrice: "₹2850" },
        { date: "2025-03-25", minPrice: "₹2550", maxPrice: "₹3000" },
    ];

    return (
        <div className="space-y-4">
            {price?.length? price.map((price: PriceDataTypes, index: number) => (
                <PriceCard key={index} {...price} />
            )): null}
        </div>
    );
};

export default DateWisePriceList;
