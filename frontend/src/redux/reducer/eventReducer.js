import { createReducer } from "@reduxjs/toolkit";

export const getAllEventsReducer = createReducer({}, (bundler) => {
  bundler.addCase("getAllEventsRequest", (state) => {
    state.loading = true;
  });
  bundler.addCase("getAllEventsSuccess", (state, action) => {
    state.loading = false;
    state.events = action.payload;
  });
  bundler.addCase("getAllEventsFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  bundler.addCase("clearError", (state, action) => {
    state.loading = false;
    state.error = null;
  });
});

export const addEventReducer = createReducer({}, (bundler) => {
  bundler.addCase("addEventRequest", (state) => {
    state.loading = true;
  });
  bundler.addCase("addEventSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  });
  bundler.addCase("addEventFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  bundler.addCase("clearError", (state, action) => {
    state.error = null;
  });
  bundler.addCase("clearMessage", (state, action) => {
    state.message = null;
  });
});

export const deleteEventReducer = createReducer({}, (bundler) => {
  bundler.addCase("deleteEventRequest", (state) => {
    state.loading = true;
  });
  bundler.addCase("deleteEventSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  });
  bundler.addCase("deleteEventFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  bundler.addCase("clearError", (state, action) => {
    state.error = null;
  });
  bundler.addCase("clearMessage", (state, action) => {
    state.message = null;
  });
});

export const updateEventReducer = createReducer({}, (bundler) => {
  bundler.addCase("updateEventRequest", (state) => {
    state.loading = true;
  });
  bundler.addCase("updateEventSuccess", (state, action) => {
    state.loading = false;
    state.message = action.payload;
  });
  bundler.addCase("updateEventFailure", (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  bundler.addCase("clearError", (state, action) => {
    state.error = null;
  });
  bundler.addCase("clearMessage", (state, action) => {
    state.message = null;
  });
});
