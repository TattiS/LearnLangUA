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
      await updateProfile(user, { displayName: nick });
    }
    return user;
  } catch (error) {
    console.error(error.message || "Error registering user");
    throw error;
  }
};

export const loginUser = async ({ email, psw }) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, psw);
    return user;
  } catch (error) {
    console.error(error.message || "Error logging in user");
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error.message || "Error logging out user");
    throw error;
  }
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
