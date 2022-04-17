import {configureStore} from "@reduxjs/toolkit";
import heroes from "../reducers/heroes";
import filters from "../reducers/filters";


const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'

})

export default store;
