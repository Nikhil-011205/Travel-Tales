import { useEffect, useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import "./MyTrips.css";

function MyTrips() {

  const [trips, setTrips] = useState([]);

 useEffect(() => {

    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_BACKEND_URL}/my-trips`, {

        headers: {

            Authorization: token

        }

    })

    .then((response) => response.json())

    .then((data) => {

        console.log(data);

        setTrips(data);

    })

    .catch((err) => {

        console.log(err);

    });

}, []);

async function deleteTrip(id) {

    const token = localStorage.getItem("token");

    try {

        const response = await fetch(

            `${import.meta.env.VITE_BACKEND_URL}/delete-trip/${id}`,

            {

                method: "DELETE",

                headers: {

                    Authorization: token

                }

            }

        );

        const data = await response.text();

        console.log(data);

        if (data === "Trip Deleted Successfully") {

            alert("Journey Deleted Successfully!");

            setTrips(

                trips.filter((trip) => trip.id !== id)

            );

        } else {

            alert(data);

        }

    } catch (err) {

        console.log(err);

    }

}

  return (
    <>
      <DashboardNavbar />

      <div className="mytrips-container">

        <h1>🧳 My Journeys</h1>

        <p className="subtitle">
          Every destination holds a special memory.
        </p>

        <div className="trip-grid">

          {trips.length === 0 ? (

            <h2 className="empty-text">
              No journeys added yet.
            </h2>

          ) : (

            trips.map((trip) => (

              <div className="trip-card" key={trip.id}>

                <h2>📍 {trip.place}</h2>

                <p>
                  <strong>📅 Days:</strong> {trip.days}
                </p>

                <p>
                  <strong>💰 Budget:</strong> ₹{trip.budget}
                </p>

                <p>
                  <strong>⭐ Rating:</strong> {trip.rating}/5
                </p>

                <p className="experience">
                  {trip.experience}
                </p>

                {trip.photo && (

                  <img
                    src={trip.photo}
                    alt={trip.place}
                    className="trip-image"
                  />

                )}

                <button className="delete-btn" 
                onClick={() => deleteTrip(trip.id)} >
                   Delete Journey
                  </button>

                

              </div>

            ))

          )}

        </div>

      </div>
    </>
  );
}

export default MyTrips; 
