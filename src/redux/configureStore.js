import { configureStore, combineReducers } from "@reduxjs/toolkit";
import calendarTitleSlice from "./CalendarTitleSlice"
import calendarDateSlice from "./CalendarDateSlice"

const reducer = combineReducers({
    currentDate:  calendarDateSlice,
    currentTitle:  calendarTitleSlice
});

const store = configureStore({
    reducer
});

export default store;