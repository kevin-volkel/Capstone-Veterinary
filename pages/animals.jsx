import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from './util/auth';
import {
  Header,
} from 'semantic-ui-react';
import AnimalCard from './components/animals/AnimalCard';
import Animals from './components/animals/Animals';
// import Footer from './components/layout/Footer';

const Animals = ({ animals }) => {
  return (
    <div id="adoption">
      <Header as="h1">Adopt A Pet Today!</Header>
      <Animals isAdmin={false} animals={animals} />
    </div>
  );
};

Animals.getInitialProps = async ({ ctx }) => {
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
