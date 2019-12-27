import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { fire } from 'core/firebase';

const SignIn: React.FC = () => {

  const [user, initialising, error] = useAuthState(firebase.auth());

  const login = () => {
    fire.loginWithGoogle();
  };

  const logout = () => {
    firebase.auth().signOut();
  }

  console.log({user, initialising, error});

  return (
    <div>
      <button onClick={login}>
        signin
      </button>
      <button onClick={logout}>
        logout
      </button>
    </div>
  );
};

export default SignIn;