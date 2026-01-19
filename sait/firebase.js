// ===============================
// FIREBASE FULL INIT (PRODUCTION)
// ===============================

// ?? :
//   Firebase Console > Project settings > Web app
//      
// ( Firebase  )

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// ===============================
// INIT
// ===============================
firebase.const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// ===============================
// SERVICES
// ===============================
const auth = firebase.auth();
const db = firebase.firestore();

// ===============================
// AUTH FUNCTIONS
// ===============================

// ?? 
function loginUser(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "account.html";
        })
        .catch(err => {
            alert(" : " + err.message);
        });
}

// ?? Ūֲ
function registerUser(name, email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
            return db.collection("users").doc(cred.user.uid).set({
                name: name,
                email: email,
                created: new Date()
            });
        })
        .then(() => {
            window.location.href = "account.html";
        })
        .catch(err => {
            alert(" : " + err.message);
        });
}

// ?? ղ
function logoutUser() {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    });
}

// ===============================
// ORDERS
// ===============================

// ??  
function createOrder(data) {
    auth.onAuthStateChanged(user => {
        if (!user) {
            alert("  ");
            return;
        }

        db.collection("orders").add({
            userId: user.uid,
            data: data,
            status: "new",
            created: new Date()
        }).then(() => {
            alert(" ");
        });
    });
}

// ===============================
// ADMIN CHECK
// ===============================
function checkAdmin(callback) {
    auth.onAuthStateChanged(user => {
        if (!user) return;

        db.collection("admins").doc(user.uid).get()
            .then(doc => {
                if (doc.exists) callback(true);
                else callback(false);
            });
    });
}
