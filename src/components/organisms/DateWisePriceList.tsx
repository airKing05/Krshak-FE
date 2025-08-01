import React from "react";
import PriceCard from "../molecules/PriceCard";
import { PricePoint } from "../../types/common";


// Define props type for the component
interface DateWisePriceListProps {
  price?: PricePoint[];
}


const DateWisePriceList: React.FC<DateWisePriceListProps> = ({price}) => {
    return (
        <div className="space-y-4">
            {price?.length? price.map((price: PricePoint, index: number) => (
                <React.Fragment key={index}>
                    <PriceCard{...price} />
                </React.Fragment>
            )): null}
        </div>
    );
};

export default DateWisePriceList;
