import { useNavigate } from "react-router-dom";

function HomePage({}){


  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome to the Help Center</h2>
      <p>Please Login to submit a ticket</p>
    </div>
  );

  }

export default HomePage;