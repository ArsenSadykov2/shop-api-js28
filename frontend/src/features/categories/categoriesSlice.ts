import type {Category} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchCategories} from "./categoriesThunks.ts";

interface CategoriesState {
    items: Category[];
    item: Category | null;
    fetching: boolean;
};

const initialState: CategoriesState = {
    items: [],
    item: null,
    fetching: false
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCategories.pending, (state) => {
            state.fetching = true;
            })
            .addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
                state.items = categories;
                state.fetching = false;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.fetching = false;
            })
    },
    selectors: {
        selectCategories: state => state.items,
        selectFetchingCategories: state => state.fetching
    }
});

export const categoriesReducer = categoriesSlice.reducer;
export const {selectCategories, selectFetchingCategories} = categoriesSlice.selectors;