import { Injectable, Res } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import {
  AuthError,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  UserCredential,
} from 'firebase/auth';
import {
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { Auth } from './auth';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async login(body: Auth): Promise<Auth> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this.firebaseService.auth,
        body.email,
        body.password,
      );

      if (userCredential) {
        const id: string = userCredential.user.uid;
        const docRef: DocumentReference = doc(
          this.firebaseService.usersCollection,
          id,
        );
        const snapshot: DocumentSnapshot<DocumentData> = await getDoc(docRef);
        const data: Auth = {
          ...snapshot.data(),
          id: snapshot.id,
        } as Auth;
        delete data.password;
        return data;
      }
    } catch (error: unknown) {
      const firebaseError = error as AuthError;
      if (firebaseError.code === 'auth/wrong-password') {
        throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
      }
    }
  }

  async register(body: Auth): Promise<void> {
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          this.firebaseService.auth,
          body.email,
          body.password,
        );
      if (userCredential) {
        const id: string = userCredential.user.uid;
        const docRef: DocumentReference = doc(
          this.firebaseService.usersCollection,
          id,
        );
        await setDoc(docRef, body);
      }
    } catch (error: unknown) {
      const firebaseError = error as AuthError;
      if (firebaseError.code === 'auth/email-already-in-use') {
        throw new HttpException('Email already in use', HttpStatus.CONFLICT);
      }
    }
  }

  async logout(): Promise<string> {
    try {
      this.firebaseService.auth.signOut();
      return 'Logout successful';
    } catch (error: unknown) {
      console.warn(`[ERROR] ${error}`);
    }
  }

  async googleLogin() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.firebaseService.auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        return { token, user };
      })
      .catch((error) => {
        console.warn(`[ERROR] ${error}`);
      });
  }

  isAuthenticated() {
    return this.firebaseService.auth.currentUser;
  }
}
