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

export const createProduct = createAsyncThunk<void, ProductMutation>(
    'products/createProduct',
    async (productToAdd) => {
        const newProduct = {
            ...productToAdd,
            price: Number(productToAdd.price)
        }
        await axiosApi.post('/products', newProduct);
    }
);