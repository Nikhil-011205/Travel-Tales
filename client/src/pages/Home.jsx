
import { Link } from "react-router-dom";
import NavBar from "../pages/NavBar";

import "./Home.css";

function Home() {
  return (
    <div>
     <NavBar />
      <div className="hero" >
      <h1>Capture Every Journey</h1>

     <p>
       
      From spontaneous road trips to dream vacations,
      Travel Tales helps you relive every adventure, one journey at a time.
  </p>
</div>

      

    </div>
  );
}

export default Home;