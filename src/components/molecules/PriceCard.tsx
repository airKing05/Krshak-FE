import React from 'react'
import { PriceDataTypes } from '../organisms/DateWisePriceList';



const PriceCard: React.FC<PriceDataTypes> = ({ date, maxPrice }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mx-auto">
            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">{date}</div>
                <div className="text-lg font-semibold text-green-600">{maxPrice}</div>
            </div>
        </div>
    ); 
};

export default PriceCard;
