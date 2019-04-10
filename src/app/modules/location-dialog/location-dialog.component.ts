import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.scss']
})
export class LocationDialogComponent implements OnInit {
  answer: boolean;
  constructor() { }

  ngOnInit() {
  }

}
