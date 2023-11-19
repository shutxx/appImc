import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAUsa33LHpxpeElIYCMv-iafTj_TKCwEt0",
  authDomain: "projetoroni-9344b.firebaseapp.com",
  projectId: "projetoroni-9344b",
  storageBucket: "projetoroni-9344b.appspot.com",
  messagingSenderId: "1081450945721",
  appId: "1:1081450945721:web:f08abb932773541a984f68",
  measurementId: "G-6FB7FXCB94"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//export const auth = initializeAuth(app, {
  //persistence: getReactNativePersistence(ReactNativeAsyncStorage)
//});