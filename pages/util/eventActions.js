import axios from "axios";
import { baseURL } from "./auth";
import Cookies from "js-cookie";
import catchErrors from "./catchErrors";

const eventAxios = axios.create({
  baseURL: `${baseURL}/api/v1/event`,
  headers: { Authorization: `Bearer ${Cookies.get("token")}` },
});

export const deleteEvent = async (eventId, setEvents) => {
  try {
    await eventAxios.delete(`/${eventId}`);
    setEvents((prev) => prev.filter((event) => event._id !== eventId));
  } catch (error) {
    console.log(catchErrors(error));
  }
};

export const addEvent = async (
  title,
  desc,
  date,
  type,
  bannerPic,
  location,
  featured,
  setEvents,
  setNewEvent
) => {
  try {
    const res = await eventAxios.post("/", {
      title,
      desc,
      date,
      type,
      bannerPic,
      location,
      featured,
    });
    setEvents((prev) => [res.data, ...prev]);
    // setEvents((prev) => prev.sort((a, b) => a.date - b.date));
    setNewEvent({
      title: "",
      desc: "",
      date: "",
      type: "",
      featured: false,
      location: "",
      bannerPic: "",
    });
  } catch {
    console.log(error);
    console.log(catchErrors(error));
  }
};

export const editEvent = async (
  title,
  desc,
  date,
  type,
  bannerPic,
  location,
  featured,
  setEvents,
  eventId,
) => {
  try {
    const res = await eventAxios.put(`/${eventId}`, {
      title: title.trim(),
      desc: desc.trim(),
      date,
      type: type.trim(),
      bannerPic,
      location: location.trim(),
      featured,
    });
    setEvents((prev) => prev.filter((event) => event._id !== eventId));
    setEvents((prev) => [res.data, ...prev]);
    // setEvents((prev) => prev.sort((a,b) => a.date - b.date));
  } catch (error) {
    console.log(catchErrors(error));
  }
};
