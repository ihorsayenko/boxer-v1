import { Component, OnInit, OnChanges } from '@angular/core';
declare var google: any;


@Component({
    moduleId: module.id,
    selector: 'contacts',
    templateUrl: '../contacts.html'
})

export class ContactsComponent implements OnInit {

    ngOnInit(): void {
        this.initGoogleMap();
    }

    initGoogleMap(): void {
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;

        let boxerCoordinates = { lat: 49.813486, lng: 24.056196 }

        let map = new google.maps.Map(document.getElementById('map'), {
            scaleControl: true,
            zoom: 16,
            center: boxerCoordinates
        });

        let infowindow = new google.maps.InfoWindow;
        infowindow.setContent('Boxer')

        directionsDisplay.setMap(map);

        let icon = {
            url: "../img/box.png", // url
            scaledSize: new google.maps.Size(60, 55), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(5, 50) // anchor
        };

        let marker = new google.maps.Marker({
            map: map,
            icon: icon,
            position: boxerCoordinates
        });

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });

    }

}