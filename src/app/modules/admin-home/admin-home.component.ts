import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog, MatSnackBar} from '@angular/material';
import { NewScDialogComponent } from  '../new-sc-dialog/new-sc-dialog.component'
import {MatTable} from '@angular/material'
import {MatTableDataSource} from '@angular/material';
import { UsageDialogComponent } from '../usage-dialog/usage-dialog.component'
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})

export class AdminHomeComponent implements OnInit {

  constructor(private dialog:MatDialog, private snackBar: MatSnackBar) { }

  show:boolean;
  error:string;

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit() {
    let snackBarRef2 = this.snackBar.open('New message received.','Ok',{ duration: 3000});
  }
  
  displayedColumns: string[] = ['name', 'location', 'capacity', 'hours', 'availability', 'deleteAction'];
  dataSourceA = [
    {
      "name": "Peceras",
      "location": {
        "room": "II-222",
        "lat": 18.210410,
        "lon": -67.139554
      },
      "hours": "08:00AM - 11:30PM",
      "capacity": 50,
      "availability": false
    },
    {
      "name": "RUMBO Ex",
      "location": {
        "room": "Cel-001",
        "lat": 18.209442,
        "lon": -67.140681
      },
      "hours": "08:00AM - 11:30PM",
      "capacity": 60,
      "availability": true
    },
    {
      "name": "INCADEL",
      "location": {
        "room": "S-101",
        "lat": 18.210219,
        "lon": -67.139935
      },
      "hours": "08:00AM - 11:30PM",
      "capacity": 40,
      "availability": true
    },
    {
      "name": "CREE",
      "location": {
        "room": "Biblioteca",
        "lat": 18.210884,
        "lon": -67.141890
      },
      "hours": "08:00AM - 11:30PM",
      "capacity": 100,
      "availability": true
    }
  ];

  dataSource = new MatTableDataSource(this.dataSourceA);
  getUsageDialog()
  {
    const dialogConfig = new MatDialogConfig();
    

    var dialogRef = this.dialog.open( UsageDialogComponent, dialogConfig);
  }

  openStudyCenterForm(index?)
  {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = true;
    if (index){
      console.log(this.dataSource.data[index]);
         dialogConfig.data = this.dataSource.data[index];
    }
    var dialogRef = this.dialog.open(NewScDialogComponent, dialogConfig);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteStudyCenter(index){
    console.log(index);
    if (index > -1) {
      this.dataSourceA.splice(index, 1);
    }
    this.dataSourceA.slice(index, 1);

    this.table.renderRows();
    // Simple message.
    let snackBarRef = this.snackBar.open('Deleted successfully.','Ok',{ duration: 3000});
  }

   messages = [
    {
        "name": "Peceras",
        "comment": "Hola soy un comentario :|",
        "timestamp": new Date()
    },
    {
        "name": "Peceras",
        "comment": "Hola soy un comentario :)",
        "timestamp": new Date()
    },
    {
        "name": "INCADEL",
        "comment": "Hola soy un comentario",
        "timestamp": new Date()
    },
    {
        "name": "INCADEL",
        "comment": "Hola soy un comentario",
        "timestamp": new Date()
    }
];
}
