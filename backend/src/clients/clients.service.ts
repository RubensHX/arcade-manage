import { Injectable } from '@nestjs/common';
import {
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { FirebaseService } from '../firebase/firebase.service';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(private firebaseService: FirebaseService) {}

  async create(body: Omit<Client, 'id'>) {
    const docRef: DocumentReference = doc(
      this.firebaseService.clientsCollection,
    );
    await setDoc(docRef, body);
  }

  async findAll() {
    const snapshot = await getDocs(this.firebaseService.clientsCollection);
    return snapshot.docs.map((doc) => doc.data());
  }

  async findOne(id: string) {
    const docRef: DocumentReference = doc(
      this.firebaseService.clientsCollection,
      id,
    );
    const snapshot = await getDoc(docRef);
    return snapshot.data();
  }

  async update(id: string, body: Partial<Client>) {
    const docRef: DocumentReference = doc(
      this.firebaseService.clientsCollection,
      id,
    );
    await setDoc(docRef, body, { merge: true });
  }

  async remove(id: string) {
    const docRef: DocumentReference = doc(
      this.firebaseService.clientsCollection,
      id,
    );
    await deleteDoc(docRef);
  }
}
