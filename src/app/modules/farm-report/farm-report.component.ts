import { Component, ViewChild, ElementRef , OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FarmService } from '../../service/farm.service';
import { CattleService} from '../../service/cattle.service';
import { Farm } from '../../models/Farm';
import { Cattle } from '../../models/Cattle';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-farm-report',
  templateUrl: './farm-report.component.html',
  styleUrls: ['./farm-report.component.css']
})
export class FarmReportComponent implements OnInit {

  title = 'html-to-pdf';
  public farms: Observable<Farm[]>;
  public cattles: Observable<Cattle[]>;
  fid: string;
  date;
  latest_date;
  designation;
  constructor(private farmService: FarmService, private datePipe: DatePipe,
              private cattleService: CattleService, private storage: SessionStorageService, public router: Router) {
    // this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }


  generatePDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 200;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 6;
      pdf.addImage(contentDataURL, 'PNG', 6, position, imgWidth, imgHeight);
      pdf.save('newPDF.pdf');
    });
  }

  ngOnInit(): void {
    this.farms = this.farmService.getFarms();
    this.cattles = this.cattleService.getCattles();
    this.date = new Date();
   // this.date = this.date.format('yyyy-mm-dd');
  //  this.date = this.date.split('G')[0];
    this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    // this.latest_date =  this.latest_date.split('G')[0]; 
   // console.log(latest_date);

    this.designation = this.storage.retrieve('designation');
    if (this.designation !== 'Director' || this.designation === ''){
      this.router.navigate(['page-not-found']);
    }
  }



}
