import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import RegisterEmployee from '../redux/RegisterEmployee'
let displayName, roles,  contractType, firstName, lastName, dob, team, cpr;
let photoURL="";


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
export const storage = firebase.storage();
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
    return await getAllUserData(user.uid);
  };

  

  const writeUserToDB = async (user,userRef,workingNumber) =>{
    const email =  user.email;
    const userPublicRef = firestore.doc(`userPublic/${user.uid}`);
    try {
      await userRef.set({
        email,
        roles:{admin: roles[0],manager: roles[1],worker: roles[2]},
        workingNumber, 
        contractType
      });
      await userPublicRef.set({
        displayName,
        photoURL
      });
      await RegisterEmployee(workingNumber,firstName,lastName,dob,contractType,team, cpr)
    } catch (error) {
      //TODO: remove user document from firestore and db if error occurs
      console.error("Error creating user document", error);
    }
  }

  export const writeImageAndDisplayNameToDb = async (type, imgRef, displayNameRef)=>{
   console.log("firestore write");
    var user = auth.currentUser;
    const userPublicRef = firestore.doc(`userPublic/${user.uid}`);
     photoURL=imgRef;
     displayName=displayNameRef
     console.log(displayName);

    if(type=='image'){
      try {
        await userPublicRef.update({
          photoURL: imgRef
        });
      } catch (error) {
        console.error("Error  saving image", error);
      }
    }
    else if(type="displayName"){
      try {
        await userPublicRef.update({
          displayName: displayNameRef
        });
      } catch (error) {
        console.error("Error updating name ", error);
      }
    }
   
    
  }

 const getAllUserData=async uid=>{
  const userResult = [await getUserProfile(uid), await getUserDocument(uid)];
  return await userResult;
 }
  const getUserProfile = async uid => {
    if (!uid) return null;
    
    return await firestore.doc(`userPublic/${uid}`).get().then((doc) => {
        if (doc.exists) {
    console.log(doc.data);
            return doc.data();
        } else {
            // doc.data() will be undefined in this case
            return "No such document!";
        }
    }).catch((error) => {
        return  "Error getting document:"+ error;
    });
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
    return  "Error getting document:"+ error;
});
}
export const sendResetEmail = email => {
    auth.sendPasswordResetEmail(email)
      .then(() => {
       console.log("email sent");
      })
      .catch((error) => {
        return "Error resetting password" + error;
      });
  };
export const updateUserPassword=(currentPassword, newPassword)=>{
  var user = auth.currentUser;
  const emailCred  = firebase.auth.EmailAuthProvider.credential(
                     user.email, currentPassword);
  user.reauthenticateWithCredential(emailCred)
  .then(() => {
      // User successfully reauthenticated.
      return user.updatePassword(newPassword);
  })
  .catch(error => {
      console.log(error.message);  
      return error.message;
  });

}
export const updateUserEmail=(currentPassword, newEmail)=>{
 
  var user = auth.currentUser;
  const emailCred  = firebase.auth.EmailAuthProvider.credential(
                     user.email, currentPassword);
  user.reauthenticateWithCredential(emailCred)
  .then(() => {
      // User successfully reauthenticated.
      return user.updateEmail(newEmail);
  })
  .catch(error => {
      console.log(error.message);  
      return error.message;
  });

  
}
export const createNewUser = async (displayN,email,password,rolesParam, contractType_, firstN, lastN, dob_, team_, cpr_) =>
{

    try{
      displayName = displayN;
      roles = rolesParam;
      contractType=contractType_
      firstName=firstN;
      lastName=lastN;
      dob=dob_;
      team=team_;
      cpr=cpr_;
      // console.log('USERRR'+firstName, lastName, dob, team, cpr);
      var authApp = firebase.initializeApp(firebaseConfig, 'authApp');
      var detachedAuth = authApp.auth();
      const registeredUser = await detachedAuth.createUserWithEmailAndPassword(email, password);
      return await generateUserDocument(registeredUser.user);

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

