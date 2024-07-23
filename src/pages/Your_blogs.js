import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  collection,
  where,
  query,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { Link } from "react-router-dom";
import amazon from "../assets/combo1.png";
import flipkart from "../assets/combo2.jpeg";
import blinkit from "../assets/combo3.jpeg";
import bigBasket from "../assets/combo4.png";
import zomato from "../assets/combo5.jpg";
import swiggy from "../assets/combo6.png";
import defaultBadge from "../assets/combo7.jpg";

const YourBlogs = () => {
  const { isLoading, isAuthenticated, user } = useAuth0();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [rideData, setRideData] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingRides, setLoadingRides] = useState(true);

  const fetchProducts = async () => {
    if (user?.email) {
      const q = query(
        collection(firestore, "products"),
        where("email", "==", user.email)
      );
      try {
        const querySnapshot = await getDocs(q);
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsData);
        setLoadingProducts(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  };

  const fetchOrders = async () => {
    if (user?.email) {
      const q = query(
        collection(firestore, "comb_order"),
        where("email", "==", user.email)
      );
      try {
        const querySnapshot = await getDocs(q);
        const ordersData = [];
        querySnapshot.forEach((doc) => {
          ordersData.push({ id: doc.id, ...doc.data() });
        });
        setOrders(ordersData);
        setLoadingOrders(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
  };

  const fetchRideListings = async () => {
    if (user?.email) {
      const q = query(
        collection(firestore, "ride-sharing"),
        where("email", "==", user.email)
      );
      try {
        const querySnapshot = await getDocs(q);
        const rideData = [];
        querySnapshot.forEach((doc) => {
          rideData.push({ id: doc.id, ...doc.data() });
        });
        setRideData(rideData);
        setLoadingRides(false);
      } catch (error) {
        console.error("Error fetching ride-sharing listings:", error);
      }
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      fetchProducts();
      fetchOrders();
      fetchRideListings();
    }
  }, [isLoading, isAuthenticated, user]);

  const handleDelete = async (collectionName, id) => {
    try {
      await deleteDoc(doc(firestore, collectionName, id));
      if (collectionName === "products") {
        setProducts(products.filter((product) => product.id !== id));
      } else if (collectionName === "comb_order") {
        setOrders(orders.filter((order) => order.id !== id));
      } else if (collectionName === "ride-sharing") {
        setRideData(rideData.filter((ride) => ride.id !== id));
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const getBrandBadge = (brandName) => {
    if (!brandName) return defaultBadge;
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

  return (
    <>
      <div
        style={{
          background: "#DCF8AB",
        }}
      >
        <h1
          className="mt-2"
          style={{
            width: "fit-content",
            margin: "auto",
          }}
        >
          Your Blogs
        </h1>
      </div>
      <div className="container ride">
        {loadingProducts || loadingOrders || loadingRides ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "60vh" }}
          >
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <h2 className="mt-2">You don't have any product blogs</h2>
            ) : (
              <>
                <h1 className="mt-2">Your Products</h1>
                <div className="row row-cols-2 row-cols-md-2 row-cols-lg-4 g-0">
                  {products.map((product) => (
                    <div key={product.id} className="col mb-4">
                      <div className="card card1">
                        <img
                          src={product.imageUrl}
                          className="card-img-top"
                          alt={product.name}
                        />
                        <div className="card-body" style={{ paddingBottom: 0 }}>
                          <h5 className="card-title">
                            <strong>{product.name}</strong>
                          </h5>
                          <p className="card-text">
                            <strong>{product.sellerNm}</strong>
                          </p>
                          <p className="card-text">
                            <strong>Hostle:</strong> {product.location}
                          </p>
                          <h5 className="">Rs {product.price.toFixed(0)}</h5>
                          <div className="col-lg-6">
                            <button
                              onClick={() =>
                                handleDelete("products", product.id)
                              }
                              className="btn border-danger border-2 btn-danger w-100"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {orders.length === 0 ? (
              <h2>You don't have any Combine Orders Blog</h2>
            ) : (
              <>
                <h2>Your Orders</h2>
                <div className="row row-cols-2 row-cols-md-3 g-3">
                  {orders.map((listing) => (
                    <div key={listing.id} className="col mb-4">
                      <div className="card card1" style={{ width: "98%" }}>
                        <img
                          src={getBrandBadge(listing.brandName)}
                          className="card-img-top"
                          alt={listing.brandName}
                          style={{
                            width: "150px",
                            height: "50px",
                            margin: "5px",
                          }}
                        />
                        <div className="card-body" style={{ paddingBottom: 0 }}>
                          <h5 className="card-title">
                            <strong>{listing.brandName}</strong>
                          </h5>
                          <p className="card-text">Offer: {listing.offer}</p>
                          <p className="card-text">
                            Amount Required: ₹{listing.amountRequired}
                          </p>
                          <p className="card-text">Posted by: {listing.name}</p>
                          <p className="card-text">
                            Phone: {listing.phoneNumber}
                          </p>
                          <button
                            onClick={() =>
                              handleDelete("comb_order", listing.id)
                            }
                            className="btn border-danger border-2 btn-danger w-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {rideData.length === 0 ? (
              <h2>You don't have any Combine Ride Blog</h2>
            ) : (
              <>
                <h2>Your Rides</h2>
                <div className="row row-cols-1 row-cols-md-3 g-3">
                  {rideData.map((listing) => (
                    <div key={listing.id} className="col mb-4">
                      <div className="card card1">
                        <div className="card-body" style={{ padding: "20px" }}>
                          <h5 className="card-title">
                            {listing.startingPoint} to {listing.endPoint}
                          </h5>
                          <p className="card-text block">
                            Date: {listing.date}
                          </p>
                          <p className="card-text block">
                            Passenger required : {listing.passengerCount}
                          </p>
                          <p className="card-text block">
                            Via : {listing.type}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleDelete("ride-sharing", listing.id)
                          }
                          className="btn border-danger border-2 btn-danger w-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            <br />
            <br />
          </>
        )}
      </div>
    </>
  );
};

export default YourBlogs;
