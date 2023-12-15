import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPiWSHu9edB24fUqSRNE3rUdgiyCblt-w",
  authDomain: "food-app-76994.firebaseapp.com",
  projectId: "food-app-76994",
  storageBucket: "food-app-76994.appspot.com",
  messagingSenderId: "171139437244",
  appId: "1:171139437244:web:2a763c09610637e47776b9"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);