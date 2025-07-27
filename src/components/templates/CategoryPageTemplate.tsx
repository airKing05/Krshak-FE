import React, { useEffect, useState } from "react";
import ProductList from "../organisms/ProductList";
import { useParams } from "react-router-dom";
import Input from "../atoms/Input";
import { getMarketProducts } from "../../services/productService";
import { getFromLocalStorage } from "../../utils/localStorage";

const CategoryPageTemplate: React.FC = () => {
    const params = useParams();
    const [productsList, setProductsList] = useState([]);
    const [inputCategory, setInputCategory] = useState(params?.category || "");

    const handleCategoryChange = (e) => {
        setInputCategory(e.target.value)
    };
    const handleProductChange = () => {};


    const fetchMarketProductsList = async () => {
        // here we have to paas marketId and CategoryId too, 
        // if want to search based on product name, need to implement those things as well
        const {_id: marketId} = getFromLocalStorage('marketDetails')
        const res = await getMarketProducts(marketId, inputCategory);
        setProductsList(res.products);
    }
    
    useEffect(() => {
        fetchMarketProductsList();
    }, [])

    return (
        <div className="p-4 space-y-4">
            {/* Input Fields */}
            {/* here categories is automatically selected as soon as user land to this page, also can be changeable */}
            {/* search products to this page based on selected categories */}
            
            <div className="flex space-x-2">
                 <Input 
                    name="product"
                    type="text" 
                    placeholder="Search products" 
                    className="flex-1"
                    value=""
                    onChange={handleProductChange}
                />
                <Input 
                    name="category"
                    type="text" 
                    placeholder="Filter category" 
                    className="flex-1 max-w-40 p-2"
                    value={inputCategory}
                    onChange={handleCategoryChange}
                />
            </div>

            {/* Product List */}
            <ProductList productsList={productsList}/>
        </div>
    );
};

export default CategoryPageTemplate;
