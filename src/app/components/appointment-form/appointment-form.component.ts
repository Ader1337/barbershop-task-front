import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BarberService } from './../../services/barber.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss', '../../app.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  todayDate: any
  dayAfterweek: any
  selectedDate: any
  selectedBarberId: number = -1
  selectedTime: string = ''
  barbersList: any
  constructor(
    private readonly barberService: BarberService,
  ) {
    this.todayDate = moment(this.todayDate).toDate()
    this.dayAfterweek = moment(this.dayAfterweek).add(6, 'day').toDate()
  }

  ngOnInit(): void {
    this.getbarbers()
  }

  getbarbers() {
    this.barberService.getBarbers().subscribe({
      next: (response) => {
        console.log(response)
        this.barbersList = response
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  onSelectBarber(id: number){
    this.selectedBarberId = id
  }

  onSelectTime(time: string) {
    this.selectedTime = time
  }

  onDateChange(date: any) {
    this.selectedDate = date
    console.log(this.selectedDate)
  }


}
