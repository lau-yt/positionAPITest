export var map = L.map('map').setView([-34.883919, -58.019961], 19);
import { list_points } from "./pointAreas.js";

// seteando configuraciones de mapa (ubicacion,tamaño,setteo para hacer print del mapa configurado)
var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 19,
    // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    //     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(map);


//creacion de los puntos de secciones y poligonos par avisualizacion de cuadrantes de secciones a visitar
//configuraciones para cada poligono
let custome = {
    color: 'red',
    weight: 1,
    opacity: 1,
    smoothFactor: 1
}
let colors = ['red','blue','green','yellow','orange','black','black'];

var firstpolyline = new L.polygon(list_points[0],custome);
firstpolyline.addTo(map);
console.log(custome.color);
for (let i = 1; i < list_points.length; i++) {
    custome.color = colors[i];
    console.log(custome.color);
    firstpolyline = new L.polygon(list_points[i], custome);
    firstpolyline.addTo(map);
}