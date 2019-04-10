import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material'
import { Inject } from '@angular/core';

@Component({
  selector: 'app-new-sc-dialog',
  templateUrl: './new-sc-dialog.component.html',
  styleUrls: ['./new-sc-dialog.component.scss']
})
export class NewScDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  sc;
  ngOnInit() {
    this.sc = this.data
    console.log(this.data);
  }

}
