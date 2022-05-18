import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from './util/auth';
import {
  Header,
} from 'semantic-ui-react';
import AnimalGrid from './components/animals/AnimalGrid';
// import Footer from './components/layout/Footer';

const Animals= ({ animals }) => {
  return (
    <div id="adoption">
      <Header as="h1">Adopt A Pet Today!</Header>
      <AnimalGrid isAdmin={false} animals={animals} />
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
    pageProps.errorLoading = err;
    pageProps.animals = [];
  }
  return pageProps;
};

export default Animals;
