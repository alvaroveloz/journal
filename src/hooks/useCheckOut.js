import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';

export const useCheckOut = () => {
    const { status } = useSelector((state) => state.auth);
    const dispatch = useDispatch((state) => state.auth);

    useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
        if (!user) return dispatch(logout({}));
        const { uid, displayName, email, photoURL } = user;
        dispatch(login({ uid, displayName, email, photoURL }));
    });
    }, []);
    return { status }
}
