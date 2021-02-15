import { Injectable } from '@angular/core';
import { User } from './../shared/service/user';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtherProfileService {

 

  private users: Observable<User[]>;
  private userCollection: AngularFirestoreCollection<User>;
  constructor(private afs: AngularFirestore) {
    // define collection
    this.userCollection = this.afs.collection<User>('userProfile');
    // Get collection data
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // getting single cattle
  getUser(id: string): Observable<User>{
    return this.userCollection.doc<User>(id).valueChanges().pipe(
      take(1),
      map(user => {
        user.uid = id;
        return user;
      })
    );
  }


}
