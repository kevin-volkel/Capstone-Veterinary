import React from "react";
import { Card, Image, Button, Icon } from "semantic-ui-react";
import Router from "next/router";
import { baseURL } from "../../util/auth";

const AnimalCard = ({ name, age, type, picURLs, id, gender, color }) => {
  return (
    <Card
      className="animal-card"
      onClick={() => Router.push(`${baseURL}/${id}`)}
    >
      <Image
        src={picURLs[0]}
      />
      <Card.Content>
        <Card.Header
          className="animal-header"
          style={{ color: color }}
          content={name}
        />
        <Card.Meta className="card-type" content={type} />
        <Card.Meta className="card-gender" style={{ color: color }}>
          {gender}
          <Icon name={gender === "male" ? "man" : "woman"} />
        </Card.Meta>
        <Card.Meta className="card-age" content={age} />
      </Card.Content>
    </Card>
  );
};

export default AnimalCard;
