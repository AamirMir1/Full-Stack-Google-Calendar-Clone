import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import "./calendar.css";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import TimePicker from "react-time-picker";
import { addEvent, getAllEvents } from "../redux/action/eventAction";
import { HiUserGroup } from "react-icons/hi";
import { TbFileDescription } from "react-icons/tb";
import { MdOutlineGroup } from "react-icons/md";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { CiClock2 } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    showEventModal,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.addEvent);
  const { events } = useSelector((state) => state.getAllEvents);
  console.log("juuu events", events);
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      setShowEventModal(false);
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, message, error]);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState("Event");
  const [description, setDescription] = useState("");
  const [guests, setGuests] = useState("");
  const [location, setLocation] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
      startTime,
      endTime,
      guests,
      location,
      status,
    };

    // if (selectedEvent) {
    //   dispatchCalEvent({ type: "update", payload: calendarEvent });
    // } else {
    //   dispatchCalEvent({ type: "push", payload: calendarEvent });
    // }
    await dispatch(addEvent(calendarEvent));
    dispatch(getAllEvents());
  }

  console.log(daySelected, "this is day selected");
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      {!selectedEvent ? (
        <Modal className="calendar-modal" show={true}>
          <div className="calendar-events-container">
            <div className="calendar-header">
              <IoMdClose
                onClick={() => setShowEventModal(false)}
                size={25}
                className="calendar-close-icon"
              />
            </div>
            <div className="calendar-events-container-child">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="calendar-title"
                placeholder="Add Title"
                type="text"
              />
              <div className="calendar-buttons">
                <button
                  onClick={() => setStatus("Event")}
                  style={{
                    color: status === "Event" ? "#e8f0fe" : "black",
                    backgroundColor: status === "Event" ? "#1967d2" : "white",
                  }}
                >
                  Event
                </button>
                <button
                  onClick={() => setStatus("Task")}
                  style={{
                    color: status === "Task" ? "#e8f0fe" : "black",
                    backgroundColor: status === "Task" ? "#1967d2" : "white",
                  }}
                >
                  Task
                </button>
                <button
                  onClick={() => setStatus("Appointment Schedule")}
                  style={{
                    color:
                      status === "Appointment Schedule" ? "#e8f0fe" : "black",
                    backgroundColor:
                      status === "Appointment Schedule" ? "#1967d2" : "white",
                  }}
                >
                  Appointment Schedule
                </button>
              </div>
              <div className="calendar-clock-container">
                <div className="calendar-clock">
                  <CiClock2 size={20} />
                  <span>{daySelected.format("dddd, MMMM DD")}</span>
                  <div className="calendar-timing calendar-start-time">
                    <span>Start Time:</span>
                    <TimePicker
                      value={startTime}
                      disableClock
                      onChange={setStartTime}
                      clockIcon
                    />
                  </div>
                  <div className="calendar-timing">
                    <span>End Time:</span>
                    <TimePicker
                      value={endTime}
                      onChange={setEndTime}
                      disableClock
                      clockIcon
                    />
                  </div>
                </div>
              </div>
              <div className="calendar-inputs">
                <div className="calendar-clock">
                  <MdOutlineGroup size={20} />
                  <input
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="calendar-inputs"
                    placeholder="Add Guests"
                  />
                </div>
                <div className="calendar-clock">
                  <IoLocationOutline size={20} />
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="calendar-inputs"
                    placeholder="Add Location"
                  />
                </div>
                <div className="calendar-clock">
                  <TbFileDescription size={20} />
                  <input
                    className="calendar-inputs"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add Description"
                  />
                </div>
                <div style={{ marginBlock: "20px" }} className="flex gap-x-2">
                  {labelsClasses.map((lblClass, i) => (
                    <span
                      key={i}
                      onClick={() => setSelectedLabel(lblClass)}
                      className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                    >
                      {selectedLabel === lblClass && (
                        <span className="material-icons-outlined text-white text-sm">
                          check
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <div className="calendar-all-buttons">
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="calendar-cancel-button"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="calendar-save-button"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal show={true} onHide={() => setShowEventModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

/*
 <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
*/
