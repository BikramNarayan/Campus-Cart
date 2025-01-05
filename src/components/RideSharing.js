import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase";
import { Link } from "react-router-dom";
import "../assets/Ride.css";
import "../assets/Home.css";
const RideSharingForm = () => {
  const { isAuthenticated, user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [startingPoint, setStartingPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const [fare, setFare] = useState("");
  const [passengerCount, setPassengerCount] = useState(1); // Default to 1 passenger

  const handlePostRide = async () => {
    if (!isAuthenticated) {
      // Display a message or a login prompt if the user is not authenticated
      return;
    }

    // Check if any required field is empty
    if (
      !name ||
      !gender ||
      !contactNumber ||
      !startingPoint ||
      !endPoint ||
      !date ||
      !time ||
      !type ||
      !fare ||
      !passengerCount
    ) {
      alert("Please fill all the fields");
      return;
    }

    setLoading(true);
    // Create a new ride-sharing listing object
    const rideListing = {
      name,
      fare,
      age,
      gender,
      contactNumber,
      startingPoint,
      endPoint,
      date,
      time,
      email: user.email,
      passengerCount,
      type,
      userId: user.sub, // Include the user's ID
    };

    try {
      // Add the ride-sharing listing to Firestore
      const docRef = await addDoc(
        collection(firestore, "ride-sharing"),
        rideListing
      );

      // Clear the form fields after posting
      setName("");
      setAge("");
      setGender("");
      setContactNumber("");
      setStartingPoint("");
      setEndPoint("");
      setDate("");
      setTime("");
      setFare("");
      setType("");
      setPassengerCount(1);

      // Provide feedback to the user
      console.log("Ride-sharing listing posted with ID: ", docRef.id);

      // Show a success message and an alert
      alert("Your ride has been posted");
    } catch (error) {
      console.error("Error posting ride-sharing listing: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container ride">
      <h1 className="mt-2">Find passengers for your journey</h1>

      {/* starting matbori */}
      {isAuthenticated ? (
        <form>
          <div className="row">
            <div className="col-lg-3">
              <div className="form-group my-4">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-3">
              <div className="form-group my-4">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  style={{ boxShadow: "none" }}
                  className="form-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled></option>
                  <option value="PreferNotToSay">Prefer Not to Say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="form-group my-4">
                <label htmlFor="startingPoint">Starting Point</label>
                <input
                  type="text"
                  id="startingPoint"
                  className="form-control"
                  value={startingPoint}
                  onChange={(e) => setStartingPoint(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-3">
              <div className="form-group my-4">
                <label htmlFor="endPoint">End Point</label>
                <input
                  type="text"
                  id="endPoint"
                  className="form-control"
                  value={endPoint}
                  onChange={(e) => setEndPoint(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <p>View route on map</p>
              {/* <img src={map} alt="" className="img-fluid" /> */}
              <iframe
                title="map-uem"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.5125635141717!2d88.48732647441717!3d22.559925133436447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a020b267a3cdc13%3A0xb3b21d652126f40!2sUniversity%20of%20Engineering%20%26%20Management%2C%20Kolkata!5e0!3m2!1sen!2sin!4v1700427366746!5m2!1sen!2sin"
                width={"100%"}
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group my-4">
                    <label htmlFor="time">Departure Time</label>
                    <input
                      type="time"
                      id="time"
                      className="form-control"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>

                  <div className="form-group my-4">
                    <label htmlFor="type">Type Of Vehicle</label>
                    <select
                      id="type"
                      style={{ boxShadow: "none" }}
                      className="form-select"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="Bike">Bike</option>
                      <option value="Car">Car</option>
                      <option value="Van">Van</option>
                      <option value="Bus">Bus</option>
                    </select>
                  </div>
                  <div className="form-group my-4">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input
                      type="text"
                      id="contactNumber"
                      className="form-control"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group my-4">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      className="form-control"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div className="form-group my-4">
                    <label htmlFor="fare">Total Fare</label>
                    <input
                      type="number"
                      id="fare"
                      className="form-control"
                      value={fare}
                      onChange={(e) => setFare(e.target.value)}
                      placeholder="₹"
                    />
                  </div>
                  <div className="form-group my-4">
                    <label htmlFor="passengerCount">Passenger Count</label>
                    <input
                      required
                      type="number"
                      id="passengerCount"
                      className="form-control"
                      value={passengerCount}
                      onChange={(e) => setPassengerCount(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-grid gap-2 mt-5">
            {loading ? (
              <button
                className="butn mb-4"
                disabled
                onClick={handlePostRide}
                type="button"
              >
                Posting
              </button>
            ) : (
              <button
                className="butn mb-4"
                onClick={handlePostRide}
                type="button"
              >
                Post
              </button>
            )}
          </div>
        </form>
      ) : (
        <p>Please log in to post a ride-sharing listing.</p>
      )}
      {/* ending matbori */}
    </div>
  );
};

const RideSharingList = () => {
  const [rideListings, setRideListings] = useState([]);
  const [startingPointFilter, setStartingPointFilter] = useState("");
  const [endPointFilter, setEndPointFilter] = useState("");
  const { user } = useAuth0();
  const fetchRideListings = async () => {
    const rideSharingCollection = collection(firestore, "ride-sharing");
    const q = query(rideSharingCollection, where("userId", "!=", user?.sub));

    try {
      // console.log(user.sub);
      const querySnapshot = await getDocs(q);
      // console.log(q);
      const rideData = [];

      querySnapshot.forEach((doc) => {
        rideData.push({ id: doc.id, ...doc.data() });
      });

      setRideListings(rideData);
    } catch (error) {
      console.error("Error fetching ride-sharing listings: ", error);
    }
  };

  useEffect(() => {
    if (user) fetchRideListings();
  }, [user]);

  const applyFilters = () => {
    let filteredListings = [...rideListings];

    if (startingPointFilter) {
      filteredListings = filteredListings.filter((listing) =>
        listing.startingPoint
          .toLowerCase()
          .includes(startingPointFilter.toLowerCase())
      );
    }

    if (endPointFilter) {
      filteredListings = filteredListings.filter((listing) =>
        listing.endPoint.toLowerCase().includes(endPointFilter.toLowerCase())
      );
    }

    return filteredListings;
  };

  const filteredListings = applyFilters();

  return (
    <div className="container existing-ride">
      <hr />
      <h1 className="mb-3 mt-5">Existing Rides</h1>
      <div className="row row-cols-1">
        <div className="col-md-6 mb-3">
          {/* <label htmlFor="startingPointFilter" className="form-label">Filter by Starting Point:</label> */}
          <input
            type="text"
            className="form-control"
            id="startingPointFilter"
            placeholder="Filter by Starting Point"
            value={startingPointFilter}
            onChange={(e) => setStartingPointFilter(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          {/* <label htmlFor="endPointFilter" className="form-label">Filter by End Point:</label> */}
          <input
            type="text"
            className="form-control"
            placeholder="Filter by End Point"
            id="endPointFilter"
            value={endPointFilter}
            onChange={(e) => setEndPointFilter(e.target.value)}
          />
        </div>
        {filteredListings.map((listing) => (
          <div key={listing.id} className="col mb-4">
            <Link
              style={{ textDecoration: "none" }}
              to={`/ridedetails/${listing.id}`}
            >
              <div
                className="card"
                style={{ borderRadius: 15, border: "2px solid #3f7243" }}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    {listing.startingPoint} to {listing.endPoint}
                  </h5>
                  <p className="card-text">
                    Date: {listing.date} &nbsp;&nbsp;&nbsp; Passenger required :{" "}
                    {listing.passengerCount} &nbsp;&nbsp;&nbsp; Via :{" "}
                    {listing.type}
                  </p>
                  {/* Add other information here (name, age, gender, contactNumber) */}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    //closing div
  );
};

const RideSharing = () => {
  return (
    <div className="container">
      <RideSharingForm />
      <RideSharingList />
    </div>
  );
};

export default RideSharing;
