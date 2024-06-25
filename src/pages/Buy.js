import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import "../App.css";
import group69 from "../assets/Group69.png";
import buyy from "../assets/Untitled (1).jpeg";
import { Link } from "react-router-dom";

function Buy() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page number when performing a new search
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const fetchProducts = async () => {
    const productsCollection = collection(firestore, "products");
    const productsQuery = query(productsCollection);

    try {
      const querySnapshot = await getDocs(productsQuery);
      const productsData = [];

      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });

      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // const addToCart = async (product) => {
  //   try {
  //     if (!isAuthenticated) {
  //       console.error("User not authenticated");
  //       return;
  //     }

  //     const itemToAdd = { ...product, userId: user.sub, imageUrl: product.imageUrl }; // Include imageUrl property
  //     await addDoc(cartCollectionRef, itemToAdd);
  //     alert(`Added ${product.name} to your cart.`);
  //   } catch (error) {
  //     console.error("Error adding item to cart:", error);
  //   }
  // };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div className="row buy-container">
          <div className="col-md-6">
            <p className="yellow-text">BUY / SELL GOODS</p>
            <h1>Campus Cart: Your Campus, Your Marketplace</h1>
            <p className="para-text">
              The platform promotes cost-effective exchanges by enabling
              students to trade used items at affordable prices within the
              campus. By integrating these services into a single platform,
              CampusMart aims to foster a sustainable and supportive campus
              community.
            </p>
            <Link className="butn" to="/sell">
              List an Item <i className="bx bx-up-arrow-alt"></i>
            </Link>
          </div>
          <div className="col-md-6 alignMid ">
            <img className=" img-fluid" src={buyy} alt="buy page" />
          </div>
        </div>

        <h3 className="sub-header mb-4 text-center text-muted">
          What are you looking for?
        </h3>

        <div className="row mb-4">
          <div className="col-md-12">
            <input
              type="text"
              className="form-control f2"
              placeholder="Search by keyword..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "60vh" }}
          >
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-2 row-cols-md-2 row-cols-lg-4 g-0">
            {currentProducts.map((product) => (
              <div key={product.id} className="col mb-4">
                <Link
                  to={`/product/${product.id}`}
                  className="text-decoration-none"
                >
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
                        {" "}
                        <strong>{product.sellerNm} </strong>
                      </p>
                      <p className="card-text">
                        {" "}
                        <strong>Hostle: </strong> {product.location}
                      </p>
                      <h5 className="">Rs {product.price.toFixed(0)}</h5>
                      <div className="col-lg-6">
                        <Link
                          to={`/product/${product.id}`}
                          className="btn border-success border-2 btn-success w-100"
                        >
                          Buy Now
                        </Link>
                      </div>
                      {/* {isAuthenticated ? (
                    <button
                      className="btn btn-success"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <p className="card-text">Login to add to cart</p>
                  )} */}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="text-center my-3 mb-5">
          <button className="butn mr-3" onClick={() => paginate(1)}>
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`button1 ${
                currentPage === number ? "btn-success" : "btn-secondary"
              } mx-2`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}
          <button
            className="butn ml-3"
            onClick={() => paginate(pageNumbers.length)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Buy;
