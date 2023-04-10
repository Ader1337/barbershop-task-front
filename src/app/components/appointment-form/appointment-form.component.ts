import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BarberService } from './../../services/barber.service';
import { AuthService } from './../../services/auth.service';
import { RecordsService } from './../../services/records.service';
moment.locale('uk')

interface IRecordForm {
  date: any,
  time: string,
  fullDate: any,
  /* userId: string, */
  barberId: string,
  formattedDate: string,
  name: string,
  phone: string,
  barberName: string
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
  selectedBarber: any
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

  getFullDate(date: any, time: string) {
    let dateFormat = moment(date).format('DD/MM/YYYY')
    let dateParts: any = dateFormat.split('/')
    let timeParts: any = time.split(':')
    let date2 = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0], timeParts[0], timeParts[1])
    return date2 
  }

  getDateDiff(fullDate: any) {
    return moment(fullDate).fromNow()
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  cancelRecord(recordId: any) {
    this.isRunLoader = true
    this.recordsService.deleteRecord({ _id: recordId }).subscribe({
      next: (response) => {
        this.userRecord = null
        this.isRunLoader = false
        this.ngOnInit()
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
    if (!this.selectedBarber || !this.selectedDate)
      return
    this.recordsService.getAvailableTime({ barberId: this.selectedBarber._id, formattedDate: moment(this.selectedDate).format('DD.MM.YYYY') }).subscribe({
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


  onSelectBarber(barber: any) {
    this.selectedBarber = barber
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
    if (!this.selectedDate || !this.selectedTime || !this.selectedBarber)
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
      fullDate: this.getFullDate(this.selectedDate, this.selectedTime),
      formattedDate: moment(this.selectedDate).format('DD.MM.YYYY'),
      barberId: this.selectedBarber._id,
      barberName: this.selectedBarber.name
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
