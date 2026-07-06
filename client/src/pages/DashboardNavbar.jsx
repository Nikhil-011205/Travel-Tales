import { Link } from "react-router-dom";
import "./DashboardNavbar.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function DashboardNavbar() {
   const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }

    }, []);

    function handleLogout() {

    localStorage.removeItem("token");

    alert("Logged out successfully!");

}



  return (
    <nav className="dashboard-navbar">

      <h1 className="dashboard-logo">🌍 Travel Tales</h1>

      <div className="dashboard-links">

        <Link to="/profile">Dashboard</Link>

        <Link to="/addtrip">Add Journey</Link>

        <Link to="/mytrips">My Journeys</Link>

        <Link to="/bucketlist">Bucket List</Link>

        

        <Link to="/" onClick={handleLogout}>
    Logout
</Link>

      </div>

    </nav>
  );
}

export default DashboardNavbar;