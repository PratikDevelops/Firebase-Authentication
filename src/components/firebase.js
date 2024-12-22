import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBDibubYLVo_AZdBux_OIFYWPWxQKdpnCw",
  authDomain: "forms-60754.firebaseapp.com",
  projectId: "forms-60754",
  storageBucket: "forms-60754.firebasestorage.app",
  messagingSenderId: "488485397226",
  appId: "1:488485397226:web:deacac78d44ad983782d93"
};

const app = initializeApp(firebaseConfig);

export default app;

export const auth = getAuth();
export const db = getFirestore(app); 
