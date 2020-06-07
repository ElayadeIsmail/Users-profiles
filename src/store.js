import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import { createStore, combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore"; // <- needed if using firestore
import notifyUseReducer from "./component/reducers/notifyUseReducer";

const fbConfig = {
  apiKey: "AIzaSyDp0_Tkc7K8elCiePjmfO_oWqRmr6zUo0A",
  authDomain: "react-e0391.firebaseapp.com",
  databaseURL: "https://react-e0391.firebaseio.com",
  projectId: "react-e0391",
  storageBucket: "react-e0391.appspot.com",
  messagingSenderId: "986024116900",
  appId: "1:986024116900:web:dcc23f665864b7e8769c31",
  measurementId: "G-LSKC8VDJNW",
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyUseReducer, // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

export default store;
