import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9Al_kkxgoSF-tzrRq_YOXYy975wAlqSM",
  authDomain: "campuscart-426807.firebaseapp.com",
  databaseURL: "https://campuscart-426807-default-rtdb.firebaseio.com",
  projectId: "campuscart-426807",
  storageBucket: "campuscart-426807.appspot.com",
  messagingSenderId: "168461417909",
  appId: "1:168461417909:web:d3db561df8d92c7a2dedfc",
  measurementId: "G-VTT377SV88",
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const cartCollectionRef = collection(firestore, "cart");
export { firestore, cartCollectionRef };
