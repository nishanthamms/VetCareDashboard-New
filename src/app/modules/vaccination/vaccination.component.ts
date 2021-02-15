import { Component, OnInit } from '@angular/core';
import { VaccinationService } from '../../service/vaccination.service';
import { Vaccination } from 'src/app/models/Vaccine';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.css']
})
export class VaccinationComponent implements OnInit {
ctid;
designation;
vaccine: Vaccination = {
  id: '',
  cattleid: '',
  // veterinarianid: '',
  userid: '',
  date: '',
  nameOfVaccine: '',
  purposeOfVaccine: '',
  nextVaccineDate: '',
  reasonOfNextVaccine: '',
  remarks: ''
}
public vaccines: Observable<Vaccination[]>;
  constructor(private vaccinationService: VaccinationService, private activatedRoute: ActivatedRoute,
              private router: Router, private storage: SessionStorageService) { 
      this.ctid = this.activatedRoute.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.vaccines = this.vaccinationService.getVaccines();
    this.designation = this.storage.retrieve('designation');
    if (this.designation !== 'Director' || this.designation === ''){
      this.router.navigate(['page-not-found']);
    }
  }
  ngAfterViewInit(): void{
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id){
      this.vaccinationService.getVaccine(id).subscribe(vaccineData => {
        this.vaccine = vaccineData;
      });
    }
  }

}
