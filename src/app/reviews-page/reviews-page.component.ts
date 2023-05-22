import { Component, OnInit } from '@angular/core';
import Swiper, { Navigation } from 'swiper';

Swiper.use([Navigation]);
@Component({
  selector: 'app-reviews-page',
  templateUrl: './reviews-page.component.html',
  styleUrls: ['./reviews-page.component.scss', '../../app.component.scss']
})
export class ReviewsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
