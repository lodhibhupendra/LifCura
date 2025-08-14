// Firebase initialization for LifCura
// Keep keys public as per Firebase Web SDK guidelines. Do not commit secrets.
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAs6Y8AyyQGeZNLBXj9yDcymx-DdXxu3DQ',
  authDomain: 'lifcura-dc969.firebaseapp.com',
  projectId: 'lifcura-dc969',
  storageBucket: 'lifcura-dc969.appspot.com',
  messagingSenderId: '79783442879',
  appId: '1:79783442879:web:c2ba26e51e991778f8890a',
  measurementId: 'G-LGKNRLBKE2',
};

const app = initializeApp(firebaseConfig);

// Export SDK instances for use across the app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
