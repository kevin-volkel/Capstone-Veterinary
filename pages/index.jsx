import Head from "next/head";
import Image from "next/image";
import { Button, Segment } from "semantic-ui-react";
// import styles from "../styles/Home.module.css";
// import "../styles/index.css"
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import tutu from "../tutu.jpg";
import "../../styles/home.css";

export default function Home() {
  return (
    <div>
      <div>
        <Image
          src={tutu}
          alt="tutu dog"
          priority="true"
          position="relative"
          height={3000}
          width={2100}
        />
        <div className="backForth">
          <Button></Button>
          <Button></Button>
        </div>
      </div>

      <Segment className="new-friend-section">
        <h1>Find a New Friend!</h1>
        <div className="nf-sect">
          <p>
            At vero eos et accus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quosi
            dolores et quas molestias excepturi sint occaecati cupidi non.
          </p>
          <Image src={tutu} position="relative" height={300} width={700} />
        </div>
        <Button color="orange" content="Ready To Adopt" />
      </Segment>
    </div>
  );
}
