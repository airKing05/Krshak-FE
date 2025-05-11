import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../molecules/Card";
import { useNavigate } from "react-router-dom";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState([
        { id: 1, imageUrl: "https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop.jpg", name: "Product A1", category: "Electronics", maxPrice: "1200" },
        { id: 2, imageUrl: "https://gachwala.in/wp-content/uploads/2023/02/WHEAT.jpg", name: "Product B2", category: "Furniture", maxPrice: "8000" },
        { id: 3, imageUrl: "https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop.jpg", name: "Product A3", category: "Electronics", maxPrice: "1200" },
        { id: 4, imageUrl: "https://gachwala.in/wp-content/uploads/2023/02/WHEAT.jpg", name: "Product B4", category: "Furniture", maxPrice: "8000" },
        { id: 5, imageUrl: "https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop.jpg", name: "Product A5", category: "Electronics", maxPrice: "1200" },
        { id: 6, imageUrl: "https://gachwala.in/wp-content/uploads/2023/02/WHEAT.jpg", name: "Product B6", category: "Furniture", maxPrice: "8000" },
        { id: 7, imageUrl: "https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop.jpg", name: "Product A7", category: "Electronics", maxPrice: "1200" },
        { id: 8, imageUrl: "https://gachwala.in/wp-content/uploads/2023/02/WHEAT.jpg", name: "Product B8", category: "Furniture", maxPrice: "8000" },
        // Load More...
    ]);

    const navigate = useNavigate();

    const fetchMoreData = () => {
        setTimeout(() => {
            setProducts((prev) => [
                ...prev,
                { id: prev.length + 1, imageUrl: "product3.jpg", name: "New Product", category: "Appliances", maxPrice: "3000" },
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
                    key={item.id} 
                    imageUrl={item.imageUrl} 
                    title={item.name} 
                    subtitle={item.category} 
                    maxPrice={item.maxPrice} 
                    showWishButton
                        handleClick={() => handleProductClicked(item.name)}
                    />
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default ProductList;
