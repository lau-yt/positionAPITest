import Points from "./pointAreas.js";
const points = new Points();
class Mapa {
    constructor() {
        this.map = L.map('map',{
            dragging: false,
            scrollWheelZoom: false,
            touchZoom: false,
            zoomControl: false
        }).setView([-34.883919, -58.019961], 19);
        // seteando configuraciones de mapa (ubicacion,tamaño,setteo para hacer print del mapa configurado)
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 19,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
        }).addTo(this.map);
        //
        //creacion de los puntos de secciones y poligonos par avisualizacion de cuadrantes de secciones a visitar
        //
        //configuraciones para cada poligono
        let customProperties = {
            color: 'red',
            weight: 1,
            opacity: 1,
            smoothFactor: 1
        }

        //dibujando poligonos
        var firstpolyline = new L.polygon(points.getPoint(0), customProperties);
        firstpolyline.addTo(this.map);

        for (let i = 1; i < points.lenListPoints; i++) {
            customProperties.color = points.listColors[i];
            firstpolyline = new L.polygon(points.getPoint(i), customProperties);
            firstpolyline.addTo(this.map);
        }
    }

    getMapa(){
        return this.map;
    }

    removeLayer(marker){
        this.map.removeLayer(marker);
    }
}

export default Mapa;