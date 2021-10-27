
import firebase from "firebase/compat/app"
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAEJe_dIsitXdW7CYavkmTdxKt73CTMRpQ",
    authDomain: "blog-cdbd0.firebaseapp.com",
    projectId: "blog-cdbd0",
    storageBucket: "blog-cdbd0.appspot.com",
    messagingSenderId: "305141857916",
    appId: "1:305141857916:web:a08d1f5e444119dd01d3f9",
    measurementId: "G-9KC8C04BL9"
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  export default storage;
