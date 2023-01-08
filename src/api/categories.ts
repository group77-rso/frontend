import { getAllCategoriesEndpoint } from "../constants/api"

interface Category {
    categoryId: number;
    name: string;
}

interface CategoryDetail {
    categoryId: number;
    name: string;
    products: Array<Product>
}

interface Product {
    categoryId: number;
    name: string;
    productId: number;
}

function getAllCategoriesCall(callback: (response: any) => Promise<any>) {
    fetch(getAllCategoriesEndpoint).then(callback)
}

function getCategoryItems(categoryId: number, callback: (response: any) => Promise<any>, errorCallback: () => Promise<any>) {
    fetch(getAllCategoriesEndpoint + "/" + categoryId).then(callback, errorCallback)
}


export type { Category, CategoryDetail, Product }
export { getAllCategoriesCall, getCategoryItems }