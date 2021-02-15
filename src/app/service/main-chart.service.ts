import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MainChartService {

  private cattleCollection: AngularFirestoreCollection<chartModal>;
  cattles$: Observable<chartModal[]>;
  constructor(private readonly firestoreservice: AngularFirestore) {
    this.cattleCollection = firestoreservice.collection<chartModal>('farms');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.cattles$ = this.cattleCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as chartModal;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
export interface chartModal
{
  farmName: string;
  cattleCount: number;
  dairyCattleCount: number;
}