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
  user,
  title,
  desc,
  date,
  type,
  bannerPic,
  location,
  eventId
) => {
  try {
    const res = await eventAxios.post(`/${eventId}`, {
      user,
      title,
      desc,
      date,
      type,
      bannerPic,
      location,
    });
    setEvents((prev) => [res.data, ...prev]);
  } catch {
    console.log(catchErrors(error));
  }
};
