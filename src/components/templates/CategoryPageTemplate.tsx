import React, { useEffect, useRef, useState } from "react";
import ProductList from "../organisms/ProductList";
import { useParams } from "react-router-dom";
import Input from "../atoms/Input";
import { getMarketCategories, getMarketProducts } from "../../services/productService";
import { getFromLocalStorage } from "../../utils/localStorage";
import CustomSelect, { Option } from "../atoms/CustomSelect";
import { debounce } from "../../utils/common";
import { Market, DetailedProduct, ProductCategory } from "../../types/common";
import Text from "../atoms/Text";

const CategoryPageTemplate: React.FC = () => {
    const params = useParams();
    const [productsList, setProductsList] = useState<DetailedProduct[]>([]);
    const [inputCategory, setInputCategory] = useState(params?.categoryId || "");
    const [categoriesOptions, setCategoryOptions] = useState<Option[]>([]);

    const handleProductSearch = useRef(
        debounce((value: string) => {
            fetchMarketProductsList(inputCategory, value)
        }, 500)
    );


    const fetchMarketProductsList = async (inputCategory: string, inputProduct?:string) => {
        // here we have to paas marketId and CategoryId too, 
        // if want to search based on product name, need to implement those things as well
        // TODO improve for infinite scrolling
        const {_id: marketId} = getFromLocalStorage('marketDetails') as Market;
        const res = await getMarketProducts(marketId, inputCategory, inputProduct);
        setProductsList(res.products);
    }
    
    useEffect(() => {
        if(inputCategory){
          fetchMarketProductsList(inputCategory, "");
        }
    }, [inputCategory])

    const getCategoriesListByMarketId = async(marketId: string) => {
        const res = await getMarketCategories(marketId);
        const categoriesOptionsList = [{ label: 'All', value: 'all' }, ...res.map((c: ProductCategory) => ({ label: c.name, value: c._id }))]
        setCategoryOptions(categoriesOptionsList || [])
    }

    useEffect(() => {
        const marketDetails = getFromLocalStorage('marketDetails') as Market;
        if(marketDetails?._id){
          getCategoriesListByMarketId(marketDetails?._id);
        }
    }, []);

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
                    // value=""
                    onChange={(e) => handleProductSearch.current(e.target.value)}
                />
                <div className="min-w-36">
                    <CustomSelect
                        value={inputCategory}
                        onChange={setInputCategory}
                        options={categoriesOptions}
                        placeholder={`Select Category`}
                    />
                </div>
            </div>

            {/* Product List */}
            <ProductList productsList={productsList}/>

            {
               productsList.length <=0 ? <Text variant="p">No product found for this market categories combination</Text> : null
            }
        </div>
    );
};

export default CategoryPageTemplate;
