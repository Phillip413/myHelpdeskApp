import { useEffect, useState } from "react";

function HomePage(props){


  useEffect(() => {
    console.log(props?.user);
  }, []);

  return (
    <div>
      <h2>Welcome to the Help Center</h2>
      <p>Please Login to submit a ticket</p>



    </div>
  );

  }

export default HomePage;