import React from "react";
import Image from "../atoms/Image";
import Text from "../atoms/Text";
import { useNavigate } from "react-router-dom";


const imageObject: Record<string, string> = {
    "gehu" : "https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop.jpg",
    "rice" : "https://5.imimg.com/data5/SELLER/Default/2021/3/UK/NH/LE/83707430/pr-122-paddy-seed-500x500.png",
    "soyabin": 'https://web-cdn.markets.com/Soy_bean_mature_seeds_with_immature_soybeans_in_the_pod_Soy_bean_close_up_Open_green_soybean_pod_on_dry_soy_beans_background_Green_soybean_pods_on_dry_soy_bean_f2cf13ebe9.jpg.webp',
    "dhan" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw8rpxntdSMQHerP0VQdWwmbMgYe0QfziIrw&s",
    "sarson": "https://organicbazar.net/cdn/shop/products/Untitled-design-2022-06-05T114519.520.jpg?v=1759567999",
    "alsi": "https://5.imimg.com/data5/SELLER/Default/2022/8/PL/XL/TY/53761119/roasted-alsi-flax-seeds.jpg",
    "jwar": "https://m.media-amazon.com/images/I/61eKPTRJisL._UF1000,1000_QL80_.jpg",
    "bajara": "https://media.istockphoto.com/id/1400438871/photo/pear-millet-background.jpg?s=612x612&w=0&k=20&c=0GlBeceuX9Q_AZ0-CH57_A5s7_tD769N2f_jrbNcbrw=",
    "makka" : "https://images.jdmagicbox.com/comp/def_content_category/hybrid-maize-seed-manufacturers/360-f-631782560-i50qce4zgbnqqb993hflc6xbzoxhhaqh-hybrid-maize-seed-manufacturers-3-e6jfh.jpg",
    "jo" : "https://t4.ftcdn.net/jpg/06/61/77/51/360_F_661775142_XYUU90jV5cuKSE9iE6WvdSWnnwoi41gT.jpg",
    "tilli": "https://t3.ftcdn.net/jpg/04/55/22/40/360_F_455224072_Qgo4UDIHZmEkYUKnVWVBjaiaW1ZVM3z0.jpg",
    "methi" : "https://5.imimg.com/data5/SELLER/Default/2022/8/IJ/FA/NW/127240709/organic-fenugreek-seed-500x500.jpg",
    "kalonji": "https://thumbs.dreamstime.com/b/kalonji-seeds-spreading-white-background-400066637.jpg",
    "dhaniya": "https://5.imimg.com/data5/ANDROID/Default/2023/10/351599521/VY/FE/YT/92374395/product-jpeg-500x500.jpg",
    "moong": "https://5.imimg.com/data5/BP/SP/PF/SELLER-12166326/moong-250x250.PNG",
    "urad" : "https://5.imimg.com/data5/SELLER/Default/2024/5/421563934/KF/RT/UZ/123752371/black-gram-250x250.jpg",
    "chana": "https://5.imimg.com/data5/SELLER/Default/2025/9/549151723/IH/YR/HV/162260593/jg-16-chana-seed.jpeg",
}

const chooseImage = (type: string): string => {
  const matchedKey = Object.keys(imageObject).find(key => type.startsWith(key));
  return matchedKey ? imageObject[matchedKey] : "";
};

interface ProductCategoryCardProps {
    name: string;
    image?: string;
    _id?: string;
}

const ProductCategoryCard: React.FC<ProductCategoryCardProps> = (props) => {
    const {name, image, _id: categoryId} = props;
    const navigate = useNavigate();
    const handleCategoryClicked = () => {
        navigate(`/products/${categoryId}`);
    }
    return (
    <div
      onClick={handleCategoryClicked}
      className="cursor-pointer p-2 max-w-xs bg-white rounded-lg shadow-md overflow-hidden w-full  transition-transform hover:scale-105 duration-200"
    >
      <div className="w-full aspect-[4/3] overflow-hidden rounded-md">
        <Image
          src={image ? image : chooseImage(name)}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <Text variant="h3" className="font-extrabold text-2xl mt-3 text-center capitalize">
        {name}
      </Text>
    </div>
    );
};

export default ProductCategoryCard;
