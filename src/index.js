var map = L.map('map').setView([-34.908023, -57.945027], 20);

var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

//var pointA = new L.LatLng(-34.9074347, -57.9447564);
//var pointB = new L.LatLng(-34.9074503, -57.944866);
var pointList = [
    [-34.90742641,-57.944758],
    //[-34.90742641,-57.944799],
    //[-34.90744659,-57.94480888],
   // [-34.90745952,-57.94484454],
   // [-34.90746032,-57.94482766],
    //[-34.90741351,-57.94474911],
    [-34.9074489,-57.9448633],
    [-34.907453, -57.944804],
    [-34.907477, -57.944755],
    [-34.907502, -57.944722],
    [-34.907486, -57.944701],
    //[-34.907468, -57.944694],
    //[-34.90745334,-57.94471979],
    //[-34.90747057,-57.9447937],
    //[-34.90739901,-57.94475907]
];

var firstpolyline = new L.polygon(pointList, {
    color: 'red',
    weight: 1,
    opacity: 1,
    smoothFactor: 1
});
firstpolyline.addTo(map);

var marker, circle,id;
const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
};
document.getElementById("button").addEventListener('click', ()=>{
    navigator.geolocation.clearWatch(id);
    console.log('congratulations, you deleted the id (: the end');
    }    
);
document.getElementById("buttonStar").addEventListener('click', getLocation);
function getLocation(){
    if (navigator.geolocation){
        //setInterval(()=>{  navigator.geolocation.getCurrentPosition(getPosition,getPosError,options);
            id = navigator.geolocation.watchPosition(getPosition,getPosError,options);
            console.log(id);
        //},5000);
    }
    else{
        alert('geolocation is not suuported!');
    }
}
function removeAfter(){
    if (marker) map.removeLayer(marker);
    if (circle) map.removeLayer(circle);
}
/**
 * 
 * @param {GeolocationPosition} position 
 */
function getPosition(position){
    const { latitude, longitude} = position.coords;
    var altitude = position.coords.altitude; 
    var heading = position.coords.heading;
    var speed = position.coords.speed;
    var accuracy = position.coords.accuracy;
    removeAfter();
    // Show a map centered at latitude / longitude. -- Necesito que muestre mi ubicacion en el mapa
    marker = L.marker([latitude, longitude]).addTo(map)
            .bindPopup("Estas en la posición con latitud "+latitude+" y longitud "+longitude+". Con precisión de "+accuracy+" metros");
    circle = L.circle([latitude,longitude],{radius:accuracy});
    var group = L.featureGroup([marker,circle]).addTo(map);
    //map.setView([latitude,longitude],13);
    map.fitBounds(group.getBounds()); //Sets a map view that contains the given geographical bounds with the maximum zoom level possible.
    let msg = 'Coordinate: Latitud: '+latitude+' Longitud: '+longitude+' Precision (m): '+accuracy+' Altitud: '+altitude+' Orientacion (grados): '+heading+' velocidad: '+speed;
    console.log(msg);
}
/**
 * 
 * @param {GeolocationPositionError} error 
 */
function getPosError(error){
    console.warn(error.message); let mensaje;
    switch(error.code){
        case error.PERMISSION_DENIED: mensaje = "No hay permiso para obtener la posicion"; break;
        case error.POSITION_UNAVAILABLE: mensaje = "Posicion actual no disponible"; break;
        case error.TIMEOUT: mensaje = "No se pudo obtener la posicion en un tiempo"; break;
        default: mensaje = "Error desconocido"; break;
    }
    alert(mensaje);
}
