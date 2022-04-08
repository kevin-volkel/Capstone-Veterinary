import React from "react";
import axios from "axios";
import { baseURL } from "./util/auth";
import {
  Button,
  Card,
  Container,
  Grid,
  Header,
  Image,
  Segment,
} from "semantic-ui-react";
import AnimalCard from "./components/animals/AnimalCard";

const animals = ({ animals }) => {
  return (
    <div id="adoption">
      <Header as="h1">Adopt A Pet Today!</Header>
      {animals.length ? (
        <Container
          fluid
          textAlign="center"
          className="animal-list"
          style={{
            width: "80%",
            display: "flex",
            margin: "2rem 0",
            justifyContent: "center",
          }}
        >
          <Grid columns="3" centered relaxed>
            {animals.map((animal) => {
              // console.log(animal);
              const { name, age, type, gender, picURLs, _id } = animal;
              const color = gender === "male" ? "blue" : "pink";

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
