import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import {
  CollectionReference,
  Firestore,
  getFirestore,
  collection,
} from 'firebase/firestore';
import { Config } from 'src/models/config.model';

@Injectable()
export class FirebaseService {
  public app: FirebaseApp;
  public auth: Auth;
  public firestore: Firestore;
  public usersCollection: CollectionReference;
  public clientsCollection: CollectionReference;
  public productsCollection: CollectionReference;
  constructor(private configService: ConfigService<Config>) {
    this.app = initializeApp(
      {
        apiKey: this.configService.get<string>('apiKey'),
        authDomain: this.configService.get<string>('authDomain'),
        projectId: this.configService.get<string>('projectId'),
        storageBucket: this.configService.get<string>('storageBucket'),
        messagingSenderId: this.configService.get<string>('messagingSenderId'),
        appId: this.configService.get<string>('appId'),
      },
      'arcade-manage',
    );
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
    this._createCollections();
  }

  private _createCollections() {
    this.usersCollection = collection(this.firestore, 'users');
    this.clientsCollection = collection(this.firestore, 'clients');
    this.productsCollection = collection(this.firestore, 'products');
  }
}
