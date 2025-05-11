import React from "react";
import WeatherInfo from "../atoms/WeatherInfo";
import Text from "../atoms/Text";

interface ProductDetailsProps {
    mandi: string;
    city: string;
    productName: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    temperature: string;
    rainChance: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
    mandi,
    city,
    productName,
    category,
    minPrice,
    maxPrice,
    temperature,
    rainChance,
}) => {
    return (
        <div className=" bg-white shadow-md rounded-lg p-4">
            <Text variant="h2" className="text-xl font-medium text-gray-700">{mandi}, {city} in India</Text>
            <div className="flex justify-between items-center mt-2">
                <div>
                    <Text variant="h1" className="text-3xl font-semibold">{productName}</Text>
                    <Text variant="h4" className="text-base text-gray-600 mt-1">{category}</Text>
                    <Text variant="h4" className="text-xl font-bold text-green-600 mt-4">₹{minPrice} - ₹{maxPrice}</Text>
                </div>
                <WeatherInfo temperature={temperature} rainChance={rainChance} />
            </div>

        </div>
    );
};

export default ProductDetails;
