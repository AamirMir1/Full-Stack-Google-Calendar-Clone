import { configureStore } from "@reduxjs/toolkit";
import {
  addEventReducer,
  deleteEventReducer,
  getAllEventsReducer,
  updateEventReducer,
} from "./reducer/eventReducer";

const store = configureStore({
  reducer: {
    getAllEvents: getAllEventsReducer,
    addEvent: addEventReducer,
    deleteEvent: deleteEventReducer,
    updateEvent: updateEventReducer,
  },
});

export default store;
