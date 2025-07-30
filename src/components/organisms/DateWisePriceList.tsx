import React from "react";
import PriceCard from "../molecules/PriceCard";


export interface PriceDataTypes {
    date: string;
    minPrice: string;
    maxPrice: string;
}
const DateWisePriceList: React.FC = ({price}) => {
    return (
        <div className="space-y-4">
            {price?.length? price.map((price: PriceDataTypes, index: number) => (
                <PriceCard key={index} {...price} />
            )): null}
        </div>
    );
};

export default DateWisePriceList;
