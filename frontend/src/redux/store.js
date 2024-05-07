import { configureStore } from "@reduxjs/toolkit";
import {
  addEventReducer,
  deleteEventReducer,
  getAllEventsReducer,
} from "./reducer/eventReducer";

const store = configureStore({
  reducer: {
    getAllEvents: getAllEventsReducer,
    addEvent: addEventReducer,
    deleteEvent: deleteEventReducer,
  },
});

export default store;
