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

const ProductCategoryCard: React.FC<ProductCategoryCardProps> = (props) => {
    const {name,image, _id: categoryId} = props;
    const navigate = useNavigate();
    const handleCategoryClicked = () => {
        console.log("clicked...")
        navigate(`/products/${categoryId}`);
    }
    return (
    <div
      onClick={handleCategoryClicked}
      className="cursor-pointer p-2 max-w-xs bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="w-full aspect-[4/3] overflow-hidden rounded-md">
        <Image
          src={imageObject[name] || image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <Text variant="h3" className="font-extrabold text-2xl mt-3 text-center">
        {name}
      </Text>
    </div>
    );
};

export default ProductCategoryCard;
