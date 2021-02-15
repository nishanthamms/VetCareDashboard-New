import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Cattle } from '../models/Cattle';

@Injectable({
  providedIn: 'root'
})
export class CattleService {

  private cattles: Observable<Cattle[]>;
  private cattleCollection: AngularFirestoreCollection<Cattle>;

  constructor(private afs: AngularFirestore) {
    // define collection
    this.cattleCollection = this.afs.collection<Cattle>('cattles');
    // Get collection data
    this.cattles = this.cattleCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // getting all cattle
  getCattles(): Observable<Cattle[]>{
    return this.cattles;
  }

  // getting single cattle
  getCattle(id: string): Observable<Cattle>{
    return this.cattleCollection.doc<Cattle>(id).valueChanges().pipe(
      take(1),
      map(cattle => {
        cattle.id = id;
        return cattle;
      })
    );
  }


  // add cattle
  addCattle(cattle: Cattle){
   // console.log(cattle.cattleImg);
    return this.cattleCollection.doc(cattle.cattleTagId).set(cattle);
  }

  // update cattle
  updateCattle(cattle: Cattle): Promise<void>{
    return this.cattleCollection.doc(cattle.id).update({
      cattleTagId: cattle.cattleTagId,
      cattleBreed: cattle.cattleBreed,
      cattleDOB: cattle.cattleDOB,
      specialFeature: cattle.specialFeature,
      sex: cattle.sex,
      noLactation: cattle.noLactation,
      birthWeg: cattle.birthWeg,
      breedingWeg: cattle.breedingWeg,
      cattleWeaningWeg: cattle.cattleWeaningWeg,
      avgPreWeg: cattle.avgPreWeg,
      avgPostWeg: cattle.avgPostWeg,
      lastCalvingDate: cattle.lastCalvingDate,
      cattleImg: cattle.cattleImg
  });
  }

  // delete cattle
  deleteCattle(id: string): Promise<void>{
    return this.cattleCollection.doc(id).delete();
  }


  // image upload

  

}
