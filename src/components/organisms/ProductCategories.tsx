import React from "react";
import ProductCategoryCard from "../molecules/ProductCategoryCard";

const ProductCategories: React.FC = ({categories}) => {
    return (
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categories?.length ? categories.map((item, index) => (
                <ProductCategoryCard key={index} {...item} />
            )): null}
        </div>
    );
};

export default ProductCategories;
