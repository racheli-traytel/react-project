import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./RecipeSlice";

const store = configureStore({
    reducer:{recipes:recipeReducer} ,
});

export type RootStore = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export default store;

