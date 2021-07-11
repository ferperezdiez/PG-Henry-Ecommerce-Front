
import { GET_ALL_PRODUCTS, GET_PRODUCT_DETAIL, GET_ALL_CATEGORIES, GET_PRODUCT_BY_NAME, GET_FILTRATED_CATEGORIES } from "../constants";
import {backendUrl} from '../constantURL'
import axios from 'axios';


export const getAllProducts = () => {
    return (dispatch) => {
        fetch(`${backendUrl}/products`)

        .then((response) => response.json())
        .then((response) => 
        dispatch({
            type: GET_ALL_PRODUCTS,
            payload: response
        })) 
    }
}

export const getProductDetail = (id) => {
    return (dispatch) => {
        fetch(`${backendUrl}/products/${id}`)
        .then((response) => response.json())
        .then((response) => 
        dispatch({
            type: GET_PRODUCT_DETAIL,
            payload: response
        })) 
    };
};

export const getAllCategories = () => {
    return (dispatch) => {
        fetch(`${backendUrl}/categories`)
        .then((response) => response.json())
        .then((response) => 
        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: response
        })) 
    }
}

export const getProductByName=(name)=>{
    return (dispatch)=>{
        fetch(`${backendUrl}/products?name=${name}`)
        .then((response)=> response.json())
        .then((response)=>
        dispatch({
            type:GET_PRODUCT_BY_NAME,
            payload:response
        }))
    }
}


export const getFiltratedCategories = (cat) => {
    if (cat ==='All'){
        return (dispatch) => {
            dispatch({
                type: 'RESTART_PRODUCTS',
            })
        }
    }
    return (dispatch) => {
        axios.get(`${backendUrl}/category/p_name/${cat}`)
        .then((response) => 
        dispatch({
            type: GET_FILTRATED_CATEGORIES,
            payload: response.data[0].Products
        })) 
    }
}

