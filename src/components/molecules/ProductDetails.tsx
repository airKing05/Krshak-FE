import React from "react";
// import WeatherInfo from "../atoms/WeatherInfo";
import Text from "../atoms/Text";
import DeleteIcon from "../../assets/icons/delete.svg";

interface ProductDetailsProps {
    marketName?: string;
    city?: string;
    productName?: string;
    category?: string;
    minPrice: string;
    maxPrice: string;
    temperature: string;
    rainChance: string;
    handleDeleteProduct: () => void;
    isAdmin: boolean;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
    marketName,
    city,
    productName,
    category,
    minPrice,
    maxPrice,
    // temperature,
    // rainChance,
    handleDeleteProduct,
    isAdmin
}) => {
    return (
        <div className=" bg-white shadow-md rounded-lg p-4">
            <Text variant="h2" className="text-xl font-medium text-gray-700"> <span className="capitalize">{marketName}</span>, <span className="capitalize">{city}</span> in India</Text>
            <div className="flex justify-between items-center mt-2">
                <div>
                    <Text variant="h1" className="text-3xl font-semibold capitalize">{productName}</Text>
                    <Text variant="h4" className="text-base text-gray-600 mt-1 capitalize">{category}</Text>
                    <Text variant="h4" className="text-xl font-bold text-green-600 mt-4">₹{minPrice} - ₹{maxPrice}</Text>
                </div>
                <div className="w-8 h-full">
                    {
                        isAdmin ? <img src={DeleteIcon} alt="icon" onClick={handleDeleteProduct}/> : null
                    }
                </div>
                {/* <WeatherInfo temperature={temperature} rainChance={rainChance} /> */}
            </div>

        </div>
    );
};

export default ProductDetails;
