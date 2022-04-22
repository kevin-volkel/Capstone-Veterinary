import axios from "axios";
import React, { useEffect } from "react";
import { baseURL } from "./util/auth";
import { useRouter } from "next/router";
// import puppy from '../public/media/puppy.png';

// const Animal = ({ animalObj }) => {
const Animal = () => {
  const router = useRouter();
  const { animalObj } = router.query;
  const puppy = './media/puppy.png'

  useEffect(() => {});

  return (
    <div className="page-wrap">
      <div className="animal-wrap">
        <h2 className="animal-name">Animal Name</h2>
        <img src={puppy} alt="broken doggy :(" />
        <div className="para-descript">
          <p>location</p>
          <p>type</p>
          <p>gender</p>
          <p>breed</p>
        </div>
      </div>
    </div>
  );
};

Animal.getInitialProps = async (ctx) => {
  try {
    const { animal } = ctx.query;
    const res = await axios.get(`${baseURL}/api/v1/animal/${animal}`);

    const { animalObj } = res.data;
    return { animalObj };
  } catch (error) {
    console.log(error);
  }
};

export default Animal;
