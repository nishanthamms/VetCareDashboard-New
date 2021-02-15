import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Vaccination } from '../models/Vaccine';

@Injectable({
  providedIn: 'root'
})
export class VaccinationService {

  private vaccines: Observable<Vaccination[]>;
  private vaccineCollection: AngularFirestoreCollection<Vaccination>;

  constructor(private afs: AngularFirestore) {
    // define collection
    this.vaccineCollection = this.afs.collection<Vaccination>('vaccines');
    // Get collection data
    this.vaccines = this.vaccineCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // getting all vaccine
  getVaccines(): Observable<Vaccination[]>{
    return this.vaccines;
  }

  // getting single vaccine
  getVaccine(id: string): Observable<Vaccination>{
    return this.vaccineCollection.doc<Vaccination>(id).valueChanges().pipe(
      take(1),
      map(vaccine => {
        vaccine.id = id;
        return vaccine;
      })
    );
  }

  // add vaccine
  addVaccine(vaccine: Vaccination): Promise<DocumentReference>{
    return this.vaccineCollection.add(vaccine);
  }

  // update vaccine
  updateVaccine(vaccine: Vaccination): Promise<void>{
    return this.vaccineCollection.doc(vaccine.id).update({
      date: vaccine.date,
      nameOfVaccine: vaccine.nameOfVaccine,
      purposeOfVaccine: vaccine.purposeOfVaccine,
      nextVaccineDate: vaccine.nextVaccineDate,
      reasonOfNextVaccine: vaccine.reasonOfNextVaccine,
      remarks: vaccine.remarks});
  }

  // delete vaccine
  deleteVaccine(id: string): Promise<void>{
    return this.vaccineCollection.doc(id).delete();
  }

}
