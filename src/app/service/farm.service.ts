import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Farm} from '../models/Farm';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FarmService {
  farmId: string;
  private farms: Observable<Farm[]>;
  private farmCollection: AngularFirestoreCollection<Farm>;

  constructor(private afs: AngularFirestore) {
    // define collection
    this.farmCollection = this.afs.collection<Farm>('farms');
    // Get collection data
    this.farms = this.farmCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // getting all farms
  getFarms(): Observable<Farm[]>{
    return this.farms;
  }

  // getting single farm
  getFarm(id: string): Observable<Farm>{
    return this.farmCollection.doc<Farm>(id).valueChanges().pipe(
      take(1),
      map(farm => {
        farm.id = id;
        return farm;
      })
    );
  }

  // add farm
  addFarm(farm: Farm){
  //  return this.farmCollection.add(farm);
  return this.farmCollection.doc(farm.farmRegNo).set(farm);
  }

  // update farm
  updateFarm(farm: Farm): Promise<void>{
    return this.farmCollection.doc(farm.id).update({
      farmName: farm.farmName,
      farmRegNo: farm.farmRegNo,
      ownerName: farm.ownerName,
      address: farm.address,
      contactNo: farm.contactNo,
      cattleCount: farm.cattleCount,
      dairyCattleCount: farm.dairyCattleCount});
  }

  // delete farm
  deleteFarm(id: string): Promise<void>{
    return this.farmCollection.doc(id).delete();
  }
}
