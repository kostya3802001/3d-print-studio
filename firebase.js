// ===============================
// FIREBASE FULL INIT (PRODUCTION)
// ===============================

// ?? ÂÀÆÍÎ:
// ÇÀÉÄÈ Â Firebase Console > Project settings > Web app
// È ÇÀÌÅÍÈ ÝÒÈ ÄÀÍÍÛÅ ÍÀ ÑÂÎÈ
// (èíà÷å Firebase íå ïîäêëþ÷èòñÿ)

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
firebase.initializeApp(firebaseConfig);

// ===============================
// SERVICES
// ===============================
const auth = firebase.auth();
const db = firebase.firestore();

// ===============================
// AUTH FUNCTIONS
// ===============================

// ?? ÂÕÎÄ
function loginUser(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "account.html";
        })
        .catch(err => {
            alert("Ïîìèëêà âõîäó: " + err.message);
        });
}

// ?? ÐÅªÑÒÐÀÖ²ß
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
            alert("Ïîìèëêà ðåºñòðàö³¿: " + err.message);
        });
}

// ?? ÂÈÕ²Ä
function logoutUser() {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    });
}

// ===============================
// ORDERS
// ===============================

// ?? ÑÒÂÎÐÈÒÈ ÇÀÌÎÂËÅÍÍß
function createOrder(data) {
    auth.onAuthStateChanged(user => {
        if (!user) {
            alert("Óâ³éä³òü ó êàá³íåò");
            return;
        }

        db.collection("orders").add({
            userId: user.uid,
            data: data,
            status: "new",
            created: new Date()
        }).then(() => {
            alert("Çàìîâëåííÿ íàä³ñëàíî");
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
