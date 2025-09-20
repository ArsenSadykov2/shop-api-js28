import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {Product, ProductMutation} from "../../types";

export const fetchAllProducts = createAsyncThunk<Product[], void>(
    'products/fetchProducts',
    async () => {
        const response = await axiosApi.get<Product[]>('/products');
        return response.data;
    }
);

export const fetchProductById = createAsyncThunk<Product, string>(
    'products/fetchProductById',
    async (productId) => {
        const response = await axiosApi.get<Product>('/products/' + productId);
        return response.data || null;
    }
);

export const createProduct = createAsyncThunk<void, ProductMutation>(
    'products/createProduct',
    async (productToAdd) => {
        const formData = new FormData();

        const keys = Object.keys(productToAdd) as (keyof ProductMutation)[];
        keys.forEach(key => {
            const value = productToAdd[key] as (keyof ProductMutation);
            if(value !== null) {
                formData.append(key, value);
            }
        })
        await axiosApi.post('/products', formData);
    }
);