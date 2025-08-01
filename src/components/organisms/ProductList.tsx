import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../molecules/Card";
import { useNavigate } from "react-router-dom";
import { DetailedProduct } from "../../types/common";


const productsImages: Record<string, string> = {
    "lokwan": 'https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop.jpg',
    "lamaba gehu": 'https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop.jpg',
    "piddi": 'https://gachwala.in/wp-content/uploads/2023/02/WHEAT.jpg',
    "4037" : 'https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop.jpg',
    "js": 'https://5.imimg.com/data5/SELLER/Default/2025/3/496240959/PG/EK/GQ/186090800/non-gmo-soybean-500x500.png'
};



interface ProductListProps{
  productsList : DetailedProduct[]
}
const ProductList: React.FC<ProductListProps> = ({productsList}) => {
    const [products, setProducts] = useState<DetailedProduct[]>([...productsList]);
   // we have data still it is not able to render on first time load 

    useEffect(() => {
        setProducts([...productsList])
    }, [productsList]) 

    const navigate = useNavigate();

    const fetchMoreData = () => {
        setTimeout(() => {
            setProducts((prev) => [
                ...prev,
                {
                  category: {
                    name:  "gehu",
                    _id: "68825af9b3d068cc2b8e2ba3"
                  },
                  latestMaxPrice: 2800,
                  marketId: "68839617d93a5d7d8bb59dd7",
                  name: '4037',
                  _id: "688262eb1b65ac84ede76259aaaaa"
                }
            ]);
        }, 1000);
    };

    const handleProductClicked = (productId: string) => {
        navigate(`/product-details/${productId}`);
    }

    return (
        <InfiniteScroll dataLength={products.length} next={fetchMoreData} hasMore={true} loader={<p>Loading...</p>}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
                {products.map((item) => (
                   <React.Fragment key={item._id} >
                     <Card 
                        imageUrl={productsImages[item.name]} 
                        title={item.name} 
                        subtitle={item.category.name} 
                        maxPrice={item.latestMaxPrice} 
                        showWishButton
                        handleClick={() => handleProductClicked(item._id)}
                    />
                   </React.Fragment>
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default ProductList;
