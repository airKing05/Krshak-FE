import React from "react";
import ProductDetails from "../molecules/ProductDetails";
import CustomCarousel from "../organisms/CustomCarousal";
import DateWisePriceList from "../organisms/DateWisePriceList";
import LineChart from "../charts/LineChart";



const ProductPageTemplate: React.FC = () => {

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
    return (
        <div className="p-4 space-y-4 pb-12">
            {/* Product Details Section */}
            <ProductDetails
                mandi="Azadpur Mandi"
                city="Delhi"
                productName="4037"
                category="Wheat"
                minPrice="2400"
                maxPrice="2800"
                temperature="32"
                rainChance="10"
            />

            {/* Other sections will be added later */}

            {/* product's available images slider */}
            <CustomCarousel data={carousalData}/>

            {/* product's last 6 days price list */}
            <DateWisePriceList/>

            {/* product's price chart based on last 6 days price fluctuations */}
            <LineChart/>
        </div>
    );
};

export default ProductPageTemplate;
