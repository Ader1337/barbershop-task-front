import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BarberService } from './../../services/barber.service';
import { AuthService } from './../../services/auth.service';
import { RecordsService } from './../../services/records.service';

interface IRecordForm {
  date: any,
  time: string,
  /* userId: string, */
  barberId: string,
  formattedDate: string,
  name: string,
  phone: string
}

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss', '../../app.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  isRunLoader: boolean = true
  userForm: any = {
    name: '',
    phone: ''
  } 
  error: string = ''
  todayDate: any
  userInfo: any
  dayAfterweek: any
  selectedDate: any
  selectedBarberId: any
  selectedTime: string = ''
  barbersList: any
  availableTimes: any
  userRecord: any
  constructor(
    private readonly barberService: BarberService,
    private readonly authService: AuthService,
    private readonly recordsService: RecordsService
  ) {
    this.todayDate = moment(this.todayDate).toDate()
    this.dayAfterweek = moment(this.dayAfterweek).add(6, 'day').toDate()
  }

  ngOnInit(): void {
    this.isRunLoader = true
    this.getUserRecord()
  }

  getbarbers() {
    this.barberService.getBarbers().subscribe({
      next: (response) => {
        this.barbersList = response
        this.isRunLoader = false
      },
      error: (err) => {
        this.isRunLoader = false
        console.error(err)
      }
    })
  }

  getDateDiff() {
    let date = moment(this.userRecord.record.date).format('DD/MM/YYYY')
    let dateParts: any = date.split('/')
    let timeParts: any = this.userRecord.record.time.split(':')
    moment.locale('uk')
    let date2 = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0], timeParts[0], timeParts[1])
    return moment(date2).fromNow()
  }

  cancelRecord(recordId: any) {
    this.isRunLoader = true
    this.recordsService.deleteRecord({ _id: recordId }).subscribe({
      next: (response) => {
        this.userRecord = null
        this.isRunLoader = false
      },
      error: (err) => {
        this.isRunLoader = false
        console.error(err)
      }
    })
  }

  getUserRecord() {
    this.recordsService.getUserRecord({ from: moment(this.todayDate).subtract(1, 'day').toDate(), to: moment(this.dayAfterweek).add(1, 'day').toDate()  }).subscribe({
      next: (record) => {
        if (record && record.record.formattedDate == moment().format('DD.MM.YYYY')) {
          let crrHour = moment().format('HH')
          console.log(+crrHour, +record.record.time.split(':')[0])
          if (+crrHour < +record.record.time.split(':')[0])
            this.userRecord = record
        } else {
          this.userRecord = record
        }
        if (!this.userRecord)
          this.getbarbers()
        else
          this.isRunLoader = false
      },
      error: (err) => {
        console.error(err)
        this.isRunLoader = false
      }
    })
  }

  getAvailableTime() {
    if (!this.selectedBarberId || !this.selectedDate)
      return
    this.recordsService.getAvailableTime({ barberId: this.selectedBarberId, formattedDate: moment(this.selectedDate).format('DD.MM.YYYY') }).subscribe({
      next: (response) => {
        let targetArr = []
        if (moment(this.selectedDate).format('DD.MM.YYYY') == moment().format('DD.MM.YYYY')) {
          let crrHour = moment().format('HH')
          response.availableTimes.forEach((time: string) => {
            if (+crrHour < +time.split(':')[0])
              targetArr.push(time)
          });
        } else {
          targetArr = response.availableTimes
        }
        console.log(targetArr)
        this.availableTimes = targetArr
      },
      error: (err) => {
        console.error(err)
      }
    })
  }


  onSelectBarber(id: number) {
    this.selectedBarberId = id
    this.getAvailableTime()
  }

  onSelectTime(time: string) {
    this.selectedTime = time
  }

  onDateChange(date: any) {
    this.selectedDate = date
    this.getAvailableTime()

  }

  onAddRecord() {
    if (!this.selectedDate || !this.selectedTime || !this.selectedBarberId)
      return

    this.error = ''

    if (!this.userForm.phone || !this.userForm.name){
      this.error = 'Усі поля повинні бути заповненими'
      return
    }

    this.isRunLoader = true

    let body: IRecordForm = {
      date: this.selectedDate,
      time: this.selectedTime,
      name: this.userForm.name,
      phone: this.userForm.phone,
      /*  userId: this.userInfo._id, */
      formattedDate: moment(this.selectedDate).format('DD.MM.YYYY'),
      barberId: this.selectedBarberId
    }

    this.recordsService.addRecord(body).subscribe({
      next: (response) => {
        this.ngOnInit()
      },
      error: (error) => {
        this.isRunLoader = false
        console.error(error)
      }
    })
  }
}
