import axios from "axios";
import { baseURL, logoutUser } from "./auth";
import Cookies from "js-cookie";
import catchErrors from "./catchErrors";
import Router from 'next/router'


const userAxios = axios.create({
  baseURL: `${baseURL}/api/v1/user`,
  headers: { Authorization: `Bearer ${Cookies.get("token")}` },
});

export const deleteUser = async (userId, setLoading, loggedInUserId) => {
  setLoading(true)
  console.log(userId, loggedInUserId)
  try {
    await userAxios.delete(`/${userId}`);
    if(loggedInUserId == userId) logoutUser('')
    Router.reload();
  } catch (err) {
    console.log(catchErrors(err));
  }
  setLoading(false)
};

export const editUser = async (email, userId, setNewUser) => {
  try {
    const res = await userAxios.put(`/${userId}`, {
      email,
    });
    // console.log(res.data);
    setNewUser(res.data)
  } catch (err) {
    console.log(catchErrors(err));
  }
};
