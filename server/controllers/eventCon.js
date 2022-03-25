const EventModel = require("../models/EventModel");
const UserModel = require("../models/UserModel");

const addEvent = async (req, res) => {
  return res.status(200).send("addEvent")
};

const getAllEvents = async (req, res) => {
  return res.status(200).send("getAllEvents")
};

const deleteAllEvents = async (req, res) => {
  return res.status(200).send("deleteAllEvents")
};

//! /:id

const getEvent = async (req, res) => {
  return res.status(200).send("getEvent")
};

const deleteEvent = async (req, res) => {
  return res.status(200).send("deleteEvent")
};

const editEvent = async (req, res) => {
  return res.status(200).send("editEvent")
}

//! /featured

const getFeaturedEvents = async (req, res) => {
  return res.status(200).send("getFeaturedEvents")
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
