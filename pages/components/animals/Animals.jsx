import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Icon, Segment, Container, Grid } from "semantic-ui-react";
import { baseURL } from "../../util/auth";
import Cookies from "js-cookie";
import AnimalCard from "./AnimalCard";

const Animals = () => {
  const [loading, setLoading] = useState(false);
  const [animals, setAnimals] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getAnimals = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseURL}/api/v1/animal`, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        setAnimals(res.data);
      } catch (error) {
        console.log("error loading posts");
      }
      setLoading(false);
    };
    getAnimals();
  }, []);

  return (
    <Segment
      id="admin-animals"
      loading={loading}
    >
      <Button
        disabled={loading}
      >
        <Icon
          name="plus"
        />
        Add Animal
      </Button>
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
          <Grid
            columns="3"
            centered
            relaxed
          >
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
        <div
          className="no-animals"
        >
          There are no animals. Start by adding one.
        </div>
      )}
    </Segment>
  );
};


export default Animals;
