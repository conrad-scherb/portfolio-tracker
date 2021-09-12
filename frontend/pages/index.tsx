import type { NextPage } from 'next'
import FirebaseUiLogin from '../components/navigation/FirebaseLogin'
import Navbar from '../components/navigation/Navbar'
import AssetDisplayTable from '../components/portfolio/AssetDisplayTable'
import firebase from 'firebase/app';
import { firebaseConfig } from '../secrets'
import client from 'firebase';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const Home: NextPage = () => {
    return (
        <>
            <Navbar/>
            <AssetDisplayTable
                user={"acir"}
            />
            <FirebaseUiLogin
                firebaseClient={client}
            />
        </>
    )
}

export default Home