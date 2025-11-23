import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const registerUser = async ({ email, psw, nick }) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, psw);
    if (nick) {
      await updateProfile(user, { nick });
    }
    return user;
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

export const loginUser = async ({ email, psw }) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, psw);
    return user;
  } catch (error) {
    console.error("Error logging in user:", error);
  }
};

export const logoutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
