import Head from "next/head";
import Image from "next/image";
import { Button, Segment } from "semantic-ui-react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import tutu from  '../public/media/tutu.jpg'
//import "../styles/home.css";

export default function Home() {
  return (
    <div className="everything">
      <div className="slideshow">
        <div className="img-container">
          <Button className="img-btn-left arrow" color="orange"></Button>
          <Image
            src={tutu}
            alt="tutu dog"
            priority="true"
            position="relative"
            className="curr-img"
            objectFit="contain"
          />
          <Button className="img-btn-right arrow" color="orange"></Button>
        </div>
      </div>

    <div className="nf-div">
      <Segment className="new-friend-section">
        <h1 className="nf-title">Find a New Friend!</h1>
        <div className="nf-wholeSect">
          <div className="nf-sect">
            <p className="nf-description">
              At vero eos et accus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quosi
              dolores et quas molestias excepturi sint occaecati cupidi non. At
              vero eos et accus et iusto odio dignissimos ducimus qui blanditiis
              praesentium voluptatum deleniti atque corrupti quosi dolores et
              quas molestias excepturi sint occaecati cupidi non. At vero eos et
              accus et iusto odio dignissimos ducimus qui blanditiis praesentium
              voluptatum deleniti atque corrupti quosi dolores et quas molestias
              excepturi sint occaecati cupidi non.
            </p>
            <Image src={tutu} position="relative" className="adopt-image" />
          </div>
          <Button
            color="orange"
            content="Ready To Adopt"
            className="nf-adopt-btn"
          />
        </div>
      </Segment>
      </div>

      <Footer />
    </div>
  );
}
