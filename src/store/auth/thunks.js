import { async } from '@firebase/util';
import {
  signInWithGoogle,
  registerUserWithEmailPassword,
  loginWithEmailPassword,
  logoutFirebase,
} from '../../firebase/providers';
import { checkingCredentials, login, logout } from './'

export const checkingAuthentication = (email, password) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch )=>{

        dispatch( checkingCredentials() );
        
        const result = await signInWithGoogle();

        if (!result.ok) return dispatch( logout( result.errorMessage ) )

        dispatch( login(result));

    }
}

export const startCreatingUserWithEmailPassword = ( { email, password, displayName} ) => {
    
    console.log(email, password, displayName);

    return  async( dispatch ) => {
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword( { email, password, displayName }); 

        if(!ok) return dispatch( logout ( { errorMessage } ) );

        dispatch(login({ uid, email, password, displayName, photoURL }));

        
    }
}


export const startLoginWithEmailAndPassword = ({ email, password } ) => {

    return async( dispatch ) => {

        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage, displayName  } = await loginWithEmailPassword( { email, password });
        
        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login( { uid, photoURL,email, errorMessage, displayName } ) );
    }

};


export const startLogout = () => {
    return async( dispatch ) => {

        await logoutFirebase();

        dispatch( logout({}));

    }
}

