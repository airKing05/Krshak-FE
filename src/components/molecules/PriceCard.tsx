import React from 'react'
import { formatISODateToDDMMYYYY } from '../../utils/common';
import { PricePoint } from '../../types/common';



const PriceCard: React.FC<PricePoint> = ({ date, maxPrice, minPrice }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mx-auto">
            <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">{formatISODateToDDMMYYYY(date)}</div>
                <div>
                    <span className="text-lg font-semibold text-green-600">{minPrice} - {maxPrice}</span>
                    {/* <span className="text-lg font-semibold text-green-600">{maxPrice}</span> */}
                </div>
            </div>
        </div>
    ); 
};

export default PriceCard;
