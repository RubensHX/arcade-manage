import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { FirebaseService } from '../firebase/firebase.service';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(private firebaseService: FirebaseService) {}

  async create(body: Client) {
    const docRef: DocumentReference = doc(
      this.firebaseService.clientsCollection,
    );
    await setDoc(docRef, body);
  }

  async findAll() {
    const q = query(this.firebaseService.clientsCollection);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
    await updateDoc(docRef, { ...body });
  }

  async remove(id: string) {
    const docRef: DocumentReference = doc(
      this.firebaseService.clientsCollection,
      id,
    );
    await deleteDoc(docRef);
  }
}
