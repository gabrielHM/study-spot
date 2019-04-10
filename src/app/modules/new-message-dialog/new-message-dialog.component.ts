import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-message-dialog',
  templateUrl: './new-message-dialog.component.html',
  styleUrls: ['./new-message-dialog.component.scss']
})
export class NewMessageDialogComponent implements OnInit {

  constructor() { }
  currentDate = new Date();
  ngOnInit() {
  }

}
