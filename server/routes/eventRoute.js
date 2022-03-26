const router = require("express").Router();

const {
  getAllEvents,
  getEvent,
  deleteEvent,
  editEvent,
  addEvent,
  deleteAllEvents,
  getFeaturedEvents,
} = require("../controllers/eventCon");

router.route("/").get(getAllEvents).post(addEvent).delete(deleteAllEvents);

router.route("/featured").get(getFeaturedEvents);

router.route("/:id").get(getEvent).delete(deleteEvent).put(editEvent)

module.exports = router;
