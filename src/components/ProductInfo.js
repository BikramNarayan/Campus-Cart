import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { firestore, cartCollectionRef } from "../firebase";
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "react-bootstrap";

function ProductInfo({ setCartItems }) {
  const { isAuthenticated, user } = useAuth0();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(firestore, "products", productId);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          setProduct(productSnapshot.data());
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (product === null) {
    return (
      // spinner
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row mb-3 mt-5">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <img
            src={product.imageUrl}
            className="img-fluid"
            alt={product.name}
            loading="lazy"
            style={{ aspectRatio: "1/1" }}
          />
        </div>
        <div className="col-md-8">
          <div
            className="card details-card"
            style={{
              height: "100%",
              transform: "none",
              background: "none",
              border: "2px green solid",
            }}
          >
            <div className="card-body p-4">
              <h1 className="my-2">
                <span
                  style={{
                    backgroundColor: "#dcf8ab",
                    padding: 8,
                    borderRadius: 14,
                    border: "2px solid green",
                  }}
                >
                  {product.name}
                </span>
              </h1>
              <br />
              <p className="card-text" style={{ fontWeight: "800" }}>
                Rs {product.price.toFixed(0)}
              </p>
              <p className="card-text">Seller: {product.sellerNm}</p>
              <p className="card-text">Location: {product.location}</p>
              <p className="card-text">
                Contact:{" "}
                <a
                  style={{ textDecoration: "none" }}
                  href={`tel:${product.contactNumber}`}
                >
                  {product.contactNumber}
                </a>
              </p>
              <p className="card-text">Description: {product.description}</p>

              {isAuthenticated ? (
                <div className="row g-2">
                  <div className="col-lg-6"></div>
                </div>
              ) : (
                <div>
                  {/* <p className="card-text text-danger">Login to buy or add to cart</p> */}
                  <button
                    className="btn btn-success btn-sm"
                    onClick={loginWithRedirect}
                  >
                    Login to buy or add to cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <br /> <br />
    </div>
  );
}

export default ProductInfo;
