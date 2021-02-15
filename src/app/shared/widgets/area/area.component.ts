import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { MainChartService, chartModal } from '../../../service/main-chart.service';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  items$: chartModal[];
  Highcharts: typeof Highcharts = Highcharts;
  cattleData: any[] = [];
  diaryCattleData: any[] = [];
  chartOptions: any;
  categoriesNames: any[] = [];


  constructor(private highchartservice: MainChartService) {
   }

   ngOnInit() {
  
    this.highchartservice.cattles$.subscribe((assets) => {

      this.items$ = assets;
      if (this.items$) {
        this.items$.forEach((element) => {
        //  this.categoriesNames.push(element.farmName);
        //  let categoriesNames :
       // console.log(element.farmName);
        this.cattleData.push(element.cattleCount);
        this.diaryCattleData.push(element.dairyCattleCount);
        this.categoriesNames.push(element.farmName);
        });
        this.getChart();
      }
    });

   }
   getChart() {
    this.chartOptions = {
    /*  xAxis : {
        categories: this.categoriesNames,
      },*/
      series: [
        {
          name : 'cattle',
          data: this.cattleData,
        },
        {
          name : 'Diary cattle',
          data: this.diaryCattleData,
        },
      ],
      chart: {
        type: 'column',
      },
      title: {
        text: 'Amount of Cattles',
      },
      xAxis : {
       categories: this.categoriesNames,
       title: {
        text: 'Farm Name'
      },
      },
      yAxis: {
        title: {
            text: 'Cattle Count'
        },
    },
    };
  }













  /*
  chartOptions: {};
  Highcharts = Highcharts;
 
  constructor() { }

  ngOnInit(): void {
    this.chartOptions =  {
      chart: {
          type: 'area'
      },
      title: {
          text: 'Amount of Cattle in Badulla'
      },
      // subtitle: {
      //     text: 'Source: Wikipedia.org'
      // },
      // xAxis: {
      //     categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
      //     tickmarkPlacement: 'on',
      //     title: {
      //         enabled: false
      //     }
      // },
      // yAxis: {
      //     title: {
      //         text: 'Billions'
      //     },
      //     labels: {
      //         formatter: function () {
      //             return this.value / 1000;
      //         }
      //     }
      // },
      tooltip: {
          split: true,
          valueSuffix: ' millions'
      },
      credits: {
        enabled: false
      },
      exporting: {
        enable: true
      },
      // plotOptions: {
      //     area: {
      //         stacking: 'normal',
      //         lineColor: '#666666',
      //         lineWidth: 1,
      //         marker: {
      //             lineWidth: 1,
      //             lineColor: '#666666'
      //         }
      //     }
      // },
      series: [{
          name: 'Cow',
          data: [502, 635, 809, 947, 1402, 3634, 5268]
      }, {
          name: 'Dog',
          data: [106, 107, 111, 133, 221, 767, 1766]
      }, {
          name: 'Chicken',
          data: [163, 203, 276, 408, 547, 729, 628]
      }, {
          name: 'Goat',
          data: [18, 31, 54, 156, 339, 818, 1201]
      }, {
          name: 'Cat',
          data: [2, 2, 2, 6, 13, 30, 46]
      }]


};*
setTimeout(() => {
  window.dispatchEvent(
    new Event('resize')
  );
}, 300);

}
*/
}
