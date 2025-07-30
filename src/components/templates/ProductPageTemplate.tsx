import React, { useEffect, useState } from "react";
import ProductDetails from "../molecules/ProductDetails";
import CustomCarousel from "../organisms/CustomCarousal";
import DateWisePriceList from "../organisms/DateWisePriceList";
import LineChart from "../charts/LineChart";
import { getSingleProductDetail } from "../../services/productService";
import { useParams } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/localStorage";
import { formatISODateToDDMMYYYY } from "../../utils/common";

const carousalData = [
    {
        imageUrl: "https://www.en.krishakjagat.org/wp-content/uploads/2022/10/syn432-768x427.jpg",
        title: 'image-1',
    },
    {
        imageUrl: "https://www.epicgardening.com/wp-content/uploads/2024/10/farmer-holding-wheat-seeds.jpg",
        title: 'image-2',

    },
    {
        imageUrl: "https://www.par.com.pk/assets/images/wheat_pg.webp",
        title: 'image-3',
    }
]

const ProductPageTemplate: React.FC = () => {
    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState(null);

    const fetchSingleProductDetails = async () => {
        const marketDetails = getFromLocalStorage('marketDetails') 
        console.log("marketDetails", marketDetails)
        const res = await getSingleProductDetail(marketDetails._id, productId);
        setProductDetails(() => ({...res, market: marketDetails}));
        console.log("data", res)
    }

    useEffect(() => {
        fetchSingleProductDetails();
    }, [])

    
    const formattedPriceDataForGraph = (price) =>  price?.length? price.map((_price) => [formatISODateToDDMMYYYY(_price.date), _price.maxPrice]): []


    return (
        <div className="p-4 space-y-4 pb-12 mb-12">
            {/* Product Details Section */}
            <ProductDetails
                mandi={productDetails?.market?.name}
                city={productDetails?.market?.city}
                productName={productDetails?.product?.name}
                category={productDetails?.product?.category?.name}
                minPrice="2400"
                maxPrice="2800"
                temperature="32"
                rainChance="10"
            />

            {/* Other sections will be added later */}

            {/* product's available images slider */}
            <CustomCarousel data={carousalData}/>

            {/* product's last 6 days price list */}
            <DateWisePriceList price={productDetails?.price}/>

            {/* product's price chart based on last 6 days price fluctuations */}
            <LineChart data={[['date', 'price'], ...formattedPriceDataForGraph(productDetails?.price)]}/>
        </div>
    );
};

export default ProductPageTemplate;
