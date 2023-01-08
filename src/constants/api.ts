export const LOCAL_API_URL_PRODUCTS = "http://localhost:8080"
export const LOCAL_API_URL_MERCHANTS = "http://localhost:8081"
export const K8S_API_URL = ""

export const IS_LOCAL = false
export const API_URL_PRODUCTS = IS_LOCAL ? LOCAL_API_URL_PRODUCTS : K8S_API_URL
export const API_URL_MERCHANTS = IS_LOCAL ? LOCAL_API_URL_MERCHANTS : K8S_API_URL

export const API_VERSION = "v1"

export const PRODUCTS = "products";
export const MERCHANTS = "merchants";

// Categories
export const getAllCategoriesEndpointK8S = `${ PRODUCTS }/${ API_VERSION }/categories`
export const getAllCategoriesEndpointLocal = `${ API_URL_PRODUCTS }/${ API_VERSION }/categories`
export const getAllCategoriesEndpoint = IS_LOCAL ? getAllCategoriesEndpointLocal : getAllCategoriesEndpointK8S

// Prices
export const getPricesEndpointK8S = `${ MERCHANTS }/${ API_VERSION }/merchants/compareprices`
export const getPricesEndpointLocal = `${ API_URL_MERCHANTS }/${ API_VERSION }/merchants/compareprices`
export const getPricesEndpoint = IS_LOCAL ? getPricesEndpointLocal : getPricesEndpointK8S



