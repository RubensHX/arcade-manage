import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
      console.warn(`[ERROR] ${error}`);
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
      console.warn(`[ERROR] ${error}`);
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
}
