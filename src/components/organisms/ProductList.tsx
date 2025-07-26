import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../molecules/Card";
import { useNavigate } from "react-router-dom";


const productsImages = {
    "lokwan": 'https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop.jpg',
    "lamaba gehu": 'https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop.jpg',
    "piddi": 'https://gachwala.in/wp-content/uploads/2023/02/WHEAT.jpg',
    "4037" : 'https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop.jpg'
};

const ProductList: React.FC = ({productsList}) => {
    const [products, setProducts] = useState([...productsList]);
    console.log("productsList....", products)
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
                  _id: "688262eb1b65ac84ede76259"
                }
            ]);
        }, 1000);
    };

    const handleProductClicked = (product: string) => {
        navigate(`/products/${product}`);
    }

    return (
        <InfiniteScroll dataLength={products.length} next={fetchMoreData} hasMore={true} loader={<p>Loading...</p>}>
            <div className="space-y-3">
                {products.map((item) => (
                    <Card 
                        key={item._id} 
                        imageUrl={productsImages[item.name]} 
                        title={item.name} 
                        subtitle={item.category.name} 
                        maxPrice={item.latestMaxPrice} 
                        showWishButton
                        handleClick={() => handleProductClicked(item.name)}
                    />
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default ProductList;
