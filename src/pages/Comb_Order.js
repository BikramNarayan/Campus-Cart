import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import { Link } from "react-router-dom";
import "../assets/Ride.css";
import "../assets/Home.css";
import amazon from "../assets/combo1.png";
import flipkart from "../assets/combo2.jpeg";
import blinkit from "../assets/combo3.jpeg";
import bigBasket from "../assets/combo4.png";
import zomato from "../assets/combo5.jpg";
import swiggy from "../assets/combo6.png";
import defaultBadge from "../assets/combo7.jpg";

const CombineOrderForm = () => {
  const { isAuthenticated, user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [offer, setOffer] = useState("");
  const [amountRequired, setAmountRequired] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePostOrder = async () => {
    if (!isAuthenticated) {
      // Display a message or a login prompt if the user is not authenticated
      return;
    }

    // Check if any required field is empty
    if (!name || !brandName || !offer || !amountRequired || !phoneNumber) {
      alert("Please fill all the fields");
      return;
    }

    setLoading(true);
    // Create a new order object
    const order = {
      name,
      brandName,
      offer,
      amountRequired,
      phoneNumber,
      userId: user.sub, // Include the user's ID
      email: user.email,
    };

    try {
      // Add the order to Firestore
      const docRef = await addDoc(collection(firestore, "comb_order"), order);

      // Clear the form fields after posting
      setName("");
      setBrandName("");
      setOffer("");
      setAmountRequired("");
      setPhoneNumber("");

      // Provide feedback to the user
      console.log("Order posted with ID: ", docRef.id);

      // Show a success message and an alert
      alert("Your order has been posted");
    } catch (error) {
      console.error("Error posting order: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container ride">
      <h1 className="mt-2">Combine Orders for Discounts</h1>

      {isAuthenticated ? (
        <form>
          <div className="row">
            <div className="col-lg-6">
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

            <div className="col-lg-6">
              <div className="form-group my-4">
                <label htmlFor="brandName">Brand Name</label>
                <input
                  type="text"
                  id="brandName"
                  className="form-control"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="form-group my-4">
                <label htmlFor="offer">Offer</label>
                <input
                  type="text"
                  id="offer"
                  className="form-control"
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="form-group my-4">
                <label htmlFor="amountRequired">Amount Required</label>
                <input
                  type="number"
                  id="amountRequired"
                  className="form-control"
                  value={amountRequired}
                  onChange={(e) => setAmountRequired(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="form-group my-4">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group" style={{ marginTop: "45px" }}>
                {loading ? (
                  <button
                    className="butn"
                    disabled
                    style={{
                      marginRight: "auto",
                      width: "100%",
                      marginLeft: "auto",
                    }}
                    onClick={handlePostOrder}
                    type="button"
                  >
                    Posting
                  </button>
                ) : (
                  <button
                    className="butn "
                    style={{
                      marginRight: "auto",
                      width: "100%",
                      marginLeft: "auto",
                    }}
                    onClick={handlePostOrder}
                    type="button"
                  >
                    Post
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="d-grid gap-2 mt-5"></div>
        </form>
      ) : (
        <p>Please log in to post an order.</p>
      )}
    </div>
  );
};

const CombineOrderList = () => {
  const [orderListings, setOrderListings] = useState([]);
  const [brandNameFilter, setBrandNameFilter] = useState("");
  const [perPageLimit] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  let end = currentPage * perPageLimit;
  let start = end - perPageLimit;
  const fetchOrderListings = async () => {
    const orderCollection = collection(firestore, "comb_order");

    try {
      const querySnapshot = await getDocs(orderCollection);
      const orderData = [];

      querySnapshot.forEach((doc) => {
        orderData.push({ id: doc.id, ...doc.data() });
      });

      setOrderListings(orderData);
    } catch (error) {
      console.error("Error fetching order listings: ", error);
    }
  };

  useEffect(() => {
    fetchOrderListings();
  }, []);

  const applyFilters = () => {
    let filteredListings = [...orderListings];

    if (brandNameFilter) {
      filteredListings = filteredListings.filter((listing) =>
        listing.brandName.toLowerCase().includes(brandNameFilter.toLowerCase())
      );
    }

    return filteredListings;
  };

  const getBrandBadge = (brandName) => {
    switch (brandName.toLowerCase()) {
      case "amazon":
      case "amazon groceries":
        return amazon;
      case "flipkart":
      case "flipkart groceries":
        return flipkart;
      case "blinkit":
        return blinkit;
      case "big basket":
        return bigBasket;
      case "zomato":
        return zomato;
      case "swiggy":
        return swiggy;
      default:
        return defaultBadge;
    }
  };

  const filteredListings = applyFilters();
  // console.log(start, end);
  const to_show_product = filteredListings.slice(start, end);
  const paginate = (pagenNumber) => {
    const k = Math.ceil(filteredListings.length / perPageLimit);
    console.log(k);
    if (pagenNumber > Math.ceil(filteredListings.length / perPageLimit)) return;
    if (pagenNumber < 1) return;
    setCurrentPage(pagenNumber);
    console.log(start, end);
  };
  return (
    <div className="container existing-order">
      <hr />
      <h1 className="mb-3 mt-5">Existing Orders</h1>
      <div className="row row-cols-1">
        <input
          type="text"
          className="form-control"
          id="brandNameFilter"
          placeholder="Filter by Brand Name"
          value={brandNameFilter}
          onChange={(e) => setBrandNameFilter(e.target.value)}
        />
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-3">
        {to_show_product.map((listing) => (
          <div key={listing.id} className="col mb-4">
            <div className="card card1" style={{ width: "98%" }}>
              <img
                src={getBrandBadge(listing.brandName)}
                className="card-img-top"
                alt={listing.brandName}
                style={{ width: "150px", height: "50px", margin: "5px" }}
              />
              {/* {getBrandBadge(listing.brandName)} */}
              <div className="card-body" style={{ paddingBottom: 0 }}>
                <h5 className="card-title">
                  <strong>{listing.brandName}</strong>
                </h5>
                <p className="card-text">Offer: {listing.offer}</p>
                <p className="card-text">
                  Amount Required: ₹{listing.amountRequired}
                </p>
                <p className="card-text">Posted by: {listing.name}</p>
                <p className="card-text">Phone: {listing.phoneNumber}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center my-3 mb-5">
        <button className="butn mr-3" onClick={() => paginate(currentPage - 1)}>
          Previous
        </button>
        <button className="butn ml-3" onClick={() => paginate(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

const CombineOrder = () => {
  return (
    <div className="container">
      <CombineOrderForm />
      <CombineOrderList />
    </div>
  );
};

export default CombineOrder;
