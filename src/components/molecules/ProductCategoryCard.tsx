import React from "react";
import Image from "../atoms/Image";
import Text from "../atoms/Text";
import { useNavigate } from "react-router-dom";


const imageObject = {
    "gehu" : "https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop.jpg",
    "rice" : "https://5.imimg.com/data5/SELLER/Default/2021/3/UK/NH/LE/83707430/pr-122-paddy-seed-500x500.png",
    "soyabin": 'https://web-cdn.markets.com/Soy_bean_mature_seeds_with_immature_soybeans_in_the_pod_Soy_bean_close_up_Open_green_soybean_pod_on_dry_soy_beans_background_Green_soybean_pods_on_dry_soy_bean_f2cf13ebe9.jpg.webp',
}

interface ProductCategoryCardProps {
    name: string;
    image: string;
}

const ProductCategoryCard: React.FC<ProductCategoryCardProps> = ({
    name,
    image,
}) => {
    const navigate = useNavigate();

    const handleCategoryClicked = () => {
        console.log("clicked...")
        navigate(`/categories/${name}`);
    }
    return (
        <div 
         onClick={handleCategoryClicked}
         className="p-2 min-h-36 max-w-xs bg-white rounded-lg shadow-md inset-shadow-2xs relative overflow-hidden"
        >
            <Text variant="h3" className="font-bold text-lg">{name}</Text>
            <div className="w-full flex justify-end absolute -bottom-2 right-0 ">
                <Image src={imageObject[name]} alt={name} className=" w-24 h-24 rounded-tl-4xl" />
            </div>
        </div>
    );
};

export default ProductCategoryCard;
