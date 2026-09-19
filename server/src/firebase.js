import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDeJa9okkRrnCBXNsJ72d0jRSpTkXvHQns",
  authDomain: "finpilot-d0a4f.firebaseapp.com",
  projectId: "finpilot-d0a4f",
  storageBucket: "finpilot-d0a4f.firebasestorage.app",
  messagingSenderId: "217141943081",
  appId: "1:217141943081:web:0817c5b7759fe160a2f538",
  measurementId: "G-ZY0Y38YHV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
