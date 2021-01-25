import firebase from 'firebase/app';
import 'firebase/auth';
//where we will put the config values from firebase.
//when in dev mode, we can use these environmental variables
//when in production mode, we can set it up to use the production enviromental
//variables without changing code
const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseUrl: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
});
//gives us our authuntication instance
export const auth = app.auth();
export default app;