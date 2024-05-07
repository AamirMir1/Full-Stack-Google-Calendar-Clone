const express = require("express");
const app = express();
const port = 4000;
const Event = require("./eventSchema");
const cors = require("cors");

const { connectMongodb } = require("./db");

connectMongodb();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/addevent", async (req, res) => {
  try {
    console.log(req.body);
    const {
      title,
      description,
      status,
      id,
      label,
      day,
      startTime,
      endTime,
      guests,
      location,
    } = req.body;

    if (
      !title ||
      !description ||
      !label ||
      !id ||
      !day ||
      !status ||
      !startTime ||
      !endTime ||
      !guests ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const newEvent = new Event({
      title,
      description,
      label,
      id,
      day,
      status,
      startTime,
      endTime,
      guests,
      location,
    });

    await newEvent.save();

    return res.status(201).json({
      success: true,
      message: "Event Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.get("/allevents", async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.delete("/deleteEvent/:id", async (req, res) => {
  try {
    const event = await Event.find({ id: req.params.id });

    if (!event) {
      return res.status(200).json({
        success: false,
        message: "Event not found",
      });
    }

    await Event.findOneAndDelete({ id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Event Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.put(`/addevent/:id`, async (req, res) => {
  try {
    const { title, description, label, id, day } = req.body;

    if (!title || !description || !label || !id) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const event = await Event.findOne({ id });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    await Event.findByIdAndUpdate(
      event._id,
      {
        title,
        description,
        label,
        day,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Event Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.put(`/updateEvent/:id`, async (req, res) => {
  try {
    console.log(req.params.id, "this is req");
    const event = await Event.findOne({ id: req.params.id });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    await Event.findOneAndUpdate({ id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Event Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is working on port:${port}`);
});
