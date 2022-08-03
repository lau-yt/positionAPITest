var map = L.map('map').setView([-34.884032, -58.019961], 20);

var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);
class Pila {
    elementos = [];
    top = ()=> {
        return this.elementos[this.elementos.length-1];
    }
    push = (elemento) => {
        return this.elementos.push(elemento);
    }
    pop = () =>{
        return this.elementos.pop();
    }
    esVacio = ()=>{
        return (this.elementos.length == 0);
    }
    vaciar = ()=>{
        this.elementos.length == 0;
    }
    tamanio = ()=>{
        return this.elementos.length;
    }
    toString = ()=>{
        var char="";
        for(let i=0;i<this.elementos.length;i++){
            char=char+this.elementos[i].numero+this.elementos[i].visitado;
        }
        return char;
    }
}

var pila = new Pila();
var pilaAux = new Pila();

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

function cheack_area1(latitude, longitude){
    if ((longitude <= (-58.019937))&(longitude >= (-58.02002))){            
        if ((latitude <= (-34.883958))&(latitude >= (-34.884010))){ 
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
}
function areaFueVisitada(stand){
    let aux; let ok = false; let i=0;
    while (i<pila.tamanio()){
        aux = pila.pop();
        pilaAux.push(aux);
        i++;
        if ((aux.numero == stand)&&(aux.visitado == true)) {
            ok = true; 
            break;
        } 
    }
    pila = pilaAux;
    return ok;
}

function actualizopila(area){
    var stand = {
        numero:0,
        visitado:false
    }
    let areaEstoy = area;
    if (pila.esVacio()) { //caso del historial vacio
        if (areaEstoy == 1){
            console.log('Estas en el area 1');
            stand.numero = area;
            stand.visitado = false;
            pila.push(stand);
            // dibujar el stand 1
            document.getElementById("mostrarStand").style.visibility = "visible ";
            var logo = document.getElementById('rm');
            logo.src = "./static/img/stands/s"+area+".png";
            dibujar(area);
        }
        else{
            console.log('dirigirse al area 1 para iniciar'); 
        }
    }else{ //el historial tiene contenido
        if( pila.top().numero == area ){  
           console.log('No hago nada porque esta mismo stand q visita '+area); 
        }
        else{ //es un area diferente
            if (pila.top().visitado == false){ //NO fue visitado
                if ((pila.top().numero < area )&&(((pila.top().numero)+1) == area )){ 
                    console.log('Estas en el area '+area);
                    stand.numero = area;
                    stand.visitado = false;
                    pila.push(stand);
                    document.getElementById("mostrarStand").style.visibility = "visible ";
                    var logo = document.getElementById('rm');
                    logo.src = "./static/img/stands/s"+area+".png";
                    dibujar(area);
                }    
                else { 
                    if ((pila.top().numero > area)&&(((pila.top().numero)-1)==area)){ 
                        console.log('Ya ha visitado este stand ( stand nro.',area,' )');
                        stand.numero = area;
                        stand.visitado = true;
                        pila.push(stand);
                        // dibujar el stand
                        // document.getElementById("mostrarStand").style.visibility = "visible ";
                        // document.getElementById("mostrarStand").style.backgroundColor = "red";
                        // var logo = document.getElementById('rm');
                        // logo.src = "../static/img/stand/s"+area+".png";
                        // dibujar(area);  

                    }
                    else console.log('Error de sensado!!!!');
                }
            } 
            else {
                if (areaFueVisitada(area)){          
                    console.log('Ya ha visitado este stand ( stand nro.',area,' )');
                    stand.numero = area;
                    stand.visitado = true;
                    pila.push(stand); 
                    //redibujar stand
                    // document.getElementById("mostrarStand").style.visibility = "visible ";
                    // document.getElementById("mostrarStand").style.backgroundColor = "red";
                    // var logo = document.getElementById('rm');
                    // logo.src = "../static/img/stand/s"+area+".png";
                    // dibujar(area);
                }else{ 
                    if ((pila.pop().visitado == false)&&(pila.pop().numero < area)&&(((pila.top().numero)+1) == area )){
                        console.log('Estas en el area ',area);
                        stand.numero = area;
                        stand.visitado = false;
                        pila.push(stand);
                        //redibujar stand
                        // document.getElementById("mostrarStand").style.visibility = "visible ";
                        // document.getElementById("mostrarStand").style.backgroundColor = "red";
                        // var logo = document.getElementById('rm');
                        // logo.src = "../static/img/stand/s"+area+".png";
                        // dibujar(area);
                    } else {
                       console.log('error de sensado');
                    }
                }
            }
            
        }

    }
    
}

function createButton(area,nroBoton) {
    var punto1 = document.createElement("input");
    var label1 = document.createElement("label");
    var agregar = document.getElementsByClassName("altura_cont"+area);
    agregar.id="area";

    punto1.type = "checkbox";
    punto1.classList.add("hidden");
    punto1.id = "hotspots" + area + "_" + nroBoton;

    agregar[0].appendChild(punto1);

    label1.htmlFor = "hotspots" + area + "_" + nroBoton;
    label1.id = "b" + area + "_" + nroBoton;
    label1.classList.add("highlight");
    label1.classList.add("absolute");

    agregar[0].appendChild(label1);
}

function dibujar(area){
    if( area==1 ){

        // createButton(area,1);
        // createButton(area,2);
        mostrarPuntos(area,1);
        mostrarPuntos(area,2);
        
    }
    if( area==2 ){
        // deleteAllChildren();
        mostrarPuntos(area,1);
        // createButton(area,1);
    }
    if( area==3 ){
        deleteAllChildren();
        createButton(area,1);
        createButton(area,2);
        createButton(area,3);
    }
    if( area==4 ){
        deleteAllChildren();
        createButton(area,1);
        createButton(area,2);
        createButton(area,3);
    }
    if( area==5 ){
        deleteAllChildren();
        createButton(area,1);
        createButton(area,2);

    }
    if( area==6 ){
        deleteAllChildren();
        createButton(area,1);

    }

}
function mostrarPuntos(area, nroBoton){
    var punto1 = document.getElementById("b" + area + "_" + nroBoton);
    punto1.style.visibility='visible';
    if(area==1){
        //esconder los puntos del stand 2
        esconderPuntos(2,1);
        //esconder los puntos del stand 3
        esconderPuntos(3,1);
        esconderPuntos(3,2);
        esconderPuntos(3,3);
        //esconder los puntos del stand 4
        esconderPuntos(4,1);
        esconderPuntos(4,2);
        esconderPuntos(4,3);
        //esconder los puntos del stand 5
        esconderPuntos(5,1);
        esconderPuntos(5,2);
        //esconder los puntos del stand 6
        esconderPuntos(6,1);
    }
    if(area==2){
        // esconder los puntos del stand 1
        esconderPuntos(1,1);
        esconderPuntos(1,2);
        //esconder los puntos del stand 3
        esconderPuntos(3,1);
        esconderPuntos(3,2);
        esconderPuntos(3,3);
        //esconder los puntos del stand 4
        esconderPuntos(4,1);
        esconderPuntos(4,2);
        esconderPuntos(4,3);
        //esconder los puntos del stand 5
        esconderPuntos(5,1);
        esconderPuntos(5,2);
        //esconder los puntos del stand 6
        esconderPuntos(6,1);
    }
    if(area==3){

        // esconder los puntos del stand 1
        esconderPuntos(1,1);
        esconderPuntos(1,2);
        //esconder los puntos del stand 2
        esconderPuntos(2,1);
        //esconder los puntos del stand 4
        esconderPuntos(4,1);
        esconderPuntos(4,2);
        esconderPuntos(4,3);
        //esconder los puntos del stand 5
        esconderPuntos(5,1);
        esconderPuntos(5,2);
        //esconder los puntos del stand 6
        esconderPuntos(6,1);

    }
    if(area==4){
        // esconder los puntos del stand 1
        esconderPuntos(1,1);
        esconderPuntos(1,2);
        //esconder los puntos del stand 2
        esconderPuntos(2,1);
        //esconder los puntos del stand 3
        esconderPuntos(3,1);
        esconderPuntos(3,2);
        esconderPuntos(3,3);
        //esconder los puntos del stand 5
        esconderPuntos(5,1);
        esconderPuntos(5,2);
        //esconder los puntos del stand 6
        esconderPuntos(6,1);

    }
    if(area==5){
        // esconder los puntos del stand 1
        esconderPuntos(1,1);
        esconderPuntos(1,2);
        //esconder los puntos del stand 2
        esconderPuntos(2,1);
        //esconder los puntos del stand 3
        esconderPuntos(3,1);
        esconderPuntos(3,2);
        esconderPuntos(3,3);
        //esconder los puntos del stand 4
        esconderPuntos(4,1);
        esconderPuntos(4,2);
        esconderPuntos(4,3);
        //esconder los puntos del stand 6
        esconderPuntos(6,1);

    }
    if(area==6){
        // esconder los puntos del stand 1
        esconderPuntos(1,1);
        esconderPuntos(1,2);
        //esconder los puntos del stand 2
        esconderPuntos(2,1);
        //esconder los puntos del stand 3
        esconderPuntos(3,1);
        esconderPuntos(3,2);
        esconderPuntos(3,3);
        //esconder los puntos del stand 4
        esconderPuntos(4,1);
        esconderPuntos(4,2);
        esconderPuntos(4,3);
        //esconder los puntos del stand 5
        esconderPuntos(5,1);
        esconderPuntos(5,2);

    }


        // // esconder los puntos del stand 1
        // esconderPuntos(1,1);
        // esconderPuntos(1,2);
        // //esconder los puntos del stand 2
        // esconderPuntos(2,1);
        // //esconder los puntos del stand 3
        // esconderPuntos(3,1);
        // esconderPuntos(3,2);
        // esconderPuntos(3,3);
        // //esconder los puntos del stand 4
        // esconderPuntos(4,1);
        // esconderPuntos(4,2);
        // esconderPuntos(4,3);
        // //esconder los puntos del stand 5
        // esconderPuntos(5,1);
        // esconderPuntos(5,2);
        // //esconder los puntos del stand 6
        // esconderPuntos(6,1);

}

function esconderPuntos(area,nroBoton){
    var puntos = document.getElementById("b" + area + "_" + nroBoton);
    puntos.style.visibility='hidden';


}

function deleteAllChildren(){
    var aux = document.getElementsByClassName("altura_cont");
    // aux.innerHTML="";
    // var hijo = aux.hasChildNodes();
    console.log("hey estoy en la funcion eliminar")
    console.log(aux[0])
    while (aux.selectedNode.selectedNode.firstChild.length >0) {
    // while (aux.selectedNode.children.length > 0) {
        aux.removeChild(aux.firstChild);
        console.log(aux)

        // hijo = aux.hasChildNodes();
    }
    // while (elemBefore.hasChildNodes())
    // elemBefore.removeChild(elemBefore.firstChild);
}


/**
 * Funcion modulado de getPosition
 * @param {GeolocationPosition} position 
 */
function getPosition(position){
    const { latitude, longitude} = position.coords; 
    let area;
        if  (cheack_area3(latitude,longitude)){
            console.log('3');
            area = 3;        
        }
        else {
                if (cheack_area1(latitude,longitude)){ 
                    console.log('1'); area = 1;
                    
                }
                else{
                    if (cheack_area2(latitude,longitude)){
                        console.log('2'); area=2;
                        
                    }
                    else{
                        if (cheack_area4(latitude,longitude)){
                            console.log('4');area=4;
                        }
                        else {
                            if(cheack_area5(latitude,longitude)){
                                    console.log('5');area=5;
                                
                            }
                            else 
                                if(cheack_area6(latitude,longitude)){    
                                    console.log('6');area=6;
                                }
                                else 
                                 console.log('sin area');    
                        }   
                    }    
                }   
            }
            actualizopila(area);
    removeAfter();
    marker = L.marker([latitude, longitude]).addTo(map)
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
