import { Component, OnInit, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material'
import { Inject } from '@angular/core';
import {FormControl, Validators, FormsModule} from '@angular/forms';

@Component({
  selector: 'app-new-sc-dialog',
  templateUrl: './new-sc-dialog.component.html',
  styleUrls: ['./new-sc-dialog.component.scss']
})
export class NewScDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  sc =  {
    "name": "",
    "location": {
      "room": "",
      "lat": 18.210410,
      "lon": -67.139554
    },
    "hours": "",
    "capacity": 0,
    "availability": false
  };
  ngOnInit() {
    if (this.data) {
      this.sc = this.data
      console.log(this.data);
    }
  }

  capacityFormControl = new FormControl('', [
    Validators.required,
    Validators.min(0),
  ]);

}
