import { Component, OnInit , ViewChild} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { Observable } from 'rxjs';
import { FarmService } from '../../service/farm.service';
import { Farm } from '../../models/Farm';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AgGridAngular } from 'ag-grid-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
@Component({
  selector: 'app-farms',
  templateUrl: './farms.component.html',
  styleUrls: ['./farms.component.css']
})
export class FarmsComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  rowData: any;
  public farms: Observable<Farm[]>
  fid: string;
  term: '';
  designation;
  q: number = 1;
  constructor(private afs: AngularFirestore,private farmService: FarmService, private router: Router, private storage: SessionStorageService) { }

  columnDefs = [
    { field: 'farmName', sortable: true, filter: true },
    { field: 'farmRegNo', sortable: true, filter: true },
    { field: 'ownerName', sortable: true, filter: true },
    { field: 'GSDivision', sortable: true, filter: true },
    { field: 'veterinarianDivision', sortable: true, filter: true },
];
  ngOnInit(): void {
    this.farms = this.farmService.getFarms();
    this.designation = this.storage.retrieve('designation');
    if (this.designation !== 'Director' || this.designation === ''){
      this.router.navigate(['page-not-found']);
    }

    this.afs.collection<any>('farms').valueChanges().subscribe(data => {
      this.rowData = data;
      console.log(data);
    });


  }
  rowClicked(event) {
    // this.eventLog.push(`rowClicked: ${event.data.id}`);
    // console.log(event.data.id);
     this.router.navigateByUrl('/farminfo/'+event.data.farmRegNo);
   }
  gotomore(farmId){
    sessionStorage.setItem('farmId', farmId);
  //  this.router.navigateByUrl('/chat');
  }
}
