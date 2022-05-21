var map = L.map('map').setView([-34.884032, -58.019961], 20);

var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);
//puntos de secciones
//primera sección 
var pointList = [
    [-34.883993,-58.02002], 
    [-34.883958,-58.02002],
    [-34.883958, -58.019937],
    [-34.883993, -58.019937]
];
//segunda sección 
let pointList2 = [
    [-34.883958,-58.02002],
    [-34.883958, -58.019937],
    [-34.883915, -58.019937],
    [-34.883915,-58.02002],
];
var firstpolyline = new L.polygon(pointList, {
    color: 'red',
    weight: 1,
    opacity: 1,
    smoothFactor: 1
});
firstpolyline.addTo(map);
firstpolyline = new L.polygon(pointList2, {
    color: 'blue',
    weight: 1,
    opacity: 1,
    smoothFactor: 1
});
firstpolyline.addTo(map);
var marker, circle,id;
const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 50000
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
    //if (circle) map.removeLayer(circle);
}
/**
 * (x1,y1) (x2,y2) par de coord continuas de la sección; formato [lat,lng] -> [y,x]
 * lngC longitud actual tomada por el gps
 * Retorna el valor de la recta tangente por 2 puntos de la sección (latitud)
 */
function calculateLineTg(x1,y1,x2,y2,lngC,latC){
    let m = (y2 - y1) / (x2 - x1); //    [-34.884032,-58.019961], [-34.883993,-58.020022],
    let y = (m * (lngC-x1)) + (y1); //ec recta por 2 puntos, x
    let x = ((latC - y1)/ m) + x1;
    return {y,x}; //retorna la latitud calculada
}
function section_x(){

}
/**
 * 
 * @param {GeolocationPosition} position 
 */
function getPosition(position){
    const { latitude, longitude} = position.coords; //lat es y, long es x  [lat,lng] -> [y,x]
    var altitude = position.coords.altitude; 
    var heading = position.coords.heading;
    var speed = position.coords.speed;
    var accuracy = position.coords.accuracy;
    
    if((longitude <= (-58.019937))&(longitude >= (-58.02002))){
        if ((latitude <= (-34.883915))&(latitude >= (-34.883958))) //Recordatorio para yani: -1 es mayor que -5, las comparaciones en nros negativos van al reves (:<  
            alert('estoy en el area 2');
        else {
            if ((latitude < (-34.883958))&(latitude >= (-34.883993)))
                alert('estoy en el area 1');
        }
    }
    removeAfter();
    // Necesito que muestre mi ubicacion en el mapa
    marker = L.marker([latitude, longitude]).addTo(map)
          //  .bindPopup("Estas en la posición con latitud "+latitude+" y longitud "+longitude+". Con precisión de "+accuracy+" metros");
    //circle = L.circle([latitude,longitude],{radius:accuracy});
    //var group = L.featureGroup([marker,circle]).addTo(map);
    //map.setView([latitude,longitude],13);
    //map.fitBounds(group.getBounds()); //Sets a map view that contains the given geographical bounds with the maximum zoom level possible.
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
