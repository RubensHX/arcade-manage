import { Injectable } from '@nestjs/common';
import {
  Auth,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';

@Injectable()
export class UsuarioService {
  async createUser(auth: Auth, email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        const user = userCredential.user;
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return `${errorCode} - ${errorMessage}`;
      });
  }

  async login(auth: Auth, email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )
      .then((userCredential) => {
        const user = userCredential.user;
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return `${errorCode} - ${errorMessage}`;
      });
    return userCredential;
  }

  async logout(auth: Auth) {
    await auth.signOut();
  }

  async delete(auth: Auth) {
    await auth.currentUser.delete();
  }

  async loginWithGoogle(auth: Auth) {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  async loginWithFacebook(auth: Auth) {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(auth, provider);
  }
}
