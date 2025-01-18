// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAphVAiY-JLCzJWw_TJhgBHkls-rUlrr2Q",
  authDomain: "st-appointment-a04cc.firebaseapp.com",
  databaseURL: "https://st-appointment-a04cc-default-rtdb.firebaseio.com",
  projectId: "st-appointment-a04cc",
  storageBucket: "st-appointment-a04cc.firebasestorage.app",
  messagingSenderId: "195604351900",
  appId: "1:195604351900:web:deed8ea7a652ec6853d659"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
console.log('Firebase initialized:', app);

// Get the form and button elements
const adminSigninForm = document.getElementById('adminsigninForm');
const adminSignInButton = document.getElementById('adminSignInButton');

// Add event listener for form submission
adminSigninForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get email and password from the form
    // Get email and password from the form
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

console.log('Email:', email);
// Be cautious with logging passwords in production
// console.log('Password:', password); 

// Sign in with Firebase Authentication
signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        console.log('Login successful:', user);

        // Fetch user role from Firestore or Realtime Database
        const userId = user.uid; // Get the unique user ID
        const userRef = firestore.collection('users').doc(userId); // Adjust this path based on your database structure

        return userRef.get(); // Fetch the user document
    })
    .then((userDoc) => {
        if (userDoc.exists) {
            const userData = userDoc.data();
            if (userData.role === 'admin') {
                // Redirect to admin dashboard or another page
                window.location.href = 'admin/admin-dashboard.html'; // Change this to your desired page
            } else {
                alert('Access denied: You do not have admin privileges.');
                console.error('Access denied for user:', userData.email);
            }
        } else {
            alert('User  data not found.');
            console.error('No user data found for the logged-in user.');
        }
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error during login:', errorCode, errorMessage);
        alert('Login failed: ' + errorMessage); // Display error message to the user
    });
});