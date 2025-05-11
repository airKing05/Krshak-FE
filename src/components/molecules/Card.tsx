import React from "react";
import Text from "../atoms/Text";

interface CardProps {
    imageUrl?: string | undefined;
    title: string;
    subtitle?: string;
    maxPrice?: string;
    distance?: string;
    showWishButton?: boolean;
    // id: string | number | undefined;
    handleClick: () => void;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, subtitle, maxPrice, showWishButton, distance, handleClick }) => {
    return (
        <div 
          onClick={handleClick}
          className="flex items-center bg-white shadow-lg rounded-lg p-4 space-x-4 relative"
        >
            {/* Image */}
            <img
                src={imageUrl}
                alt={title}
                className="w-34 h-34 rounded-md object-cover"
            />

            <div className="flex-1">
                <Text variant="h3" className="text-lg font-semibold text-gray-900 truncate" >{title}</Text>
                {subtitle && <Text className="text-sm text-gray-500 mt-1" >{subtitle}</Text>}
                {maxPrice && <Text className="text-base text-green-600 font-semibold mt-2" >₹{maxPrice}</Text>}
                {distance && <Text className="text-base text-green-600 font-semibold mt-2" >{distance}</Text>}
            </div>

            {/* Wishlist Button */}
            {showWishButton && (
                <button className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none">
                    ❤️
                </button>
            )}
        </div>
    );
};

export default Card;

