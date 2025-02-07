import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private map: any;
  private carMarker: any;
  private carIcon = {
    url: "assets/images/car/running.png",
    scaledSize: new google.maps.Size(25, 25)
  };
  private carPosition = {lat: 10.871833, lng: 106.751358};
  private currentIndex = 0;

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    const element = document.getElementById("map");

    this.map = new google.maps.Map(element, {
      center: new google.maps.LatLng(10.871833, 106.751358),
      zoom: 12,
      mapTypeId: "GoogleRoadMaps",
      mapTypeControlOptions: {
        mapTypeIds: ['GoogleRoadMaps']
      }
    });

    this.map.mapTypes.set("GoogleRoadMaps", new google.maps.ImageMapType({
      getTileUrl: (coord: any, zoom: any) => {
        return `assets/GoogleMapVietNam/Zoom${zoom}/Map/${coord.x}/${coord.y}.png`;
      },
      tileSize: new google.maps.Size(256, 256),
      name: "GoogleRoadMaps",
      maxZoom: 13,
      minZoom: 1
    }));

    this.addCarMarker();
  }

  addCarMarker() {
    this.carMarker = new google.maps.Marker({
      position: this.carPosition,
      map: this.map,
      icon: this.carIcon
    });

    this.moveCar();
  }

  moveCar() {
    setInterval(() => {
      this.carPosition = {
        lat: this.carPosition.lat + 0.001,
        lng: this.carPosition.lng + 0.0001
      };
      this.carMarker.setPosition(new google.maps.LatLng(this.carPosition.lat, this.carPosition.lng));
    }, 1000);
  }

}
