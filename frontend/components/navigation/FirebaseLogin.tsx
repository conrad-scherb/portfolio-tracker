import React, { FC, useCallback, useEffect } from "react";
import firebase from "firebase";
import 'firebaseui/dist/firebaseui.css'

interface Props {
  firebaseClient: typeof firebase;
}

const FirebaseUiLogin: FC<Props> = ({ firebaseClient }) => {
  const loadFirebaseui = useCallback(async () => {
    const firebaseui = await import("firebaseui");
    const firebaseUi =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebaseClient.auth());
    firebaseUi.start("#firebaseui-auth-container", {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    });
  }, [firebaseClient]);

  useEffect(() => {
    loadFirebaseui();
  }, []);

  return <div id="firebaseui-auth-container" className="fixed top-1/2 left-1/2"></div>;
};

export default FirebaseUiLogin;