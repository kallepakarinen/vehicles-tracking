import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {VehicleService} from '../../services/vehicle.service';
import {ReportPayment} from '../../ReportPayment';
import {ToolbarOptions} from '../../ui/toolbar/toolbar-options';
import {ToolbarService} from '../../ui/toolbar/toolbar.service';
import {ChartData} from '../../ChartData';
import {PaymentService} from '../../services/payment.service';


@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.css']
})
export class AllPaymentsComponent implements OnInit {

  reportPayment: ReportPayment[];
  view: any[] = [700, 300];
  Legend = 'Vuosikulutus';

  chartDataQ: ChartData;
  chartDataAll: ChartData;
  allPaymentsChartData: ChartData[];
  quartalPaymentsChartData1: ChartData[];
  quartalPaymentsChartData2: ChartData[];
  quartalPaymentsChartData3: ChartData[];
  quartalPaymentsChartData4: ChartData[];
  gradient = false;

  colorScheme = {
    domain: ['#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886']
  };

  constructor(private paymentService: PaymentService, private route: ActivatedRoute,
              private vehicleService: VehicleService, private toolbar: ToolbarService) {
    this.reportPayment = [];
    this.allPaymentsChartData = [];
    this.quartalPaymentsChartData1 = [];
    this.quartalPaymentsChartData2 = [];
    this.quartalPaymentsChartData3 = [];
    this.quartalPaymentsChartData4 = [];
  }

  ngOnInit() {
    this.toolbar.setToolbarOptions(new ToolbarOptions(true, 'Raportti', []));

    this.paymentService.paymentReport().subscribe(response => {
      this.reportPayment = response;

      // Set data in chartsArray
      const collectionArrays = [[], [], [], []];
      const yearlySum = [];
      for (let i = 0; i < this.reportPayment.length; i++) {
        // Total
        this.chartDataAll = new ChartData();
        this.chartDataAll.name = this.reportPayment[i].vehicleName;
        this.chartDataAll.value = this.reportPayment[i].yearlySum;
        yearlySum.push(this.chartDataAll);

        // Quartals
        for (let j = 0; j < 4; j++) {
          this.chartDataQ = new ChartData();
          this.chartDataQ.name = this.reportPayment[i].vehicleName;
          this.chartDataQ.value = this.reportPayment[i].quarterlySum[j].Sum;
          collectionArrays[j].push(this.chartDataQ);
        }
      }
      // Using data in charts
      this.allPaymentsChartData = yearlySum;
      this.quartalPaymentsChartData1 = collectionArrays[0];
      this.quartalPaymentsChartData2 = collectionArrays[1];
      this.quartalPaymentsChartData3 = collectionArrays[2];
      this.quartalPaymentsChartData4 = collectionArrays[3];
    });
  }


  onSelect(event) {
    console.log(event);
  }
}


