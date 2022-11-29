import { Injectable } from '@nestjs/common';
import { Cliente } from './cliente';
import { db } from '../../firebase/firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { randomUUID } from 'crypto';

@Injectable()
export class ClienteService {
  async create(cliente: Cliente) {
    await setDoc(doc(db, 'clients', randomUUID()), cliente);
  }

  async findAll() {
    await getDocs(collection(db, 'users'));
  }

  async findOne(id: string) {
    await getDoc(doc(db, 'clients', id));
  }

  async update(cliente: Cliente, id: string) {
    await setDoc(doc(db, 'clients', id), cliente);
  }

  async delete(id: string) {
    await deleteDoc(doc(db, 'clients', id));
  }
}
