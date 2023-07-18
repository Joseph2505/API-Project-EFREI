// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLHjDZzGzDYpxynYclmCA4jIpqmAb2amo",
  authDomain: "api-chatserver.firebaseapp.com",
  projectId: "api-chatserver",
  storageBucket: "api-chatserver.appspot.com",
  messagingSenderId: "923330035396",
  appId: "1:923330035396:web:ce77ba825e4074a101d391"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
