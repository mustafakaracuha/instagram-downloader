import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBRQ-tzmcPIu5DngWlSR3Rp6pSP0QGUg44",
    authDomain: "instagram-downlaoder-e5e35.firebaseapp.com",
    projectId: "instagram-downlaoder-e5e35",
    storageBucket: "instagram-downlaoder-e5e35.appspot.com",
    messagingSenderId: "635326742547",
    appId: "1:635326742547:web:d3a6979572d661303bffe6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;