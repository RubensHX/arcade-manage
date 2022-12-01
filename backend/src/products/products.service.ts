import { Injectable } from '@nestjs/common';
import {
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private firebaseService: FirebaseService) {}

  async create(body: Omit<Product, 'id'>) {
    const docRef: DocumentReference = doc(
      this.firebaseService.productsCollection,
    );
    await setDoc(docRef, body);
  }

  async findAll() {
    const snapshot = await getDocs(this.firebaseService.productsCollection);
    return snapshot.docs.map((doc) => doc.data());
  }

  async findOne(id: string) {
    const docRef: DocumentReference = doc(
      this.firebaseService.productsCollection,
      id,
    );
    const snapshot = await getDoc(docRef);
    return snapshot.data();
  }

  async update(id: string, body: Partial<Product>) {
    const docRef: DocumentReference = doc(
      this.firebaseService.productsCollection,
      id,
    );
    await setDoc(docRef, body, { merge: true });
  }

  async remove(id: string) {
    const docRef: DocumentReference = doc(
      this.firebaseService.productsCollection,
      id,
    );
    await deleteDoc(docRef);
  }
}
