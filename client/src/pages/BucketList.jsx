import { useState, useEffect } from "react";
import DashboardNavbar from "./DashboardNavbar";
import "./BucketList.css";
import { toast } from "react-toastify";

function BucketList() {

  const [destination, setDestination] = useState("");
  const [bucketList, setBucketList] = useState([]);

  useEffect(() => {

    fetchBucketList();

  }, []);

  async function fetchBucketList() {

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/bucketlist", {

      headers: {

        Authorization: token

      }

    });

    const data = await response.json();

    setBucketList(data);

  }

  async function addDestination() {

    if (destination.trim() === "") return;

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/bucketlist", {

      method: "POST",

      headers: {

        "Content-Type": "application/json",
        Authorization: token

      },

      body: JSON.stringify({

        place: destination

      })

    });

    const data = await response.text();

    if (data === "Place Added Successfully") {

      toast.success("🌍 Destination Added!");

      setDestination("");

      fetchBucketList();

    } else {

      toast.error("❌ Failed!");

    }

  }

  async function deleteDestination(id) {

    const token = localStorage.getItem("token");

    const response = await fetch(

      `http://localhost:5000/bucketlist/${id}`,

      {

        method: "DELETE",

        headers: {

          Authorization: token

        }

      }

    );

    const data = await response.text();

    if (data === "Place Deleted Successfully") {

      toast.success("🗑️ Destination Removed!");

      fetchBucketList();

    } else {

      toast.error("❌ Failed!");

    }

  }

  return (
    <>
      <DashboardNavbar />

      <div className="bucket-container">

        <div className="bucket-card">

          <h1>🌍 Dream Destinations</h1>

          <p className="subtitle">
            Every dream destination begins with a single plan.
          </p>

          <div className="input-section">

            <input
              type="text"
              placeholder="Enter destination..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />

            <button onClick={addDestination}>
              Add
            </button>

          </div>

          <div className="destination-grid">

            {bucketList.length === 0 ? (

              <h2 className="empty-text">
                No destinations added yet.
              </h2>

            ) : (

              bucketList.map((place) => (

                <div className="destination-card" key={place.id}>

                  <h2>📍 {place.place}</h2>

                  <p>Dream Destination</p>

                  <button
                    className="delete-btn"
                    onClick={() => deleteDestination(place.id)}
                  >
                    Remove
                  </button>

                </div>

              ))

            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default BucketList;