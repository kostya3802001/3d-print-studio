
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  setPersistence, 
  browserLocalPersistence 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBgAl6GL0DQOhE-JpPAABzb4yvOctfpXXI",
  authDomain: "d-print-studio-25787.firebaseapp.com",
  projectId: "d-print-studio-25787",
  storageBucket: "d-print-studio-25787.firebasestorage.app",
  messagingSenderId: "671010955757",
  appId: "1:671010955757:web:633317a7073d5d6f6c07e4"
};

export const app = const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth();
setPersistence(auth, browserLocalPersistence);

export function requireAuth(callback){
  onAuthStateChanged(auth, user => {
    callback(user);
  });
}
