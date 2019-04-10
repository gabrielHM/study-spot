import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concat } from 'rxjs'
import { map } from 'rxjs/operators';
import Stroke from 'ol/style/Stroke';
import { Circle as CircleStyle, Fill, Text } from 'ol/style.js';
import { Style } from 'ol/style';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj.js';
import { Subscription } from 'rxjs';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { LocationDialogComponent } from  '../location-dialog/location-dialog.component';
import { NewMessageDialogComponent } from '../new-message-dialog/new-message-dialog.component';
// var dataJ = require('src/assets/study_centers.json');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  view: View;
  map: Map;
  point: VectorLayer;
  layers =[];

  studyCenters = [
    {
        "name": "Peceras",
        "location":{
            "room":"II-222",
            "lat":18.210410,
            "lon":-67.139554,
            "color": "red"
        },
        "hours":"08:00AM - 11:30PM",
        "capacity":50,
        "availability":false
    },
    {
        "name": "RUMBO Ex",
        "location":{
            "room":"Cel-001",
            "lat":18.209442,
            "lon":-67.140681,
            "color": "blue"
        },
        "hours":"08:00AM - 11:30PM",
        "capacity":60,
        "availability":true
    },
    {
        "name": "INCADEL",
        "location":{
            "room":"S-101",
            "lat":18.210219,
            "lon":-67.139935,
            "color": "green"
        },
        "hours":"08:00AM - 11:30PM",
        "capacity":40,
        "availability":true
    },
    {
        "name": "CREE",
        "location":{
            "room":"Biblioteca",
            "lat":18.210884,
            "lon":-67.141890,
            "color": "turquoise"
        },
        "hours":"08:00AM - 11:30PM",
        "capacity":100,
        "availability":true
    }
];
  constructor(private http: HttpClient, private dialog:MatDialog) { 

  }

  ngOnInit() {
    this.view = new View({
      center: fromLonLat([-67.1425, 18.2110]),
      zoom: 17
    });

    this.map = new Map({
      target: 'map',
      view: this.view,
      loadTilesWhileAnimating: true,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
      ],
    });
    this.resetCenter();
    // this.handleLocation(this.studyCenters[0]);
  }

  openMessageForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(NewMessageDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
        console.log(`Dialog result: ${response}`);
    });
  }

  handleLocation(data) {
    this.map.removeLayer(this.point);
     for (let layer of this.layers) {
      this.map.removeLayer(layer);
    }
    this.layers.length = 0;

    this.point = new VectorLayer({
      source: new VectorSource({
        features: [new Feature({
          geometry: new Point(fromLonLat([data.location.lon, data.location.lat])),
          name: 'Point'
        })]
      }),
      style: new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({ color: data.location.color }),
          stroke: new Stroke({ color: 'black', width: 1 })
        })
      })
    });

    this.map.addLayer(this.point);
    this.view.setCenter(fromLonLat([data.location.lon, data.location.lat]));
  }

  resetCenter(){
    this.map.removeLayer(this.point);
    for (let layer of this.layers) {
      this.map.removeLayer(layer);
    }
    this.layers.length = 0;
    this.view.setCenter(fromLonLat([-67.1425, 18.2110]));
    for (var i = 0; i < this.studyCenters.length; i++){
      var point = new VectorLayer({
        source: new VectorSource({
          features: [new Feature({
            geometry: new Point(fromLonLat([this.studyCenters[i].location.lon, this.studyCenters[i].location.lat])),
            name: 'Point'.concat(i.toString())
          })]
        }),
        style: new Style({
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({ color: this.studyCenters[i].location.color }),
            stroke: new Stroke({ color: 'black', width: 1 })
          })
        })
      });
      this.layers.push(point);
      this.map.addLayer(point);
    }
  }

  paintRoute(destino){
    var myLoc = new VectorLayer({
      source: new VectorSource({
        features: [new Feature({
          geometry: new Point(fromLonLat([-67.1425151, 18.2114618])),
          name: 'Point'
        })]
      }),
      style: new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({ color: "black" }),
          stroke: new Stroke({ color: 'black', width: 1 })
        })
      })
    });
    this.layers.push(myLoc);
    this.calcRoute.push([destino.lon, destino.lat]);
    var polyline = new LineString(this.calcRoute);
    // Coordinates need to be in the view's projection, which is
    // 'EPSG:3857' if nothing else is configured for your ol.View instance
    polyline.transform('EPSG:4326', 'EPSG:3857');

    var feature = new Feature(polyline);
    var source = new VectorSource();

    source.addFeature(feature);
    var ruta = new VectorLayer({
      source: source,
      style : new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 3
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.1)'
        })
      })
    });
    this.layers.push(ruta);

    this.map.addLayer(ruta);
    this.map.addLayer(myLoc);
    this.calcRoute.pop();
  }

  openLocationForm(localizacion)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(LocationDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
      if(response){
        this.paintRoute(localizacion);
      }
      console.log(`Dialog result: ${response}`);
    });
  }

calcRoute = [[-67.1425151,18.2114618],
  [-67.1425151,18.2114618],
  [-67.1421546,18.2113938],
  [-67.1421198,18.2115573],
  [-67.1420837,18.2117271],
  [-67.142066,18.2118104],
  [-67.1419576,18.2117897],
  [-67.14189330000001,18.2117348],
  [-67.14173409999999,18.2116122],
  [-67.1416627,18.211563],
  [-67.141569,18.2115324],
  [-67.1412734,18.2114122],
  [-67.1408569,18.211298],
  [-67.1407612,18.2112776],
  [-67.14078430000001,18.2111939],
  [-67.14075699999999,18.2111692],
  [-67.1407715,18.2111338],
  [-67.1406284,18.210838],
  [-67.14062490000001,18.2108393],
  [-67.1406241,18.2108395],
  [-67.14062319999999,18.2108398],
  [-67.1406224,18.21084],
  [-67.1406215,18.2108402],
  [-67.14062060000001,18.2108405],
  [-67.1406198,18.2108406],
  [-67.14061890000001,18.2108408],
  [-67.140618,18.210841],
  [-67.14061719999999,18.2108411],
  [-67.14061630000001,18.2108413],
  [-67.1406154,18.2108414],
  [-67.1406145,18.2108415],
  [-67.1406136,18.2108415],
  [-67.1406128,18.2108416],
  [-67.1406119,18.2108417],
  [-67.14061100000001,18.2108417],
  [-67.1406101,18.2108417],
  [-67.14060929999999,18.2108417],
  [-67.14060840000001,18.2108417],
  [-67.1406075,18.2108416],
  [-67.1406066,18.2108416],
  [-67.1406058,18.2108415],
  [-67.1406049,18.2108414],
  [-67.140604,18.2108413],
  [-67.14060310000001,18.2108412],
  [-67.1406022,18.2108411],
  [-67.14060139999999,18.2108409],
  [-67.14060050000001,18.2108408],
  [-67.1405996,18.2108406],
  [-67.14059880000001,18.2108404],
  [-67.1405979,18.2108402],
  [-67.140597,18.21084],
  [-67.14059620000001,18.2108397],
  [-67.1405954,18.2108395],
  [-67.14059450000001,18.2108392],
  [-67.1405937,18.2108389],
  [-67.1405929,18.2108386],
  [-67.140592,18.2108383],
  [-67.1405912,18.2108379],
  [-67.14059039999999,18.2108376],
  [-67.1405896,18.2108372],
  [-67.1405888,18.2108368],
  [-67.14058799999999,18.2108365],
  [-67.14058730000001,18.210836],
  [-67.1405865,18.2108356],
  [-67.1405857,18.2108352],
  [-67.140585,18.2108347],
  [-67.14058420000001,18.2108343],
  [-67.14058350000001,18.2108338],
  [-67.1405828,18.2108333],
  [-67.1405821,18.2108328],
  [-67.1405814,18.2108323],
  [-67.1405807,18.2108317],
  [-67.14058,18.2108312],
  [-67.1405793,18.2108306],
  [-67.14057870000001,18.2108301],
  [-67.14057800000001,18.2108295],
  [-67.1405774,18.2108289],
  [-67.14057680000001,18.2108283],
  [-67.1405762,18.2108277],
  [-67.14057560000001,18.2108271],
  [-67.140575,18.2108264],
  [-67.14057440000001,18.2108258],
  [-67.14057390000001,18.2108251],
  [-67.1405733,18.2108245],
  [-67.1405728,18.2108238],
  [-67.1405723,18.2108231],
  [-67.1405718,18.2108224],
  [-67.14057,18.2108198],
  [-67.14056890000001,18.2108177],
  [-67.1405685,18.2108169],
  [-67.1405681,18.2108162],
  [-67.1405678,18.2108154],
  [-67.1405674,18.2108146],
  [-67.1405671,18.2108138],
  [-67.1405668,18.2108131],
  [-67.14056650000001,18.2108123],
  [-67.1405662,18.2108115],
  [-67.1405659,18.2108107],
  [-67.1405657,18.2108098],
  [-67.14056549999999,18.210809],
  [-67.1405652,18.2108082],
  [-67.140565,18.2108074],
  [-67.1405649,18.2108066],
  [-67.1405647,18.2108057],
  [-67.14056460000001,18.2108049],
  [-67.1405644,18.2108041],
  [-67.14056429999999,18.2108032],
  [-67.1405642,18.2108024],
  [-67.14056410000001,18.2108016],
  [-67.14056410000001,18.2108007],
  [-67.140564,18.2107999],
  [-67.140564,18.210799],
  [-67.140564,18.2107982],
  [-67.140564,18.2107974],
  [-67.140564,18.2107966],
  [-67.14056410000001,18.2107958],
  [-67.14056410000001,18.2107949],
  [-67.1405642,18.2107941],
  [-67.14056429999999,18.2107932],
  [-67.1405644,18.2107924],
  [-67.1405645,18.2107916],
  [-67.1405647,18.2107907],
  [-67.1405649,18.2107899],
  [-67.140565,18.2107891],
  [-67.1405652,18.2107882],
  [-67.1405654,18.2107874],
  [-67.1405657,18.2107866],
  [-67.1405659,18.2107858],
  [-67.1405662,18.210785],
  [-67.14056650000001,18.2107842],
  [-67.1405668,18.2107834],
  [-67.1405671,18.2107826],
  [-67.1405674,18.2107818],
  [-67.14056770000001,18.210781],
  [-67.1405681,18.2107803],
  [-67.1405685,18.2107795],
  [-67.14056890000001,18.2107788],
  [-67.1405693,18.210778],
  [-67.1405697,18.2107773],
  [-67.14057010000001,18.2107765],
  [-67.1405706,18.2107758],
  [-67.14057099999999,18.2107751],
  [-67.14057149999999,18.2107744],
  [-67.14057200000001,18.2107737],
  [-67.14057250000001,18.210773],
  [-67.140573,18.2107723],
  [-67.1405736,18.2107716],
  [-67.1405741,18.210771],
  [-67.1405747,18.2107703],
  [-67.1405753,18.2107697],
  [-67.1405759,18.210769],
  [-67.1405765,18.2107684],
  [-67.1405771,18.2107678],
  [-67.14057769999999,18.2107672],
  [-67.1405783,18.2107666],
  [-67.140579,18.210766],
  [-67.1405796,18.2107655],
  [-67.1405803,18.2107649],
  [-67.140581,18.2107644],
  [-67.1405817,18.2107639],
  [-67.1405824,18.2107634],
  [-67.1405831,18.2107629],
  [-67.1405839,18.2107624],
  [-67.1405862,18.2107607],
  [-67.1405128,18.2106243],
  [-67.140462,18.2105287],
  [-67.14051689999999,18.2104242],
  [-67.1405601,18.2104046],
  [-67.1404821,18.210386],
  [-67.1404579,18.2104484],
  [-67.14025270000001,18.2103835],
  [-67.14022989999999,18.2104472],
  [-67.1401843,18.2104752],
  [-67.1400766,18.2104402],
  [-67.1400664,18.210463],
  [-67.1400293,18.210484],
  [-67.14000830000001,18.2104846],
  [-67.1399842,18.2104757],
  [-67.1396191,18.2102717]];

}
