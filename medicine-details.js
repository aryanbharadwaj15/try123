import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAYgjAAVKC3AuzvEzH402PcxFF66MdUEaA",
    authDomain: "manufacturer-database.firebaseapp.com",
    databaseURL: "https://manufacturer-database-default-rtdb.firebaseio.com",
    projectId: "manufacturer-database",
    storageBucket: "manufacturer-database.appspot.com",
    messagingSenderId: "921165353469",
    appId: "1:921165353469:web:74690781fae7d32eda8994",
    measurementId: "G-Z8L28GCVR2"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const urlParams = new URLSearchParams(window.location.search);
const medicineKey = urlParams.get('key');

if (!medicineKey) {
    document.getElementById('details').innerHTML = 'Invalid or missing key.';
} else {
    const medicineRef = ref(database, `medicines/${medicineKey}`);
    get(medicineRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            document.getElementById('details').innerHTML = `
            <p><strong>Manufacturer:</strong> ${data.manufacturer}</p>
            <p><strong>Medicine Name:</strong> ${data.medicineName}</p>
            <p><strong>Medicine ID:</strong> ${data.medicineId}</p>
            <p><strong>Manufacture Date:</strong> ${data.manufactureDate}</p>
            <p><strong>Expiry Date:</strong> ${data.expiryDate}</p>
            <p><strong>Verified:</strong> ${data.isVerified ? 'Yes' : 'No'}</p>
            <p><strong>Quality Check Report Link:</strong> ${data.drive - link}</p>
          `;
        } else {
            document.getElementById('details').innerHTML = 'No details found for this key.';
        }
    }).catch((error) => {
        console.error('Error fetching details:', error);
        document.getElementById('details').innerHTML = 'Error fetching details.';
    });
}
