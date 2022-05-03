import axios from "axios";
import { baseURL } from "./auth";
import Cookies from "js-cookie";
import catchErrors from "./catchErrors";

const animalAxios = axios.create({
  baseURL: `${baseURL}/api/v1/animal`,
  headers: { Authorization: `Bearer ${Cookies.get("token")}` },
});

export const deleteAnimal = async (animalId, setAnimals) => {
  try {
    await animalAxios.delete(`/${animalId}`);
    setAnimals((prev) => prev.filter((animal) => animal._id !== animalId));
  } catch (error) {
    console.log(catchErrors(error));
  }
};

export const editAnimal = async (
  user,
  name,
  location,
  type,
  gender,
  age,
  breed,
  neutered,
  vaccs,
  colors,
  desc,
  details,
  needs,
  specialNeeds,
  picURLs,
  vidURLs,
  setAnimals,
  animalId
) => {
  try {
    const res = await animalAxios.put(`/${animalId}`, {
      user,
      name: name.trim(),
      age,
      type,
      breed: breed.trim(),
      gender,
      colors: colors.trim(),
      needs,
      specialNeeds: specialNeeds.trim(),
      details: details.trim(),
      desc: desc.trim(),
      vaccs,
      neutered,
      picURLs,
      vidURLs,
      location,
    });
    setAnimals((prev) => prev.filter((animal) => animal._id !== animalId));
    setAnimals((prev) => [res.data, ...prev]);
  } catch (error) {
    console.log(catchErrors(error));
  }
};
