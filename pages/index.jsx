import Head from "next/head";
import Image from "next/image";
import { Button, Segment } from "semantic-ui-react";
//import styles from "../styles/Home.module.css";
// import "../styles/index.css"
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import tutu from "../tutu.jpg";

export default function Home() {
  return (
    <div>
      <Navbar />

      <div>
        <Image
          src={tutu}
          alt="tutu dog"
          priority="true"
          position="relative"
          height={4500}
          width={2100}
        />
      </div>

      <Segment className="new-friend-section">
        <h1>Find a New Friend!</h1>
        <div className="nf-sect">
          <p>
            At vero eos et accus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quosi
            dolores et quas molestias excepturi sint occaecati cupidi non.
          </p>
          <Image src={tutu} position="relative" height={300} width={180} />
        </div>
        <Button color="orange" content="Ready To Adopt" />
      </Segment>
      <Footer/>
    </div>
  );
}
