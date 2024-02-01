import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage(props){


  useEffect(() => {
    console.log(props?.user);
  }, []);

  return (
    <div className="homepage-container">
      <h2>Welcome to the Help Center</h2>
      <p>Please <Link to="/login">Login</Link> to submit a ticket</p>



    </div>
  );

  }

export default HomePage;