import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

let displayName, roles;
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseUrl: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
  };

export const generateUserDocument = async (user) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const quersyResult = firestore.collection("users").orderBy("workingNumber", "desc").limit(1)
      
      quersyResult.get().then((snapshot) =>{
          let lastWorkingNumber = 1000;
          snapshot.docs.forEach(doc => {
            lastWorkingNumber = doc.data().workingNumber;
          })
          writeUserToDB(user, userRef,lastWorkingNumber+1)
      })
     
    }
    return await getUserDocument(user.uid);
  };

  const writeUserToDB = async (user,userRef,workingNumber) =>{
    console.log(user);
    const email =  user.email;
    const photoURL = null;
    console.log(email + photoURL + displayName + roles + workingNumber);
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        roles:{admin: roles[0],manager: roles[1],worker: roles[2]},
        workingNumber
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }

const getUserDocument = async uid => {
if (!uid) return null;

return await firestore.doc(`users/${uid}`).get().then((doc) => {
    if (doc.exists) {

        return doc.data();
    } else {
        // doc.data() will be undefined in this case
        return "No such document!";
    }
}).catch((error) => {
    return  "Error getting document:", error;
});
}
export const createNewUser = async (displayN,email,password,rolesParam) =>
{
    try{
       displayName = displayN;
       roles = rolesParam;
       return await auth.createUserWithEmailAndPassword(email, password);

      }
      catch(error){
          console.log(error);
       return error;
      }
}

export const signInWithEmailAndPassword = async (email, password) => {

return await auth.signInWithEmailAndPassword(email,password)
.then(function(firebaseUser) {
    return firebaseUser;
})
.catch(function(error) {
    return error;
});
};