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
  arrayRemove,
} from "firebase/firestore";
import { firestore } from "../firebase";
import "../App.css";
import buyy from "../assets/Untitled (1).jpeg";
import { Link } from "react-router-dom";
import useReceiverStore from "../lib/receiverStore";
import useChatStore from "../lib/chatToggleStore";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../components/loader/Loader";

function Buy() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

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
      console.log(productsData);
      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  const handleMessage = async (p) => {
    console.log("id of seller " + p.userId);
    updateReceiver(p.userId);
    const chatRef = collection(firestore, "chats");
    const userChatRef = collection(firestore, "userchats");
    setIsSending(true);
    // console.log("isSending ", isSending);
    try {
      // Get current user's chats
      const userChatDoc = doc(userChatRef, user.sub);
      const userChatSnap = await getDoc(userChatDoc);

      // Get receiver's chats
      const receiverChatDoc = doc(userChatRef, p.userId);
      const receiverChatSnap = await getDoc(receiverChatDoc);

      // Check if a chat already exists between these users
      let existingChatId = null;
      let userChats;
      if (userChatSnap.exists()) {
        userChats = userChatSnap.data().chats || [];
        const existingChat = userChats.find(
          (chat) => chat.receiverId === p.userId
        );
        if (existingChat) {
          existingChatId = existingChat.chatId;
        }
      }

      const temp_message = `Hi ${p.sellerNm}, I'm interested in purchasing your ${p.name}. Would you be available to discuss the details?`;

      if (existingChatId) {
        // Get the existing chat document
        const existingChatDoc = doc(chatRef, existingChatId);

        // Add new message to the messages array
        await updateDoc(existingChatDoc, {
          message: arrayUnion({
            sender: user.sub,
            text: temp_message,
            timestamp: Date.now(),
          }),
        });

        // Update last message and timestamp in userchats for both users
        const chatData = {
          lastMessage: temp_message,
          updatedAt: Date.now(),
        };

        // Update current user's chat
        await updateDoc(userChatDoc, {
          chats: arrayRemove(
            userChats.find((chat) => chat.chatId === existingChatId)
          ),
        });
        await updateDoc(userChatDoc, {
          chats: arrayUnion({
            chatId: existingChatId,
            lastMessage: temp_message,
            receiverId: p.userId,
            updatedAt: chatData.updatedAt,
          }),
        });

        // Update receiver's chat
        if (receiverChatSnap.exists()) {
          const receiverChats = receiverChatSnap.data().chats || [];
          await updateDoc(receiverChatDoc, {
            chats: arrayRemove(
              receiverChats.find((chat) => chat.chatId === existingChatId)
            ),
          });
          await updateDoc(receiverChatDoc, {
            chats: arrayUnion({
              chatId: existingChatId,
              lastMessage: temp_message,
              receiverId: user.sub,
              updatedAt: chatData.updatedAt,
            }),
          });
        }
      } else {
        // Create new chat if none exists
        const newChatRef = doc(chatRef);
        await setDoc(newChatRef, {
          createdAt: serverTimestamp(),
          message: [
            {
              sender: user.sub,
              text: temp_message,
              timestamp: Date.now(),
            },
          ],
        });

        // Initialize userChat documents if they don't exist
        if (!userChatSnap.exists()) {
          await setDoc(userChatDoc, { chats: [] });
        }
        if (!receiverChatSnap.exists()) {
          await setDoc(receiverChatDoc, { chats: [] });
        }

        // Add new chat to both users
        const chatData = {
          chatId: newChatRef.id,
          lastMessage: temp_message,
          receiverId: p.userId,
          updatedAt: Date.now(),
        };

        await updateDoc(userChatDoc, {
          chats: arrayUnion(chatData),
        });

        await updateDoc(receiverChatDoc, {
          chats: arrayUnion({
            chatId: newChatRef.id,
            lastMessage: temp_message,
            receiverId: user.sub,
            updatedAt: Date.now(),
          }),
        });
      }
      setIsSending(false);
      openToggle();
      console.log("current seller id " + p.userId);
    } catch (error) {
      setIsSending(false);
      console.error("Error in handleMessage:", error);
    }
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
          <div className="row row-cols-1 row-cols-md-1 row-cols-lg-3 g-0">
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

                    <div className=" d-inline-flex gap-4">
                      <Link
                        to={`/product/${product.id}`}
                        className="btn border-success border-2 btn-info w-50"
                      >
                        Details
                      </Link>
                      <button
                        className="btn border-success border-2 btn-success w-50"
                        onClick={() => handleMessage(product)}
                      >
                        Chat
                        <img
                          src="./messenger.png"
                          alt=""
                          style={{
                            width: "21px",
                            height: "21px",
                            marginLeft: "8px",
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {isSending && <Loader />}
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
