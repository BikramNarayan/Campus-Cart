import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  getDocs,
  serverTimestamp,
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase";
import "../App.css";
import buyy from "../assets/Untitled (1).jpeg";
import { Link } from "react-router-dom";
import useReceiverStore from "../lib/receiverStore";
import useChatStore from "../lib/chatToggleStore";
import { useAuth0 } from "@auth0/auth0-react";

function Buy() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Correctly use the Zustand hooks at the top level
  // const updateReceiver = useUpdateReceiver();
  // const receiver = useReceiver();
  const { receiver, updateReceiver } = useReceiverStore();
  const { openToggle } = useChatStore();
  const { user } = useAuth0();

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const fetchProducts = async () => {
    if (!user?.sub) return;
    const productsCollection = collection(firestore, "products");
    const productsQuery = query(
      productsCollection,
      where("userId", "!=", user?.sub)
    );

    try {
      const querySnapshot = await getDocs(productsQuery);
      const productsData = [];

      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });
      // console.log(productsData);
      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const paginate = (pageNumber) => {
    if (pageNumber < 1) return;
    if (pageNumber > Math.ceil(filteredProducts.length / productsPerPage))
      return;
    setCurrentPage(pageNumber);
  };

  const handleMessage = async (userId) => {
    console.log("id of seller " + userId);
    updateReceiver(userId);

    const chatRef = collection(firestore, "chats");
    const userChatRef = collection(firestore, "userchats");

    try {
      // Create a new chat document in the "chats" collection
      const newChatRef = doc(chatRef); // Generates a unique ID
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        message: [],
      });
      console.log("New chat ID:", newChatRef.id);

      // Ensure userChat document exists for `user.sub` (current user)
      const userChatDoc = doc(userChatRef, user.sub); // Reference to user's userchats document
      const userChatSnap = await getDoc(userChatDoc); // Check if it exists
      if (!userChatSnap.exists()) {
        // Create the document if it doesn't exist
        await setDoc(userChatDoc, { chats: [] });
      }

      // Ensure userChat document exists for `receiver`
      const receiverChatDoc = doc(userChatRef, receiver); // Reference to receiver's userchats document
      const receiverChatSnap = await getDoc(receiverChatDoc); // Check if it exists
      if (!receiverChatSnap.exists()) {
        // Create the document if it doesn't exist
        await setDoc(receiverChatDoc, { chats: [] });
      }

      // Add the new chat to the `chats` array for both users
      const chatData = {
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: receiver,
        updatedAt: Date.now(),
      };

      await updateDoc(userChatDoc, {
        chats: arrayUnion(chatData),
      });

      await updateDoc(receiverChatDoc, {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.sub,
          updatedAt: Date.now(),
        }),
      });
    } catch (error) {
      console.error("Error in handleMessage:", error);
    }

    openToggle();
    console.log("current receiver " + receiver);
  };

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
          <div className="col-md-6 alignMid">
            <img className="img-fluid" src={buyy} alt="buy page" />
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
                <div className="card card1">
                  <img
                    src={product.imageUrl}
                    className="card-img-top"
                    alt={product.name}
                    loading="lazy"
                  />
                  <div className="card-body" style={{ paddingBottom: 0 }}>
                    <h5 className="card-title">
                      <strong>{product.name}</strong>
                    </h5>
                    <p className="card-text">
                      <strong>{product.sellerNm}</strong>
                    </p>
                    <p className="card-text">
                      <strong>Hostle: </strong> {product.location}
                    </p>
                    <h5 className="">Rs {product.price.toFixed(0)}</h5>
                    <button onClick={() => handleMessage(product.userId)}>
                      whatsapp
                    </button>
                    <div className="col-lg-6">
                      <Link
                        to={`/product/${product.id}`}
                        className="btn border-success border-2 btn-success w-100"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center my-3 mb-5">
          <button
            className="butn mr-3"
            onClick={() => paginate(currentPage - 1)}
          >
            Previous
          </button>
          <button
            className="butn ml-3"
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Buy;
