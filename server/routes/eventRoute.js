const router = require("express").Router();

const {getAllEvents, getEvent, deleteEvent, addEvent, deleteAllEvents, getFeaturedEvents} = require("../controllers/eventCon");

module.exports = router