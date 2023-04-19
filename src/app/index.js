var area_global;
var area_novisitado;

var map = L.map('map').setView([-34.884032, -58.019961], 20);
var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

import { Pila } from "../models/stack.js";

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
    console.log("esta es la pila: ",pila.toString());
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
           //colocar el texto aqui no funciona
                               //borrar mensaje de fue visitado
                            //    const p = document.getElementById("mensaje_visitado");
                            //    p.style.visibility='hidden';
                            //    const button_si = document.getElementById("button_si");
                            //    const button_no = document.getElementById("button_no");
                            //    button_si.style.visibility='hidden';
                            //    button_no.style.visibility='hidden';
        }
        else{ //es un area diferente
            if (pila.top().visitado == false){ //NO fue visitado
                if ((pila.top().numero < area )&&(((pila.top().numero)+1) == area )){ 
                    console.log('Estas en el area '+area);
                    stand.numero = area; 
                    area_novisitado = stand.numero;
                    stand.visitado = false;
                    pila.push(stand);

                    document.getElementById("mostrarStand").style.visibility = "visible ";
                    var logo = document.getElementById('rm');
                    logo.src = "./static/img/stands/s"+area+".png";
                    dibujar(area);
                    //borrar mensaje de fue visitado
                    const p = document.getElementById("mensaje_visitado").innerText=" ";
                    // const p = document.getElementById("mensaje_visitado");
                    // p.style.visibility='hidden';
                    // const button_si = document.getElementById("button_si");
                    // const button_no = document.getElementById("button_no");
                    // button_si.style.visibility='hidden';
                    // button_no.style.visibility='hidden';
                }    
                else { 
                    if ((pila.top().numero > area)&&(((pila.top().numero)-1)==area)){ 
                        console.log('Ya ha visitado este stand ( stand nro.'+area+' )');

                        stand.numero = area;
                        stand.visitado = true;
                        pila.push(stand);  
                        // texto para actualizar imagen
                        area_global=area;
                        const p = document.getElementById("mensaje_visitado");
                        p.innerText='Ya ha visitado este stand ( stand nro.'+stand.numero+' ). ¿Quiere visitarlo de nuevo?';             
                        p.style.visibility='visible';
                        const button_si = document.getElementById("button_si");
                        const button_no = document.getElementById("button_no");
                        button_si.style.visibility='visible';
                        button_no.style.visibility='visible';
                        button_si.addEventListener('click',mostrarEstand);
                        
                    }   
                    else console.log('Error de sensado!!!!');
                }
            } 
            else {
                if (areaFueVisitada(area)){          
                    console.log('Ya ha visitado este stand ( stand nro.'+area+' )');
                    stand.numero = area;
                    stand.visitado = true;
                    pila.push(stand); 
                    
                }else{ 
                    if ((pila.top().visitado == false)&&(pila.top().numero < area)&&(((pila.top().numero)+1) == area )){
                        stand.numero = area;
                        stand.visitado = false;
                        pila.push(stand);

                        document.getElementById("mostrarStand").style.visibility = "visible ";
                        var logo = document.getElementById('rm');
                        logo.src = "./static/img/stands/s"+area+".png";
                        dibujar(area);
                        
                    } else {
                       console.log('error de sensado');
                    }
                }
            }
            
        }

    }
    
}

// funcion de mostrar area visitada
var mostrarEstand = function (){
    
    document.getElementById("mostrarStand").style.visibility = "visible ";
    var logo = document.getElementById('rm');
    logo.src = "./static/img/stands/s"+area_global+".png";
    dibujar(area_global);
    console.log("el valor de global_area=  es  " + area_global)
    //borrar mensaje
    // const p = document.getElementById("mensaje_visitado");
    //                 p.style.visibility='hidden';
    //                 const button_si = document.getElementById("button_si");
    //                 const button_no = document.getElementById("button_no");
    //                 button_si.style.visibility='hidden';
    //                 button_no.style.visibility='hidden';
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
                                else{
                                    area=0;
                                    console.log('sin area');
                                } 
    
                        }   
                    }    
                }   
            }
            console.log('area antes de actualizoPila: ',area);
            actualizopila(area);
            area_global = area
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
        // deleteAllChildren();
        mostrarPuntos(area,1);
        mostrarPuntos(area,2);
        mostrarPuntos(area,3);
    }
    if( area==4 ){
        // deleteAllChildren();
        mostrarPuntos(area,1);
        mostrarPuntos(area,2);
        mostrarPuntos(area,3);
    }
    if( area==5 ){
        // deleteAllChildren();
        mostrarPuntos(area,1);
        mostrarPuntos(area,2);

    }
    if( area==6 ){
        // deleteAllChildren();
        mostrarPuntos(area,1);

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
}

function esconderPuntos(area,nroBoton){
    var puntos = document.getElementById("b" + area + "_" + nroBoton);
    puntos.style.visibility='hidden';
}


//mostrar sweet alert en los puntos
//  busqueda y asignacion de puntos...-

/**
 * [titulo del punto 1]
 */
const title_1_1='Conocé 4 casos testimoniales impactantes.';
const title_1_2='Conocé las noticias de la inundación en la TV en ese momento.';
var e = document.getElementById("b1_1");
null != e &&
  e.addEventListener("click", (e) => {
    custom_popup(title_1_1,"1_1");
  });

 e = document.getElementById("b1_2");
 null != e &&
   e.addEventListener("click", (e) => {
     custom_popup(title_1_2,"1_2");
   });

/**
 * [titulo del punto 2]
 */

 const title_2_1='El peor momento de la inundación. Accedé a las entrevistas realizadas por zonas inundadas.';
 e = document.getElementById("b2_1");
 null != e &&
   e.addEventListener("click", (e) => {
     custom_popup(title_2_1,"2_1");
   });
/**
 * [titulo del punto 3]
 */
 const title_3_1='Observá el simulador de nivel de agua de inundación.';
 const title_3_2='Observá un compilado de fotos impactantes de la inundación.';
 const title_3_3='Jugá con la Sandbox AR y explora el efecto según el tipo de relieve.';
 var e = document.getElementById("b3_1");
 null != e &&
   e.addEventListener("click", (e) => {
     custom_popup(title_3_1,"3_1");
   });
   e = document.getElementById("b3_2");
 null != e &&
   e.addEventListener("click", (e) => {
     custom_popup(title_3_2,"3_2");
   });
   e = document.getElementById("b3_3");
 null != e &&
   e.addEventListener("click", (e) => {
     custom_popup(title_3_3,"3_3");
   });
  
 /**
 * [titulo del punto 4]
 */
const title_4_1='Descubrí los diarios del momento, mirá las fotos compartidas por las personas damnificadas.';
const title_4_2='Informate sobre los motivos de por qué se inundan estas zonas.';
const title_4_3='Prepararse es fundamental. Aprendé recomendaciones de como actuar, y conocé los centros de evacuación más cercanos.';

var e = document.getElementById("b4_1");
null != e &&
  e.addEventListener("click", (e) => {
    custom_popup(title_4_1,"4_1");
  });

  e = document.getElementById("b4_2");
null != e &&
  e.addEventListener("click", (e) => {
    custom_popup(title_4_2,"4_2");
  });

  e = document.getElementById("b4_3");
null != e &&
  e.addEventListener("click", (e) => {
    custom_popup(title_4_3,"4_3");
  });
  
  /**
 * [titulo del punto 5]
 */
const title_5_1='Se debe pensar antes de actuar. Prepará de manera correacta tu mochila de emergencia.';
const title_5_2='Accedé a juegos educativos realizados por estudiantes de la UNLP.';
var e = document.getElementById("b5_1");
null != e &&
  e.addEventListener("click", (e) => {
    custom_popup(title_5_1,"5_1");
  });

  e = document.getElementById("b5_2");
null != e &&
  e.addEventListener("click", (e) => {
    custom_popup(title_5_2,"5_2");
  });

  /**
 * [titulo del punto 6]
 */
const title_6_1='Ingresá al sitio web de Citadine con entrevistas de otros países y con soluciones basadas en la naturaleza. Conocé más sobre las inundaciones urbanas en el exterior.';
var e = document.getElementById("b6_1");
null != e &&
  e.addEventListener("click", (e) => {
    custom_popup(title_6_1,"6_1");
  });



/**
 * Funcion:   custom_popup(titulo)
 */
  function custom_popup(titulo,nom_img) {
    Swal.fire({
      customClass: {
        confirmButton: 'alert-btn confirm-btn',
        denyButton: 'alert-btn cancel-btn',
        closeButton: 'cancel-btn',
        popup: 'swal2-pop-style',
      },
      buttonsStyling: false,
  
      title: titulo,
    //   icon: "warning",
    //   iconColor:"#E10000",
      showCloseButton: !0,
      showDenyButton: !0,
      focusConfirm: !1,
      confirmButtonText: "Si.",
      denyButtonText: "No.",
      confirmButtonAriaLabel: "Si.",
      denyButtonAriaLabel: "No.",
      // width: "70rem",
      // height: "35rem",
      width: "auto",
      height: "auto",
      color: '#000',
      imageUrl: './static/img/visor/s'+nom_img+'plano.jpg',
      imageHeight: 200,
      imageAlt: 'A tall image',
      html:`
      <figure class='visor'>

      <img class="altura_visor_img" src='./static/img/visor/s`+nom_img+`plano.jpg' alt='imagen panoramica del Stand 1.' />
      
      <figcaption>
        <h2>`+titulo+`</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
      </figcaption>
    </figure>
      `
    //   background: '#FBFFF0 url(./static/img/stands/s1_1plano.jpg) no-repeat left center/contain' ,
      
    //   backdrop: `
    //     rgba(0,0,123,0.4)
    //     url("./static/images/demo-256x256.gif")
    //     left top
    //     no-repeat
    //   `
    });
  }