import React from "react";
import Image from "../atoms/Image";
import Text from "../atoms/Text";
import { useNavigate } from "react-router-dom";

interface ProductCategoryCardProps {
    category: string;
    image: string;
}

const ProductCategoryCard: React.FC<ProductCategoryCardProps> = ({
    category,
    image,
}) => {
    const navigate = useNavigate();

    const handleCategoryClicked = () => {
        console.log("clicked...")
        navigate(`/categories/${category}`);
    }
    return (
        <div 
         onClick={handleCategoryClicked}
         className="p-2 min-h-36 max-w-xs bg-white rounded-lg shadow-md inset-shadow-2xs relative overflow-hidden"
        >
            <Text variant="h3" className="font-bold text-lg">{category}</Text>
            <div className="w-full flex justify-end absolute -bottom-2 right-0 ">
                <Image src={image} alt={category} className=" w-24 h-24 rounded-tl-4xl" />
            </div>
        </div>
    );
};

export default ProductCategoryCard;
