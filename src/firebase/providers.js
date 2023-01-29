import { async } from '@firebase/util';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { uid, email, displayName, photoURL  } = result.user;
 
        return {
           ok: true,
           // User Info
           displayName,
           email,
           photoURL,
           uid
        }
        
    } catch (error) {
        // const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage
        }
    }

}


export const registerUserWithEmailPassword = async ( { email,  password,  displayName} ) => {
  try {

    console.log(email, password, displayName);
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = resp.user;
    
    //Todo: update displayName in Firebase
    //After authenticated you are able to call FirebaseAuth.currentUser
    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid, photoURL, email, displayName
    }

  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const loginWithEmailPassword = async( { email, password } ) => {

  try {
    
    const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
    const { uid, photoURL, errorMessage, displayName } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      email,
      errorMessage,
      displayName,
    };

  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }

}


export const logoutFirebase = async() => {
  return await FirebaseAuth.signOut();
}