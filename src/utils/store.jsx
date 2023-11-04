import { configureStore } from "@reduxjs/toolkit";
import firstPageReducer from "./reducer/firstPageReducer";
import registerReducer from "./reducer/registerReducer";
import loginReducer from "./reducer/loginReducer";
import homeReducer from "./reducer/homeReducer";
import myrecipeReducer from "./reducer/myrecipeReducer";


const store = configureStore({
    reducer: {
        food: firstPageReducer.reducer,
        register: registerReducer.reducer,
        login: loginReducer.reducer,
        home: homeReducer.reducer,
        myrecipe: myrecipeReducer.reducer
    }
});

export default store;