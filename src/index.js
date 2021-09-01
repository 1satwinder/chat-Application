import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5S3J8pwWwlYAqGAM1YXkUMgI5ycduZc0",
  authDomain: "unichat-3ac85.firebaseapp.com",
  projectId: "unichat-3ac85",
  storageBucket: "unichat-3ac85.appspot.com",
  messagingSenderId: "349289121791",
  appId: "1:349289121791:web:907674719fc308205a89ca"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
