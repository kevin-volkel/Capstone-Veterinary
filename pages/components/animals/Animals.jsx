import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Icon, Segment, Container, Grid } from "semantic-ui-react";
import { baseURL } from "../../util/auth";
import Cookies from "js-cookie";
import AnimalCard from "./AnimalCard";

const Animals = ({ user }) => {
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
      style={{ width: "70vw", margin: "1rem auto 2rem", padding: "2rem 0", textTransform: "capitalize" }}
      loading={loading}
    >
      <Button
        disabled={loading}
        style={{
          width: "80%",
          height: "60px",
          fontSize: "1.5rem",
          backgroundColor: "#F7931D",
          color: "#FFFFFF",
          marginBottom: "2rem",
        }}
      >
        <Icon name="plus" color="white" style={{ opacity: 1 }} />
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
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {animals.map((animal) => {
              // console.log(animal);
              const { name, age, type, gender, picURLs, desc, _id } = animal;
              // const color = gender === 'male' ? 'blue' : 'pink'

              return (
                <AnimalCard
                  name={name}
                  age={age}
                  type={type}
                  picURLs={picURLs}
                  desc={desc}
                  id={_id}
                />
              );
            })}
          </Grid>
        </Container>
      ) : (
        <div
          className="no-animals"
          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
        >
          There are no animals. Start by adding one.
        </div>
      )}
    </Segment>
  );
};

export default Animals;
