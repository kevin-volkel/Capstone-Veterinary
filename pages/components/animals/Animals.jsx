import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Icon,
  Segment,
  Container,
  Grid,
  Pagination,
} from "semantic-ui-react";
import { baseURL } from "../../util/auth";
import Cookies from "js-cookie";
import AnimalCard from "./AnimalCard";

const Animals = ({ animals, isAdmin }) => {
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (e, data) => {
    setCurrPage(data.activePage);
  };

  return (
    <>
      {isAdmin && (
        <Button disabled={loading}>
          <Icon name="plus" />
          Add Animal
        </Button>
      )}

      {animals.length ? (
        <Container fluid className="animal-list">
          <Grid columns="3" centered relaxed>
            {animals.slice((currPage - 1) * 6, currPage * 6).map((animal) => {
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
                  // color={color}
                  key={_id}
                />
              );
            })}
          </Grid>
        </Container>
      ) : (
        <div className="no-animals">
          There are currently no animal adoptions posted.{" "}
          {isAdmin ? "Start by adding one" : "Come back later."}
        </div>
      )}
      <Pagination
        onPageChange={handlePageChange}
        activePage={currPage}
        totalPages={Math.ceil(animals.length / 6)}
      />
    </>
  );
};

export default Animals;
