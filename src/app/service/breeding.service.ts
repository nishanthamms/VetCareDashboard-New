import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators'; 
import { Breeding } from '../models/breeding';

@Injectable({
  providedIn: 'root'
})
export class BreedingService {

  private breedings: Observable<Breeding[]>;
  private breedingCollection: AngularFirestoreCollection<Breeding>;

  constructor(private afs: AngularFirestore) {
    // define collection
    this.breedingCollection = this.afs.collection<Breeding>('breedings');
    // Get collection data
    this.breedings = this.breedingCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // getting all breeding
  getBreedings(): Observable<Breeding[]>{
    return this.breedings;
  }

  // getting single breeding
  getBreeding(id: string): Observable<Breeding>{
    return this.breedingCollection.doc<Breeding>(id).valueChanges().pipe(
      take(1),
      map(breeding => {
        breeding.id = id;
        return breeding;
      })
    );
  }

  // add breeding
  addBreeding(breeding: Breeding): Promise<DocumentReference>{
    return this.breedingCollection.add(breeding);
  }

  // update breeding
  updateBreeding(breeding: Breeding): Promise<void>{
    return this.breedingCollection.doc(breeding.id).update({
      dateOfHeatObserved: breeding.dateOfHeatObserved,
      dateOfFirstAI: breeding.dateOfFirstAI,
      dateOfSecondAI: breeding.dateOfSecondAI,
      semanId: breeding.semanId,
      dateOfPD: breeding.dateOfPD,
      dateOfLastCalving: breeding.dateOfLastCalving,
      noOfCalving: breeding.noOfCalving,
      AIReceiptNo: breeding.AIReceiptNo});
  }

  // delete breeding
  deleteBreeding(id: string): Promise<void>{
    return this.breedingCollection.doc(id).delete();
  }
}
