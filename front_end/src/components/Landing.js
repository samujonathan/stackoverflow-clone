// Landing.jsx
import React from "react";
import { Link } from "react-router-dom";
import { NavBar } from "./Screen";

const Landing = ({ user }) => {
  return (
    <>
    <NavBar user={user} />
      <header style={{ textAlign: "center" }}>
        <h1>Welcome to my world</h1>
      </header>
    </>
  );
};

export default Landing;