import React from "react";
import ProductCategoryCard from "../molecules/ProductCategoryCard";

const ProductCategories: React.FC = ({categories}) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            {categories.map((item, index) => (
                <ProductCategoryCard key={index} {...item} />
            ))}
        </div>
    );
};

export default ProductCategories;
