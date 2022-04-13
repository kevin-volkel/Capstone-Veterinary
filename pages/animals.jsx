import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "./util/auth";
import {
  Button,
  Card,
  Container,
  Dropdown,
  Grid,
  Header,
  Image,
  Segment,
} from "semantic-ui-react";
import AnimalCard from "./components/animals/AnimalCard";

const animals = ({ animals }) => {
  const typeOptions = [
    {
      text: "Any Type",
      value: "any",
    },
    {
      text: "Dog",
      value: "dog",
    },
    {
      text: "Cat",
      value: "cat",
    },
  ];

  const ageOptions = [
    {
      text: "Any Age",
      value: "any",
    },
    {
      text: "Puppy",
      value: "puppy",
    },
    {
      text: "Young",
      value: "young",
    },
    {
      text: "Adult",
      value: "adult",
    },
    {
      text: "Senior",
      value: "senior",
    },
  ];

  const genderOptions = [
    {
      text: "Any Gender",
      value: "any",
    },
    {
      text: "Male",
      value: "male",
    },
    {
      text: "Female",
      value: "female",
    },
  ];

  const [filterObj, setFilterObj] = useState({
    type: "any",
    age: "any",
    gender: "any",
  });
  const [filteredAnimals, setFilteredAnimals] = useState(animals);

  const filterResults = (_, data) => {
    const { name, value } = data;
    setFilterObj((prev) => ({ ...prev, [name]: value }));

    console.log(filterObj);

    setFilteredAnimals(animals);

    const { type, age, gender } = filterObj;
    if (type !== "any") {
      setFilteredAnimals((prev) =>
        prev.filter((animal) => animal.type === type)
      );
    }
  };

  return (
    <div id="adoption">
      <Header as="h1">Adopt A Pet Today!</Header>
      <div className="sort-div">
        <Dropdown
          placeholder="Type"
          name="type"
          selection
          options={typeOptions}
          onChange={filterResults}
          value={filterObj.type}
        />
        <Dropdown
          placeholder="Gender"
          name="gender"
          selection
          options={genderOptions}
          onChange={filterResults}
          value={filterObj.gender}
        />
        <Dropdown
          placeholder="Age"
          name="age"
          selection
          options={ageOptions}
          onChange={filterResults}
          value={filterObj.age}
        />
      </div>
      {filteredAnimals.length ? (
        <Container fluid className="animal-list">
          <Grid columns="3" centered relaxed>
            {filteredAnimals.map((animal) => {
              // console.log(animal);
              const { name, age, type, gender, picURLs, _id } = animal;
              const color = gender === "male" ? "#9AC7FF" : "#FA7091";

              return (
                <AnimalCard
                  name={name}
                  age={age}
                  type={type}
                  picURLs={picURLs}
                  id={_id}
                  gender={gender}
                  color={color}
                  key={_id}
                />
              );
            })}
          </Grid>
        </Container>
      ) : (
        <div className="no-animals">
          There are currently no animal adoptions posted. Come back later.
        </div>
      )}
    </div>
  );
};

animals.getInitialProps = async ({ ctx }) => {
  let pageProps = {};
  try {
    const res = await axios.get(`${baseURL}/api/v1/animal`);
    pageProps.animals = res.data;
  } catch (err) {
    console.error(err);
    pageProps.errorLoading = res.data;
  }
  return pageProps;
};

export default animals;
