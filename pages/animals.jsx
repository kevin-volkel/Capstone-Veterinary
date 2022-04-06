import React from "react";
import axios from "axios";
import { baseURL, redirectUser } from "./util/auth";
import { Button, Card, Image } from "semantic-ui-react";
import Router from "next/router";

const animals = ({ animals }) => {
  return (
    <div className="animal-page">
      {animals.map((animal) => {
        console.log(animal);
        const { name, age, type, gender, picURLs, desc } = animal;
        const color = gender === "male" ? "blue" : "pink";

        return (
          <Card
            key={animal._id}
            style={{ marginLeft: "3rem", cursor: "pointer" }}
            className="animal-card"
          >
            <Image src={picURLs[0]} />
            <Card.Header content={name} className="animal-header" />
            <div className="animal-card-info">
              <Card.Meta content={gender} className="gender-animal" />
              <Card.Meta content={age} className="age-animal" />
              <Card.Meta content={type} className="type-animal" />
            </div>
            {/* <Card.Description content={desc} /> */}
            <Button
              content="More info"
              onClick={() => Router.push(`/${animal._id}`)}
            />
          </Card>
        );
      })}
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
