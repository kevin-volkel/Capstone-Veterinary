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
const { authMiddleware } = require('../middleware/auth')

router.route("/").get(getAllEvents).post(authMiddleware, addEvent).delete(authMiddleware, deleteAllEvents);

router.route("/featured").get(getFeaturedEvents);

router.route("/:id").get(getEvent).delete(authMiddleware, deleteEvent).put(authMiddleware, editEvent)

module.exports = router;
