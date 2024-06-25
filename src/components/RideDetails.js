import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import ride from "../assets/rideshare.avif"
import { Spinner } from "react-bootstrap";

const RideDetails = () => {
  const { id } = useParams();
  const [rideData, setRideData] = useState(null);

  useEffect(() => {
    const rideSharingDocRef = doc(firestore, "ride-sharing", id);

    const fetchRideDetails = async () => {
      try {
        const rideDoc = await getDoc(rideSharingDocRef);

        if (rideDoc.exists()) {
          setRideData({ id: rideDoc.id, ...rideDoc.data() });
        } else {
          console.error("Ride document not found.");
        }
      } catch (error) {
        console.error("Error fetching ride details: ", error);
      }
    };

    fetchRideDetails();
  }, [id]);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
       <div className="col-lg-4">
        <img src={ride} alt="ride" style={{width:"100%"}}/>
        
      <a href="/ridesharing" className="butn" style={{backgroundColor:"#d7e5be"}}>Back</a>
       </div>

       <div className="col-lg-8">
       {/* {rideData ? ( */}
        <div className="card" style={{transform:"none", background:"none", border:"3px solid green"}}>
          <div className="card-body p-5">
          {rideData ? (
            <>
            <h2 className="card-title" style={{backgroundColor:"#dcf8ab",padding:8,borderRadius:10}}>
              {rideData.startingPoint} to {rideData.endPoint}
            </h2> <br/>
            <p className="card-text">Date: {rideData.date}</p>
            <p className="card-text">Passenger Count: {rideData.passengerCount}</p>
            <p className="card-text">Name: {rideData.name}</p>
            <p className="card-text">Mode of transport: {rideData.type}</p>
            <p className="card-text">Total Fare: {rideData.fare}</p>
            <p className="card-text">Gender: {rideData.gender}</p>
            <p className="card-text">Contact Number: <a style={{textDecoration:"none"}} href={`tel:${rideData.contactNumber}`}>{rideData.contactNumber}</a></p>
            </>
          ): (
            <div>
              <div className="d-flex justify-content-center align-items-center" style={{marginTop:"25%"}}>
        <Spinner animation="border" variant="success" /> 
      </div>
            </div>
          )}
          </div>
        </div>
       </div>
      </div>
    </div>
  );
};

export default RideDetails;
