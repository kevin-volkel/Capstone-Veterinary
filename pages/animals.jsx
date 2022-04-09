import React from "react";
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
      text: "Dog",
      value: "dog",
    },
    {
      text: "Cat",
      value: "cat",
    }
  ];

  const ageOptions = [
    {
      text: "Puppy",
      value: "puppy"
    },
    {
      text: "Young",
      value: "young"
    },
    {
      text: "Adult",
      value: "adult"
    },
    {
      text: "Senior",
      value: "senior"
    }
  ];

  const genderOptions = [
    {
      text: "Male",
      value: "male",
    },
    {
      text: "Female",
      value: "female",
    }
  ];

  return (
    <div id="adoption">
      <Header as="h1">Adopt A Pet Today!</Header>
      <div className="sort-div">
        <Dropdown placeholder="Type" search selection options={typeOptions} />
        <Dropdown placeholder="Gender" search selection options={genderOptions} />
        <Dropdown placeholder="Age" search selection options={ageOptions} />
      </div>
      {animals.length ? (
        <Container fluid className="animal-list">
          <Grid columns="3" centered relaxed>
            {animals.map((animal) => {
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
