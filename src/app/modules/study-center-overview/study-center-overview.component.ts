import { Component, OnInit } from '@angular/core';
import { NewReviewDialogComponent } from '../new-review-dialog/new-review-dialog.component';
import { SpeedTestDialogComponent } from '../speed-test-dialog/speed-test-dialog.component';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-study-center-overview',
    templateUrl: './study-center-overview.component.html',
    styleUrls: ['./study-center-overview.component.scss']
})
export class StudyCenterOverviewComponent implements OnInit {

    constructor(private dialog: MatDialog, private route: ActivatedRoute) { }
    studyCenter;
    isAdmin = false;
    imgPath = '.../../../assets/users_vs_time.png';
    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            this.studyCenter = this.studyCenters[0];
            this.isAdmin = (params.keys.length !=0)
        });
    }
    openSpeedTest() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;

        const dialogRef = this.dialog.open(SpeedTestDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(response => {
            console.log(`Dialog result: ${response}`);
        });
    }

    openReviewForm() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;

        const dialogRef = this.dialog.open(NewReviewDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(response => {
            console.log(`Dialog result: ${response}`);
        });
    }
    studyCenters = [
        {
            "name": "Peceras",
            "location": {
                "room": "II-222",
                "lat": 18.210410,
                "lon": -67.139554,
                "color": "red"
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
                "lon": -67.140681,
                "color": "blue"
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
                "lon": -67.139935,
                "color": "green"
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
                "lon": -67.141890,
                "color": "turquoise"
            },
            "hours": "08:00AM - 11:30PM",
            "capacity": 100,
            "availability": true
        }
    ];
    reviews = [
        {
            "name": "Peceras",
            "rating": 3,
            "comment": "Hola soy un comentario :|",
            "timestamp": new Date()
        },
        {
            "name": "Peceras",
            "rating": 5,
            "comment": "Hola soy un comentario :)",
            "timestamp": new Date()
        },
        {
            "name": "INCADEL",
            "rating": 5,
            "comment": "Hola soy un comentario",
            "timestamp": new Date()
        },
        {
            "name": "INCADEL",
            "rating": 4,
            "comment": "Hola soy un comentario",
            "timestamp": new Date()
        }
    ];
}
