import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import { firestore, cartCollectionRef } from "../firebase";
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "react-bootstrap";
import useReceiverStore from "../lib/receiverStore";
import useChatStore from "../lib/chatToggleStore";
import Loader from "./loader/Loader";

function ProductInfo({ setCartItems }) {
  const { isAuthenticated, user } = useAuth0();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { productId } = useParams();
  const { loginWithRedirect } = useAuth0();
  const { receiver, updateReceiver } = useReceiverStore();
  const { openToggle } = useChatStore();
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
              <button
                className="btn border-success border-2 btn-success w-50"
                onClick={() => handleMessage(product)}
              >
                Chat
              </button>
              {isSending && <Loader />}
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
