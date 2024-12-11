import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCGgM4xfImc3zUGZ3deAKrT1nnj1eqIJpM",
    authDomain: "hospitallogin-1c882.firebaseapp.com",
    projectId: "hospitallogin-1c882",
    storageBucket: "hospitallogin-1c882.firebasestorage.app",
    messagingSenderId: "118156012652",
    appId: "1:118156012652:web:11ca6afd81dbba17e6fc49"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Example Hospital Data
const hospitalData = [
    "Ramlal Kundanlal Orthopaedic Hospital",
    "Panchsheel Hospital Pvt Ltd",
    "Monga Medical Centre",
    "Sehgal Neo Hospital",
    "Kesar Hospital",
    "Indraprastha Apollo Hospital",
    "Sir Ganga Ram Hospital",
    "Max Super Specialty Hospital",
    "Shanti Mukand Hospital"
];

// Populate Dropdown Dynamically
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.getElementById('hospital-dropdown');

    // Add hospital options
    hospitalData.forEach(hospital => {
        const option = document.createElement('option');
        option.value = hospital;
        option.textContent = hospital;
        dropdown.appendChild(option);
    });

    // Initialize Select2 for the dropdown if available
    if (typeof $ !== 'undefined' && typeof $.fn.select2 !== 'undefined') {
        $(dropdown).select2({
            placeholder: "Select a hospital",
            allowClear: true
        });
    }
});

// Handle Hospital Login Form Submission
document.getElementById('hospital-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedHospital = document.getElementById('hospital-dropdown').value;
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!selectedHospital) {
        alert('Please select a hospital.');
        return;
    }

    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log("Login successful for:", userCredential.user.email);
            alert(`Welcome, ${selectedHospital}!`);
            window.location.href = "user-dashboard.html"; // Adjust to your dashboard page
        })
        .catch(error => {
            console.error("Login error:", error.code, error.message);
            alert("Login failed. Please check your credentials.");
        });
});

