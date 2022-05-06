const EventModel = require("../models/EventModel");
const UserModel = require("../models/UserModel");
const LogModel = require('../models/LogModel');


const addEvent = async (req, res) => {
  const { userId } = req.user;
  const { title, desc, date, type, featured, location, bannerPic } = req.body;

  try {

    const newEvent = {
      title,
      date: date,
      location,
      user: userId,
      bannerPic,
      type,
      featured,
      desc
    };

    const event = await new EventModel(newEvent).save();
    const eventCreated = await EventModel.findOne(event._id).populate("user");

    const user = await UserModel.findById(userId)

    const newLog = await LogModel.create({
      user: userId,
      action: 'added event',
      details: `${user.name} created the event ${title}`
    })

    return res.status(200).json(eventCreated);
  } catch (error) {
    console.log(error);
    res.status(500).send("error at addEvent");
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find()
      .sort({ createdAt: -1 })
      .populate("user");

    // if (!events.length) return res.status(404).send("No events found...");

    return res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).send("error at getAllEvents");
  }
};

const deleteAllEvents = async (req, res) => {
  try {
    await EventModel.deleteMany();

    return res.status(200).send("all events removed");
  } catch (error) {
    console.log(error);
    res.status(500).send("error at deleteAllEvents");
  }
};

//! /:id

const getEvent = async (req, res) => {
  const { id: eventId } = req.params;
  try {
    const event = await EventModel.findById(eventId).populate("user");

    if (!event) res.status(404).send("event not found");

    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).send("error at getEvent");
  }
};

const deleteEvent = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id: eventId } = req.params;

    const event = await EventModel.findById(eventId);
    if (!event) res.status(404).send("event not found");

    const user = await UserModel.findById(userId);

    if (event.user.toString() !== userId) {
      if (user.role === "student" || user.role === "teacher") {
        await event.remove();
        return res.status(200).send("event succesfully removed");
      } else {
        return res.status(401).send("Unauthorized");
      }
    }
    await event.remove();

    const newLog = await LogModel.create({
      user: userId,
      action: 'deleted event',
      details: `${user.name} deleted the event ${event.title}`
    })

    console.log(newLog)

    return res.status(200).send("event succesfully removed");
  } catch (error) {
    console.log(error);
    res.status(500).send("error at deleteEvent");
  }
};

const editEvent = async (req, res) => {
  const { userId } = req.user;
  const { id: eventId } = req.params;

  try {
    const event = await EventModel.findByIdAndUpdate(
      { _id: eventId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    ).populate("user");

    const user = await UserModel.findById(userId)

    if (!event) return res.status(404).send("event not found");
    const newLog = await LogModel.create({
      user: userId,
      action: 'changed event',
      details: `${user.name} changed the event  ${event.title}`
    })

    return res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).send("error at editEvent");
  }
};

//! /featured

const getFeaturedEvents = async (req, res) => {
  try {
    const featuredEvents = await EventModel.find({ featured: true })
      .sort({ date: 1 }) //? sooner events to later events
      .populate("user");

    if (!featuredEvents.length) return res.status(403).send("No featured events found...");

    return res.status(200).json(featuredEvents);
  } catch (error) {
    console.log(error);
    res.status(500).send("error at getFeaturedEvents");
  }
};

module.exports = {
  getAllEvents,
  getEvent,
  deleteEvent,
  editEvent,
  addEvent,
  deleteAllEvents,
  getFeaturedEvents,
};
