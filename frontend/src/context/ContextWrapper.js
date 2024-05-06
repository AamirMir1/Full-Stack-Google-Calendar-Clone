import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../redux/action/eventAction";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}
function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export default function ContextWrapper(props) {
  const { events } = useSelector((state) => state.getAllEvents);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  // const [savedEvents, dispatchCalEvent] = useReducer(
  //   savedEventsReducer,
  //   [],
  //   initEvents
  // );

  const [savedEvents, setSavedEvents] = useState([]);
  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  console.log(filteredEvents, "these are filtered events");
  // const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    if (events && savedEvents?.length < 1) {
      const newArr = events?.map((event) => {
        return {
          ...event,
          day: Number(event.day),
          id: Number(event.id),
        };
      });
      setSavedEvents(events);
      console.log(newArr, "this is new arr");
    }
  }, [events]);

  console.log(savedEvents, "these are saved Events");
  // useEffect(() => {
  //   const newEvents = savedEvents.filter((evt) =>
  //     labels
  //       .filter((lbl) => lbl.checked)
  //       .map((lbl) => lbl.label)
  //       .includes(evt.label)
  //   );

  //   setFilteredEvents(newEvents);
  // }, [savedEvents, labels]);

  // useEffect(() => {
  //   localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  // }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label) {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        // dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
