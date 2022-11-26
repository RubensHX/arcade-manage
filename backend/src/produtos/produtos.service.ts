import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { db } from 'firebase/firebase';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  async create(createProdutoDto: CreateProdutoDto) {
    const produto = new Produto({
      id: randomUUID(),
      ...createProdutoDto,
      createdAt: new Date(),
    });
    await setDoc(doc(db, 'products', produto.id), produto);
  }

  async findAll() {
    await getDocs(collection(db, 'products'));
  }

  async findOne(id: string) {
    await getDoc(doc(db, 'products', id));
  }

  async update(id: string, updateProdutoDto: UpdateProdutoDto) {
    const produto = new Produto({
      ...updateProdutoDto,
      updatedAt: new Date(),
    });
    await setDoc(doc(db, 'products', id), produto);
  }

  async remove(id: string) {
    await deleteDoc(doc(db, 'products', id));
  }
}
