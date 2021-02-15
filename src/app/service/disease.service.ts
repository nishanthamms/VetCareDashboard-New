import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators'; 
import { Disease } from '../models/disease';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {

  private diseases: Observable<Disease[]>;
  private diseaseCollection: AngularFirestoreCollection<Disease>;

  constructor(private afs: AngularFirestore) {
    // define collection
    this.diseaseCollection = this.afs.collection<Disease>('diseases');
    // Get collection data
    this.diseases = this.diseaseCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // getting all diseases
  getDiseases(): Observable<Disease[]>{
    return this.diseases;
  }

  // getting single disease
  getDisease(id: string): Observable<Disease>{
    return this.diseaseCollection.doc<Disease>(id).valueChanges().pipe(
      take(1),
      map(disease => {
        disease.id = id;
        return disease;
      })
    );
  }

  // add disease
  addDisease(disease: Disease): Promise<DocumentReference>{
    return this.diseaseCollection.add(disease);
  }

  // update disease
  updateDisease(disease: Disease): Promise<void>{
    return this.diseaseCollection.doc(disease.id).update({
      date: disease.date,
      clinicalSigns: disease.clinicalSigns,
      typeOfClinicalSigns: disease.typeOfClinicalSigns,
      diagnosis: disease.diagnosis,
      treatment: disease.treatment,
      remarks: disease.remarks});
  }

  // delete disease
  deleteDisease(id: string): Promise<void>{
    return this.diseaseCollection.doc(id).delete();
  }
}
