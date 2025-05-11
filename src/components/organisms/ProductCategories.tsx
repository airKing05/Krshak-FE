import React from "react";
import ProductCategoryCard from "../molecules/ProductCategoryCard";

const ProductCategories: React.FC = () => {
    const categories = [
        { category: "wheat", image: "https://5.imimg.com/data5/ST/QW/MY-38700875/fresh-wheat-crop.jpg" },
        { category: "rice", image: "https://5.imimg.com/data5/SELLER/Default/2021/3/UK/NH/LE/83707430/pr-122-paddy-seed-500x500.png" },
        { category: "rice", image: "https://5.imimg.com/data5/SELLER/Default/2021/3/UK/NH/LE/83707430/pr-122-paddy-seed-500x500.png" },
        { category: "rice", image: "https://5.imimg.com/data5/SELLER/Default/2021/3/UK/NH/LE/83707430/pr-122-paddy-seed-500x500.png" },
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {categories.map((item, index) => (
                <ProductCategoryCard key={index} {...item} />
            ))}
        </div>
    );
};

export default ProductCategories;
