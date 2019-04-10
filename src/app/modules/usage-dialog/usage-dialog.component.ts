import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usage-dialog',
  templateUrl: './usage-dialog.component.html',
  styleUrls: ['./usage-dialog.component.scss']
})
export class UsageDialogComponent implements OnInit {
  // source = '../../../assets/peak_time.png';
  source = '/assets/peak_time.png';

  constructor() { }

  ngOnInit() {
  }

}
