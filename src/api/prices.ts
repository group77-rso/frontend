import {getAllCategoriesEndpoint, getPricesEndpoint} from "../constants/api"

interface Prices {
    prices: Array<Price>;
    product: Product;
}

interface Price {
    merchant: string;
    price: number;
    productId: number;
    productLink: string;
}

interface Product {
    categoryId: number;
    name: string;
    productId: number;
}

function getPricesForProduct(productId: number, callback: (response: any) => Promise<any>, errorCallback: () => Promise<any>) {
    fetch(getPricesEndpoint + "/" + productId).then(callback, errorCallback)
}


export type { Prices, Price, Product }
export { getPricesForProduct }