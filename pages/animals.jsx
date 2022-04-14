import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from './util/auth';
import {
  Button,
  Card,
  Container,
  Dropdown,
  Grid,
  Header,
  Image,
  Pagination,
  Segment,
} from 'semantic-ui-react';
import AnimalCard from './components/animals/AnimalCard';
import Animals from './components/animals/Animals';

const animals = ({ animals }) => {

  const typeOptions = [
    {
      text: 'Any Type',
      value: 'any',
    },
    {
      text: 'Dog',
      value: 'dog',
    },
    {
      text: 'Cat',
      value: 'cat',
    },
  ];

  const ageOptions = [
    {
      text: 'Any Age',
      value: 'any',
    },
    {
      text: 'Young',
      value: 'young',
    },
    {
      text: 'Mid',
      value: 'mid',
    },
    {
      text: 'Adult',
      value: 'adult',
    },
    {
      text: 'Senior',
      value: 'senior',
    },
  ];

  const ageRanges = {
    young: [0, 2],
    mid: [2, 5],
    adult: [5, 10],
    senior: [10, 999],
  };

  const genderOptions = [
    {
      text: 'Any Gender',
      value: 'any',
    },
    {
      text: 'Male',
      value: 'male',
    },
    {
      text: 'Female',
      value: 'female',
    },
  ];

  const [filterObj, setFilterObj] = useState({
    type: 'any',
    age: 'any',
    gender: 'any',
  });

  const [filteredAnimals, setFilteredAnimals] = useState(animals);

  const handleChange = (_, data) => {
    const { name, value } = data;
    const newFilterObj = { ...filterObj, [name]: value };
    setFilterObj(newFilterObj);
    filterResults(newFilterObj);
  };

  const filterResults = (obj) => {
    setFilteredAnimals(animals);

    const { type, gender, age } = obj;
    if (type !== 'any') {
      setFilteredAnimals((prev) =>
        prev.filter((animal) => animal.type === type)
      );
    }
    if (gender !== 'any') {
      setFilteredAnimals((prev) =>
        prev.filter((animal) => animal.gender === gender)
      );
    }
    if (age !== 'any') {
      setFilteredAnimals((prev) => prev.filter((animal) => animal.age === age));
    }
  };

  return (
    <div id="adoption">
      <Header as="h1">Adopt A Pet Today!</Header>
      <div className="sort-div">
        <Dropdown
          placeholder="Type"
          name="type"
          selection
          options={typeOptions}
          onChange={handleChange}
          value={filterObj.type}
        />
        <Dropdown
          placeholder="Gender"
          name="gender"
          selection
          options={genderOptions}
          onChange={handleChange}
          value={filterObj.gender}
        />
        <Dropdown
          placeholder="Age"
          name="age"
          selection
          options={ageOptions}
          onChange={handleChange}
          value={filterObj.age}
        />
      </div>
      <Animals isAdmin={false} animals={filteredAnimals} />
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
