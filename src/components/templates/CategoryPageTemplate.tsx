import React from "react";
import ProductList from "../organisms/ProductList";

const CategoryPageTemplate: React.FC = () => {
    return (
        <div className="p-4 space-y-4">
            {/* Input Fields */}
            <div className="flex space-x-2">
                <input type="text" placeholder="Search products" className="flex-1 max-w-34 p-2 border rounded" />
                <input type="text" placeholder="Filter category" className="flex-1 p-2 border rounded" />
            </div>

            {/* Product List */}
            <ProductList />
        </div>
    );
};

export default CategoryPageTemplate;
