import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./features/history/historySlice"
import { useDispatch, useSelector } from "react-redux";

export default configureStore({
    reducer:{
        history: historyReducer
    }
})
