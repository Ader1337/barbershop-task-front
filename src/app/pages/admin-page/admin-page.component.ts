import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { RecordsService } from './../../services/records.service';
import { BarberService } from './../../services/barber.service';
moment.locale('uk')
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  records: any
  barbers: any
  selectedbarberId: any
  constructor(
    private readonly recordsService: RecordsService,
    private readonly barberService: BarberService
  ) { }

  normilizeRecords(records: any) {
    let recordsObj: any = {}
    let recordsArr: any = []
    records.forEach((element: any) => {
      let momentDate = moment(element.date).format('DD.MM.YYYY')
      if (recordsObj[momentDate]?.records){
        recordsObj[momentDate].records.push(element)
      }else {
        recordsObj[momentDate] = {}
        recordsObj[momentDate].records = []
        recordsObj[momentDate].records.push(element)
      }
    });

    for (let date in recordsObj) {
      recordsArr.push({ date: date, records: recordsObj[date].records  } )
    }

    return recordsArr
  }

  getRecords() {
    this.recordsService.getRecords(this.selectedbarberId).subscribe({
      next: (response) => {
        this.records = this.normilizeRecords(response)
        console.log(this.records)
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  ngOnInit(): void {
    this.getBabers()
  }

  onResetFilter() {
    this.selectedbarberId = null
    this.getRecords()
  }

  onSelectbarberFilter(id: any) {
    this.selectedbarberId = id
    this.getRecords()
  }

  getBabers() {
    this.barberService.getBarbers().subscribe({
      next: (barbers) => {
        this.barbers = barbers
        this.getRecords()
      },
      error: (error) => {
        console.log(error)
      }
    }) 
  }
}
