import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import Router from 'next/router'
import { baseURL } from "../../util/auth";

const AnimalCard = ({ name, age, type, picURLs, desc, id }) => {
  return (
    <>
      <Card key={id} style={{ marginTop: "0", cursor: "pointer", textAlign: "center" }} onClick={() => Router.push(`${baseURL}/${id}`)}>
        <Image
          src={picURLs[0]}
        />
        <Card.Content>
          <Card.Header style={{fontSize: "2rem", marginBottom: ".8rem"}} content={name}/>
          <Card.Meta content={type} />
          <Card.Meta content={age} />
          {desc && <Card.Meta content={desc} />}
        </Card.Content>
      </Card>
    </>
  );
};

export default AnimalCard;
