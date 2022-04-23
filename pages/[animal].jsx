import axios from "axios";
import React, { useEffect } from "react";
import { baseURL } from "./util/auth";
import { useRouter } from "next/router";
import Footer from "./components/layout/Footer";
// import puppy from '../public/media/puppy.png';

// const Animal = ({ animalObj }) => {
const Animal = () => {
  const router = useRouter();
  const { animalObj } = router.query;
  const puppy = "./media/puppy.png";

  //   useEffect(() => {});

  return (
    <div>
      <div className="page-wrap">
        <div className="animal-wrap">
          <h1 className="pet-name">Animal Name</h1>
          <img src={puppy} alt="broken doggy :(" className="pet-img" />
          <div className="para-desc">
            <p>location | user | type | gender | breed</p>
          </div>
          <h2 className="pet-title">About me!</h2>
          <div className="pet-description">
            <div className="section-1">
              <div>
                <h3>Description</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quibusdam enim laboriosam ad velit deleniti inventore! Cumque
                  necessitatibus enim ipsum assumenda mollitia. Totam modi id
                  laudantium mollitia quisquam nulla? Atque, autem.
                </p>
              </div>
              <div>
                <h3>Details</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quibusdam enim laboriosam ad velit deleniti inventore! Cumque
                  necessitatibus enim ipsum assumenda mollitia. Totam modi id
                  laudantium mollitia quisquam nulla? Atque, autem.
                </p>
              </div>
            </div>
            <div className="section-2">
              <div>
                <h3>Color(s)</h3>
                <p>grey</p>
              </div>
              <div>
                <h3>Vaccinations Up To Date?</h3>
                <p>no</p>
              </div>
            </div>
            <div className="section-3">
              <h3>Neutered or Spayed?</h3>
              <p>no.</p>
              <h3>Special Needs?</h3>
              <p>yes! requires your cheddar cheese</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Animal.getInitialProps = async (ctx) => {
//   try {
//     const { animal } = ctx.query;
//     const res = await axios.get(`${baseURL}/api/v1/animal/${animal}`);

//     const { animalObj } = res.data;
//     return { animalObj };
//   } catch (error) {
//     console.log(error);
//   }
// };

export default Animal;
