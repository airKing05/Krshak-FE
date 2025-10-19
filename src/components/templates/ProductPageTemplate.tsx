import React, { useEffect, useState } from "react";
import ProductDetails from "../molecules/ProductDetails";
// import CustomCarousel from "../organisms/CustomCarousal";
import DateWisePriceList from "../organisms/DateWisePriceList";
import LineChart from "../charts/LineChart";
import { getSingleProductDetail } from "../../services/productService";
import { useParams } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/localStorage";
import { formatISODateToDDMMYYYY } from "../../utils/common";
import { Market, ProductDetailsType, User } from "../../types/common";
import { deleteSingleMarketProduct } from "../../services/adminService";

// const carousalData = [
//     {
//         imageUrl: "https://www.en.krishakjagat.org/wp-content/uploads/2022/10/syn432-768x427.jpg",
//         title: 'image-1',
//     },
//     {
//         imageUrl: "https://www.epicgardening.com/wp-content/uploads/2024/10/farmer-holding-wheat-seeds.jpg",
//         title: 'image-2',

//     },
//     {
//         imageUrl: "https://www.par.com.pk/assets/images/wheat_pg.webp",
//         title: 'image-3',
//     }
// ]

const formattedPriceDataForGraph = (price?: ProductDetailsType['price']) =>  price?.length? price.map((_price) => [formatISODateToDDMMYYYY(_price.date), _price.maxPrice]): []


const ProductPageTemplate: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [productDetails, setProductDetails] = useState<ProductDetailsType | null>(null);
    const user = getFromLocalStorage("user") as User | null;
    const isAdmin = user?.role === "admin";
    const marketDetails = getFromLocalStorage('marketDetails') as Market;


    const fetchSingleProductDetails = async () => {
        const res = await getSingleProductDetail(marketDetails._id, productId);
        setProductDetails(() => ({...res, market: marketDetails}));
    }

    useEffect(() => {
        fetchSingleProductDetails();
    }, [])

    const handleDeleteProduct = async () => {
      try {
        if(!productId) return;
        await deleteSingleMarketProduct(marketDetails._id, productId);
      } catch (error) {
        console.error("Error:", error)
      }
    }

    return (
        <div className="p-4 space-y-4 pb-12 mb-12">
            {/* Product Details Section */}
            <ProductDetails
                marketName={productDetails?.market?.name}
                city={productDetails?.market?.city}
                productName={productDetails?.product?.name}
                category={productDetails?.product?.category?.name}
                minPrice="2400"
                maxPrice="2800"
                temperature="32"
                rainChance="10"
                handleDeleteProduct={handleDeleteProduct}
                isAdmin={isAdmin}
            />

            {/* Other sections will be added later */}

            {/* product's available images slider */}
            {/* <CustomCarousel data={carousalData}/> */}

            {/* product's last 6 days price list */}
            <DateWisePriceList price={productDetails?.price}/>

            {/* product's price chart based on last 6 days price fluctuations */}
            <LineChart data={[['date', 'price'], ...formattedPriceDataForGraph(productDetails?.price)]}/>
        </div>
    );
};

export default ProductPageTemplate;
