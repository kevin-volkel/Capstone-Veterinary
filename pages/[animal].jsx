import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseURL, redirectUser } from "./util/auth";
import { useRouter } from "next/router";
// import puppy from '../public/media/puppy.png';
<<<<<<< HEAD
import { Icon, Image, Button, Grid } from "semantic-ui-react";
=======
import { Icon, Image, Button, Modal, ModalContent } from "semantic-ui-react";
import ImageModal from "./components/layout/ImageModal";
>>>>>>> 7785c969457a4045a1fa32eef6b1e1549d9d2107

const Animal = ({ user, animalObj, errorLoading }) => {
  // const puppy = "./media/puppy.png";
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [showImage, setShowImage] = useState(null);

  useEffect(() => {
    if (errorLoading !== null) {
      router.push("/");
    }
  }, []);

  return (
    <div>
      {showModal && (
        <Modal
          open={showModal}
          closeIcon
          closeOnDimmerClick
          onClose={() => setShowModal(false)}
          style={{ marginTop: "2.2rem" }}
        >
          <Modal.Content>
            <ImageModal image={animalObj.picURLs[showImage]} />
          </Modal.Content>
        </Modal>
      )}
      <div className="page-wrap">
        <div className="animal-wrap">
          <div
            className="top-btns"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {user ? (
              <div
                onClick={() => router.push("/admin")}
                style={{ cursor: "pointer" }}
              >
                <Icon name="arrow left" />
                Back to Admin
              </div>
            ) : (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => router.push("/animals")}
              >
                <Icon name="arrow left" />
                Back to Adoption
              </div>
            )}
            {user && (
              <div id="">
                <Icon
                  circular
                  inverted
                  id="edit-1"
                  name="pencil alternate"
                  style={{ cursor: "pointer" }}
                />
                <Icon
                  circular
                  inverted
                  id="edit-2"
                  color="red"
                  name="trash alternate"
                  style={{ cursor: "pointer" }}
                />
              </div>
            )}
          </div>
          <h1 className="pet-name">{animalObj.name}</h1>
          <img
            src={animalObj.picURLs[0]}
            alt={`${animalObj.name} image`}
            className="pet-img"
          />
          <div className="para-desc" style={{ flexDirection: "column" }}>
            {user && <p>Added by {user.name}</p>}
            <p>
              {animalObj.type} | {animalObj.gender} | {animalObj.age} |{" "}
              {animalObj.breed !== "unspecified" && `${animalObj.breed} | `}
              {animalObj.location} campus
            </p>
          </div>
          <h2 className="pet-title">About me!</h2>
          <div className="pet-description">
            <div className="section-1">
              {animalObj.desc && (
                <div>
                  <h3>Description</h3>
                  <p>{animalObj.desc}</p>
                </div>
              )}
              {animalObj.details && (
                <div>
                  <h3>Details</h3>
                  <p>{animalObj.details}</p>
                </div>
              )}
            </div>
            <div className="section-2">
              {animalObj.colors && (
                <div>
                  <h3>Color(s)</h3>
                  <p>{animalObj.colors}</p>
                </div>
              )}
              <div>
                <h3>Vaccinations Up To Date?</h3>
                <p>{animalObj.vaccs === true ? "Yes" : "No"}</p>
              </div>
            </div>
            <div className="section-3">
              <div>
                <h3>Neutered or Spayed?</h3>
                <p>{animalObj.neutered === true ? "Yes" : "No"}</p>
              </div>
              {animalObj.needs === true && (
                <div>
                  <h3>Special Needs</h3>
                  <p>{animalObj.specialNeeds}</p>
                </div>
              )}
            </div>
          </div>

          {animalObj.picURLs.length && (
            <Grid className="pet-gallery" style={{ display: "flex" }}>
              {animalObj.picURLs.map((pic, index) => {
                return (
                  <Image
                    style={{ width: "250px", height: "auto", cursor: "pointer" }}
                    src={animalObj.picURLs[index]}
                    onClick={() => {
                      setShowImage(index);
                      setShowModal(true);
                    }}
                  />
                );
              })}
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
};

Animal.getInitialProps = async (ctx) => {
  try {
    const { animal } = ctx.query;
    const res = await axios.get(`${baseURL}/api/v1/animal/${animal}`);

    const animalObj = res.data;
    // console.log(animalObj);
    return { animalObj, errorLoading: null };
  } catch (error) {
    // console.log(error);
    return { errorLoading: error, animalObj: {} };
  }
};

export default Animal;
