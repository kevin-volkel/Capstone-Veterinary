import React from 'react';
import axios from 'axios';
import { baseURL, redirectUser } from './util/auth';
import { Button, Card, Image } from 'semantic-ui-react';
import Router from 'next/router'

const animals = ({ animals }) => {
  return (
    <div className='animal-list' style={{display: "flex", margin: "2rem 0"}}>
      {animals.map((animal) => {
        console.log(animal);
        const { name, age, type, gender, picURLs, desc } = animal;
        const color = gender === 'male' ? 'blue' : 'pink'

        return (
          <Card
            key={animal._id}
            style={{ marginLeft: '3rem', cursor: 'pointer' }}
          >
            <Image src={picURLs[0]} />
            <Card.Header content={name} />
            <Card.Meta content={age} />
            <Card.Meta content={type} />
            <Card.Meta content={desc} />
            <Button content="More info" onClick={() => Router.push(`${baseURL}/${animal._id}`)}/>
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
