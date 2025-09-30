export type Filters = {
  market1Id: string;
  market2Id: string;
  categoryId: string;
  date: string;
};

export type FilterChangeEvent = {
  target: {
    name: string;
    value: string;
  };
};


export type UserObj = {
  email: string;
  role: string;
}



// product related
export interface Market {
  _id: string;
  name: string;
  city: string;
  district: string;
  state:string;
  lat: number;
  lng: number;
}
export interface ProductCategory {
  name: string;
  image?: string;
  _id?: string;
}

export interface Product {
  name: string;
  category: ProductCategory;
  _id?:string;
}

export interface PricePoint {
  date: string;
  maxPrice: number;
  minPrice: number;
}

export interface ProductDetailsType {
  product: Product;
  price: PricePoint[];
  market: Market;
}


// extend versions
export interface DetailedProduct extends Product {
  marketId: string;
  latestMaxPrice: number;
  _id:string;
}