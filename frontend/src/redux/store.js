import { configureStore } from "@reduxjs/toolkit";
import { addEventReducer, getAllEventsReducer } from "./reducer/eventReducer";

const store = configureStore({
  reducer: {
    getAllEvents: getAllEventsReducer,
    addEvent: addEventReducer,
  },
});

export default store;
