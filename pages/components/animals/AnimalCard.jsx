import React from "react";
import { Card, Image, Button, Icon } from "semantic-ui-react";
import Router from "next/router";
import { baseURL } from "../../util/auth";

const AnimalCard = ({ name, age, type, picURLs, id, gender, color }) => {
  return (
    <Card
      // key={id}
      className="animal-card"
      style={{
        marginTop: "0",
        cursor: "pointer",
        textAlign: "center",
        maxWidth: "250px",
        // maxHeight: "280px",
        textTransform: "uppercase",
        background: color
      }}
      // color={color}
      onClick={() => Router.push(`${baseURL}/${id}`)}
    >
      <Image
        src={picURLs[0]}
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
      <Card.Content>
        <Card.Header
          className="animal-header"
          style={{ fontSize: "2rem", marginBottom: ".8rem" }}
          content={name}
        />
        <Card.Meta className="card-type" content={type} />
        {/* <Card.Meta className="card-gender" content={gender} /> */}
        <Card.Meta className="card-gender">
          {gender}
          <Icon name={gender === "male" ? "man" : "woman"} />
        </Card.Meta>
        <Card.Meta className="card-age" content={age} />
      </Card.Content>
    </Card>
  );
};

export default AnimalCard;
