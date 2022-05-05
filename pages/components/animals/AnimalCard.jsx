import React from "react";
import { Card, Image, Button, Icon } from "semantic-ui-react";
import Router from "next/router";
import { baseURL } from "../../util/auth";

const AnimalCard = ({ name, age, type, picURLs, id, gender }) => {

  const titleColor = (gender === 'male') ? '#5797e6' : '#f06687';
  const genderColor = (gender === 'male') ? '#3777c6' : '#ce4465';

  return (
    <Card
      className="animal-card"
      as="a"
      href={`/${id}`}
      // onClick={() => Router.push(`${baseURL}/${id}`)}
    >
      <Image
        src={picURLs[0]}
      />
      <Card.Content>
        <Card.Header
          className="animal-header"
          style={{ color: titleColor }}
          content={name}
        />
        <Card.Meta className="card-type" content={type} />
        <Card.Meta className="card-gender" style={{ color: genderColor }}>
          {gender}
          <Icon
            name={gender === "male" ? "man" : "woman"}
            color={gender === "male" ? "blue" : "pink"}
          />
        </Card.Meta>
        <Card.Meta className="card-age" content={age} />
      </Card.Content>
    </Card>
  );
};

export default AnimalCard;
