const EventModel = require("../models/EventModel");
const UserModel = require("../models/UserModel");

const addEvent = async (req, res) => {
  try {
    const {user, desc, date, type, featured, location,} = req.body;

    


  } catch (error) {
    console.log(error);
    res.status(500).send("error at addEvent")
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find("")

    if(!events) res.status(403).send("No events found...")

    res.status(200).json(events);

  } catch (error) {
    console.log(error);
    res.status(500).send("error at getAllEvents")
  }
};

const deleteAllEvents = async (req, res) => {
  try {
    await EventModel.find("").remove(); //? not sure if this will work but dont have a way of testing rn

  } catch (error) {
    console.log(error);
    res.status(500).send("error at deleteAllEvents")
  }
};

//! /:id

const getEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await EventModel.findById(id);

    if(!event) res.status(403).send("event not found");

    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).send("error at getEvent")
  }
};

const deleteEvent = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {id: eventId} = req.params

    const event = await EventModel.findById(eventId);
    if (!event) res.status(403).send("event not found");

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
  } catch (error) {
    console.log(error);
    res.status(500).send("error at deleteEvent")
  }
};

const editEvent = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).send("error at editEvent")
  }
}

//! /featured

const getFeaturedEvents = async (req, res) => {
  try {
    const featuredEvents = await EventModel.find({ featured: true });

    if(!featuredEvents) res.status(403).send("No featured events found...");

    res.status(200).json(featuredEvents);
  } catch (error) {
    console.log(error);
    res.status(500).send("error at getFeaturedEvents")
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
