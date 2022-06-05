var map = L.map('map').setView([-34.884032, -58.019961], 20);

var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

var anterior;
var actual;
var secciones=[1,2,3,4,5,6]

class Pila {
    elementos = [];
    push = (elemento) => {
        return this.elementos.push(elemento);
    }
    pop = () =>{
        return this.elementos.pop();
    }
    esVacio = ()=>{
        return this.elementos.length = 0;
    }
    vaciar = ()=>{
        this.elementos.length = 0;
    }
    tamanio = ()=>{
        return this.elementos.length;
    }
}

const pila = new Pila();
//let array_sections = [0,0,0,0,0,0];
//puntos de secciones
//primera sección 
var pointList = [
    [-34.884010,-58.020020], 
    [-34.883958,-58.020020],
    [-34.883958, -58.019937],
    [-34.884010, -58.019937]
];
//segunda sección 
let pointList2 = [
    [-34.883958,-58.02002],
    [-34.883958, -58.019937],
    [-34.883860, -58.019937],
    [-34.883860,-58.02002],
];
//tercera sección 
let pointList3 = [
    [-34.883860, -58.019854],
    [-34.883860,-58.02002],
    [-34.883800, -58.02002],
    [-34.883800, -58.019854]
];
//cuarta sección 
let pointList4 = [
    [-34.883860, -58.019937],
    [-34.883860,-58.019854],
    [-34.883910, -58.019854],
    [-34.883910, -58.019937]
];
//quinta sección 
let pointList5 = [
    [-34.883958, -58.019937],
    [-34.883958,-58.019854],
    [-34.883910, -58.019854],
    [-34.883910, -58.019937]
];
//sexta sección 
let pointList6 = [
    [-34.883958, -58.019937],
    [-34.883958,-58.019854],
    [-34.884010, -58.019854],
    [-34.884010, -58.019937]
];
let custome = {
    color: 'red',
    weight: 1,
    opacity: 1,
    smoothFactor: 1
}
var firstpolyline = new L.polygon(pointList,custome);
firstpolyline.addTo(map);
custome.color = 'blue'
firstpolyline = new L.polygon(pointList2, custome);
firstpolyline.addTo(map);
custome.color = 'green'
firstpolyline = new L.polygon(pointList3, custome);
firstpolyline.addTo(map);
custome.color = 'yellow'
firstpolyline = new L.polygon(pointList4, custome);
firstpolyline.addTo(map);
custome.color = 'orange'
firstpolyline = new L.polygon(pointList5, custome);
firstpolyline.addTo(map);
custome.color = 'black'
firstpolyline = new L.polygon(pointList6, custome);
firstpolyline.addTo(map);

var marker, circle,id;
const options = {
    enableHighAccuracy: true,
    maximumAge: 20000,
    timeout: 10000,
};

// Funcion modulado de getPosition
function cheack_area1(latitude, longitude){
    if ((longitude <= (-58.019937))&(longitude >= (-58.02002))){            
        if ((latitude <= (-34.883958))&(latitude >= (-34.884010))){ //Recordatorio para yani: -1 es mayor que -5, las comparaciones en nros negativos van al reves (:<  
            return true;
        }
    }
    return false;
}
function cheack_area2(latitude, longitude){
    if ((longitude <= (-58.019937))&(longitude >= (-58.02002))){
        if ((latitude <= (-34.883860))&(latitude > (-34.883958)))
        {

            return true;
        }
    }
    return false;
}
function cheack_area3(latitude, longitude){
    if ((longitude <= (-58.019854))&(longitude >= (-58.02002))){
        if  ((latitude <= (-34.883800))&(latitude > (-34.883860))){
            return true;
        }
    }
    return false;
}
function cheack_area4(latitude, longitude){
    if ((longitude <= (-58.019854))&(longitude > (-58.019937))){       
        if ((latitude < (-34.883860))&(latitude >= (-34.883910)))  { 
                        
            return true;
        }
    }
    return false;
}
function cheack_area5(latitude, longitude){
    if ((longitude <= (-58.019854))&(longitude > (-58.019937))){
        if ((latitude < (-34.883910))&(latitude > (-34.883958)))
        {
            return true;
        }
    }
    return false;
}
function cheack_area6(latitude, longitude){
    if ((longitude <= (-58.019854))&(longitude > (-58.019937))){
        if ((latitude < (-34.883958))&(latitude > (-34.884010)))
        {
            return true;
        }
    }
    return false;
}

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
function actualizopila(area){
    
    actual=area;
    pila.push(area);

    if(pila.tamanio()==1){
        console.log("tiene tamanio 1, la pila tiene ",pila);
        alert("pila con tamanio 1"+pila.elementos)
        anterior=actual;
    }
    if(pila.tamanio() >=2){
        console.log("tiene tamanio mayor igual a 2");
        if(anterior+1 == actual){
            anterior=actual // luego continuo pusheando
            // estas en la seccion actual
            alert("pila"+pila.elementos)
            // alert("estas en la seccion "+(actual))
            if(pila.tamanio()==6){
                //fin del recorrido
                alert("Fin del recorrido");
                //limpieza de pila.
                pila.vaciar();
            }
        }
        else{
            // se salteo una seccion
            pila.pop();    //desapilo al actual
            
            // alert("Debe ir a la seccion "+(anterior+1));

        }
    }
}

function almacenarEnCache(){
    localStorage.setItem(arraySections,array_sections);
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
    let d = document.getElementById('title');
    let area;
        if  (cheack_area3(latitude,longitude)){
            d.innerHTML = 'area 3';
            area = 3;        
        }
        else {
                if (cheack_area1(latitude,longitude)){ //Recordatorio para yani: -1 es mayor que -5, las comparaciones en nros negativos van al reves (:<  
                    d.innerHTML = 'area 1'; area = 1;
                    
                }
                else{
                    if (cheack_area2(latitude,longitude)){
                        d.innerHTML = 'area 2'; area=2;
                        
                    }
                    else{
                        if (cheack_area4(latitude,longitude)){
                            d.innerHTML = 'area 4';area=4;
                        }
                        else {
                            if(cheack_area5(latitude,longitude)){
                                    d.innerHTML = 'area 5';area=5;
                                
                            }
                            else 
                                if(cheack_area6(latitude,longitude)){    
                                    d.innerHTML = 'area 6';area=6;
                                }
                                else 
                                    d.innerHTML = 'sin area';    
                        }   
                    }    
                }   
            }

        if(area in secciones){
            //  actualizopila(area);
    
            actualizopila(area);
            //  almacenarEnCache();
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
