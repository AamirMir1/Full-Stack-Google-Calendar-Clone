import axios from "axios";

export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllEventsRequest" });
    const { data } = await axios.get("http://localhost:4000/allevents");
    dispatch({ type: "getAllEventsSuccess", payload: data?.events });
  } catch (error) {
    dispatch({
      type: "getAllEventsFailure",
      payload: error?.response?.data?.message,
    });
  }
};

export const addEvent = (calendarEvent) => async (dispatch) => {
  try {
    dispatch({ type: "addEventRequest" });
    const { data } = await axios.post(
      "http://localhost:4000/addEvent",
      calendarEvent,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "addEventSuccess", payload: "Event Added Successfully" });
  } catch (error) {
    dispatch({
      type: "addEventFailure",
      payload: error?.response?.data?.message,
    });
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteEventRequest" });
    const { data } = await axios.delete(
      `http://localhost:4000/deleteEvent/${id}`
    );
    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteEventFailure",
      payload: error?.response?.data?.message,
    });
  }
};
