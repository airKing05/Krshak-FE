import React from "react";
import ProductCategoryCard from "../molecules/ProductCategoryCard";
import { ProductCategory } from "../../types/common";

interface ProductCategoriesProps {
  categories: ProductCategory[];
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({categories}) => {
    return (
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categories?.length ? categories.map((item, index) => (
                <React.Fragment key={index}>
                    <ProductCategoryCard  name={item.name} _id={item._id}/>
                </React.Fragment>
            )): null}
        </div>
    );
};

export default ProductCategories;
