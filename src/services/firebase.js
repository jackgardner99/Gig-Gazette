
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAjIlLgbxVapwAuK_OLJa5BevEJaH1wMJ0",
  authDomain: "gig-gazette-d57fe.firebaseapp.com",
  projectId: "gig-gazette-d57fe",
  storageBucket: "gig-gazette-d57fe.firebasestorage.app",
  messagingSenderId: "1049172928549",
  appId: "1:1049172928549:web:9d61dbb4028feb3a0677cc"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)