import { Injectable } from '@nestjs/common';
import { Cliente } from './cliente';
import { db } from '../../firebase/firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from 'firebase/firestore';
import { randomUUID } from 'crypto';

@Injectable()
export class ClienteService {
  async create(cliente: Cliente) {
    await setDoc(doc(db, 'clients', randomUUID()), cliente);
  }

  async read() {
    await getDocs(collection(db, 'users'));
  }

  async update(cliente: Cliente, id: string) {
    await setDoc(doc(db, 'clients', id), cliente);
  }

  async delete(id: string) {
    await deleteDoc(doc(db, 'clients', id));
  }
}
