import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCko5PlyE038cmdZoJE7xX1Z-ORoB2YS-M",
    authDomain: "crwn-db-30bab.firebaseapp.com",
    databaseURL: "https://crwn-db-30bab.firebaseio.com",
    projectId: "crwn-db-30bab",
    storageBucket: "crwn-db-30bab.appspot.com",
    messagingSenderId: "283702740871",
    appId: "1:283702740871:web:038d5112f32e45b2d7f522",
    measurementId: "G-TRDPQV9VBM"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }   

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
