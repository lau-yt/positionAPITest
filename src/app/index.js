// importando modulos
import Mapa from "../models/map.js";
import Pila from "../models/stack.js";
import Stand from "../models/stand.js";
import {cheack_area1, cheack_area2, cheack_area3, cheack_area4, cheack_area5, cheack_area6} from "../models/areas.js"

const MSG_ERR_PERMISSION_DENIED = "No hay permiso para obtener la posicion";
const MSG_ERR_POSITION_UNAVAILABLE = "Posicion actual no disponible";
const MSG_ERR_TIMEOUT = "No se pudo obtener la posicion en un tiempo";
const MSG_ERR_UNKNOW = "Error desconocido";

// creacion/instanciamiento de variables globales en el contexto de index.js
var pila = new Pila();
var pilaAux = new Pila();
var mapa = new Mapa();
var area_global;
var marker,id;
var flagAlert = false;

// configuracion para geopisition
const options = {
    enableHighAccuracy: true,
    maximumAge: 20000,
    timeout: 10000,
};

// bucar botones para añadir eventos
// document.getElementById("button").addEventListener('click', ()=>{ navigator.geolocation.clearWatch(id); console.log('congratulations, you deleted the id (: the end'); }  );
document.getElementById("buttonStar").addEventListener('click', getLocation);
// PARA BORRAR SI FUNCIONA EL POPUP (:
// document.getElementById("button_si").addEventListener('click', () =>{  
//     console.log("SIII!!");
//     document.getElementById("mostrarStand").style.visibility = "visible ";
//     var logo = document.getElementById('rm');
//     logo.src = "./static/img/stands/s"+area_global+".png";
//     dibujar(area_global);
// });

/**
 * Funcion encargada de inicilizar la deteccion de posicion
 * @params none
 * @return none
*/
function getLocation(){
    if (navigator.geolocation){
            id = navigator.geolocation.watchPosition(getPosition,getPosError,options);
            console.log(id);
    }
    else{
        alert('geolocation is not supported!');
    }
}
/**
 * Funcion encargada de eliminar un marcador del mapa
 * @params none
 * @return none
 */
function removeAfter(){
    if (marker) mapa.removeLayer(marker);
}
/**
 * Funcion encargada de dibujar un marcador del mapa
 * @params none
 * @return none
 */
 function drawMarker(){
    marker = L.marker([latitude, longitude]).addTo(mapa.getMapa())
}

/**
 * genera una copia de la pila y la recorre hasta encontrar la primera ocurrencia en el historial
 * @param {Number} stand 
 * @return {boolean} 
 *  TRUE -  _se ha encontrado el stan en la pila_
 * 
 *  FALSE - _no se encontro ningun stand en la pila_
 */
 function areaFueVisitada(stand){
    var pilaAux = pila.copia();
    let aux = new Stand(); 
    while (pilaAux.length != 0){
        aux = pilaAux.pop();
        if ( (aux.compareStands(stand) == 0 ) && aux.isVisitado()) {
            return true;
        } 
    }
    return false;
}

// realizar revision de esta funcion ..............
function visitaIncompleta(stand){
    //si es incompleta entonces.. stand actual tiene que estar en el historial y ademas en false
    // tambien el anterior stand deberia estar en el historial con valor true 
    let aux = new Stand(); let ok1= false; let ok2 = false;
    var pilaAux = pila.copia();
    while (pilaAux != 0){
        aux = pilaAux.pop();
        if ((ok1 != true)&&(aux.numero == stand)&&(aux.visitado == false)) {
            ok1 = true; 
        }        

        if ((ok2 != true)&&(aux.numero == (stand-1))&&(aux.visitado == true)) {
            ok2 = true; 
        }
        if (ok1 && ok2) break; 
    }
    return (ok1 && ok2);
}

/**
 * Funcion encargada de verificar si debe o no actualizar la pila 
 * ademas hace algo para saber si el area fue visitada o no mmm revisar esto tiene mas de una funcionalidad?(descomponer?)
 * @param {Number} area 
 */
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
             logo.src = "./static/img/stands/s"+area+".webp";
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
                    logo.src = "./static/img/stands/s"+area+".webp";
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
                        logo.src = "./static/img/stands/s"+area+".webp";
                        dibujar(area);
                        
                    } else {
                       console.log('error de sensado');
                    }
                }
            }
            
        }

    }
    
}

function actualizopila2(area){
    let areaEstoy = area;
    area_global = area;
    if (pila.esVacio()) { //caso del historial vacio
        if (areaEstoy == 1){
            console.log('Estas en el area 1');
            pila.push(new Stand(area,false));

            // dibujar el stand 1
            document.getElementById("mostrarStand").style.visibility = "visible ";
            var logo = document.getElementById('rm');
            logo.src = "./static/img/stands/s"+area+".webp";
            dibujar(area);

        }
        else{
            console.log('dirigirse al area 1 para iniciar'); 
            if (!flagAlert){
              custom_popup_Alerta("Debe dirigirse al stand 1 para iniciar");
              flagAlert = true;
            }
        }
    }else{ //el historial tiene contenido
        if(pila.top().compareStands(area) == 0){  
           console.log('No hago nada porque esta mismo stand q visita '+area); 
        }
        else{ //es un area diferente
            //realizo el cálculo si el stand es uno anterior a el o bien uno posterior
            //si es EL stand siguiente al que tengo de la pila debo verificar 4 condiciones
            if ((pila.top().compareStands(area) > 0) && (Math.abs(pila.top().compareStands(area) == 1))) {
                if (areaFueVisitada(area)){  //si esta dentro de la pila entonces ya pase por ahi y lo apilo con marca de visitado
                    console.log('es un siguiente de la pila ya visitado');
                    pila.push(new Stand(area,true));

                    // document.getElementById("mostrarStand").style.visibility = "visible ";
                    // var logo = document.getElementById('rm');
                    // logo.src = "./static/img/stands/s"+area+".webp";
                    // dibujar(area);
                    custom_popup_standAnterior("Ya has visitado el stand "+area+". ¿Desea visitarlo nuevamente?");
                }
                else { // es un nuevo stand 
                    if (visitaIncompleta(area)){
                        console.log('visita incompleta!!');
                        pila.push(new Stand(area,false));


                        document.getElementById("mostrarStand").style.visibility = "visible ";
                        var logo = document.getElementById('rm');
                        logo.src = "./static/img/stands/s"+area+".webp";
                        dibujar(area);
                        //borrar mensaje de fue visitado
                        // const p = document.getElementById("mensaje_visitado").innerText=" "; 
                        // const p = document.getElementById("mensaje_visitado");
                        // p.style.visibility='hidden';
                        // const button_si = document.getElementById("button_si");
                        // const button_no = document.getElementById("button_no");
                        // button_si.style.visibility='hidden';
                        // button_no.style.visibility='hidden';
                    }
                    else {
                        console.log('nuevo stand!!');
                        pila.push(new Stand(area-1,true));
                        pila.push(new Stand(area,true));


                        document.getElementById("mostrarStand").style.visibility = "visible ";
                        var logo = document.getElementById('rm');
                        logo.src = "./static/img/stands/s"+area+".webp";
                        dibujar(area);
                        //borrar mensaje de fue visitado
                        // const p = document.getElementById("mensaje_visitado").innerText=" "; 
                        // const p = document.getElementById("mensaje_visitado");
                        // p.style.visibility='hidden';
                        // const button_si = document.getElementById("button_si");
                        // const button_no = document.getElementById("button_no");
                        // button_si.style.visibility='hidden';
                        // button_no.style.visibility='hidden';
                    }
                }
            }   
            //si es EL stand anterior , aplico en el historial como visitado (true)
            else {
                if ((Math.abs(pila.top().compareStands(area)) == 1)){
                    console.log('stand anterior!');
                    pila.push(new Stand(area,true));

                    // const p = document.getElementById("mensaje_visitado");
                    // p.style.visibility='hidden';
                    // const button_si = document.getElementById("button_si");
                    // const button_no = document.getElementById("button_no");
                    // button_si.style.visibility='visible';
                    // button_no.style.visibility='visible';

                    custom_popup_standAnterior("Ya has visitado el stand "+area+". ¿Desea visitarlo nuevamente?");
                }
            }
        }

    }
    
}

/**
 * Funcion encargada visualizar stand 
 */
 var mostrarEstand = function (){
    
    document.getElementById("mostrarStand").style.visibility = "visible ";
    var logo = document.getElementById('rm');
    logo.src = "./static/img/stands/s"+area_global+".webp";
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
                                    console.log('sin area');
                                } 
    
                        }   
                    }    
                }   
            }
            console.log('area antes de actualizoPila: ',area);
            actualizopila2(area);
            area_global = area
    removeAfter();
    marker = L.marker([latitude, longitude]).addTo(mapa.getMapa())
}

/**
 * 
 * @param {GeolocationPositionError} error 
 */
function getPosError(error){
    console.warn(error.message); let mensaje;
    switch(error.code){
        case error.PERMISSION_DENIED: mensaje = MSG_ERR_PERMISSION_DENIED; break;
        case error.POSITION_UNAVAILABLE: mensaje = MSG_ERR_POSITION_UNAVAILABLE; break;
        case error.TIMEOUT: mensaje = MSG_ERR_TIMEOUT; break;
        default: mensaje = MSG_ERR_UNKNOW; break;
    }
    alert(mensaje);
}

/**
 * funcion encargada de dibujar segun el area que reciba
 * @param {Number} area 
 */
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

/**
 * esta funcion sirve para mostrar los puntos interactivos de la imagen
 * @param {Number} area area visible
 * @param {Number} nroBoton numero de boton asociado
 * @return --> don't return anything
*/
function mostrarPuntos(area, nroBoton){
    var punto1 = document.getElementById("b" + area + "_" + nroBoton);
    punto1.style.visibility='visible';
    switch (area) {
        case 1:
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
          break;
        case 2:
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
          break;
        case 3:
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
          break;
        case 4:
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
        break;
        case 5:
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
        break;
        case 6:
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
        break;
        default:
          console.log("ERROR: area no valida");
        break;
      }
}

/**
 * esta funcion sirve para esconder puntos interactivos de la imagen
 * @param {Number} area area visible
 * @param {Number} nroBoton numero de boton asociado
 * @return none
*/
function esconderPuntos(area,nroBoton){
    var puntos = document.getElementById("b" + area + "_" + nroBoton);
    puntos.style.visibility='hidden';
}


/**
 * ---------COMIENZO EJCUCION SECUENCIAL PARA SWEET ALERT------------
 * 
 * NOTA: es posible transferir esto a otro modulo?, para no mezclar la logica del modulo principal con logica personalizada que aplica a otros componentes.
 */
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
const title_6_1='Ingresá al sitio web de Citadine con entrevistas de otros países y con soluciones basadas en la naturaleza.';
var e = document.getElementById("b6_1");
null != e &&
  e.addEventListener("click", (e) => {
    custom_popup(title_6_1,"6_1");
  });

/**
 * ---------FIN EJCUCION SECUENCIAL PARA SWEET ALERT------------
 */

/**
* Funcion:  custom_popup brinda parametros de configuracion para 
* @param {String} titulo
* @param {String} img
* @return none
*/
  function custom_popup(titulo,nom_img) {
    Swal.fire({
      customClass: {
        // confirmButton: 'alert-btn confirm-btn',
        denyButton: 'alert-btn cancel-btn',
        closeButton: 'cancel-btn',
        popup: 'swal2-pop-style',
      },
      buttonsStyling: false,
  
      title: titulo,
    //   icon: "warning",
    //   iconColor:"#E10000",
      // showCloseButton: !0,
      // showDenyButton: !0,
      // focusConfirm: !1,
      // confirmButtonText: "Si",
      // denyButtonText: "No.",
      // confirmButtonAriaLabel: "Si",
      // denyButtonAriaLabel: "No.",

      // width: "70rem",
      // height: "35rem",
      width: "auto",
      height: "auto",
      color: '#000',
      imageUrl: './static/img/visor/s'+nom_img+'plano.webp',
      imageHeight: 200,
      imageAlt: 'A tall image',
    //   html:`
    //   <figure class='visor'>

    //   <img class="altura_visor_img" src='./static/img/visor/s`+nom_img+`plano.jpg' alt='imagen panoramica del Stand 1.' />
      
    //   <figcaption>
    //     <h2>`+titulo+`</h2>
    //     <p></p>
    //   </figcaption>
    // </figure>
    //   `
    //   background: '#FBFFF0 url(./static/img/stands/s1_1plano.jpg) no-repeat left center/contain' ,
      
    //   backdrop: `
    //     rgba(0,0,123,0.4)
    //     url("./static/images/demo-256x256.gif")
    //     left top
    //     no-repeat
    //   `
    });
  }

  /**
   * @brief popup para el stand anterior
   * @param {String} titulo 
   * @return none
   */
  function custom_popup_standAnterior(titulo) {
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
    }).then((result)=>{
        if (result.isConfirmed){
            console.log("CONFIRME EL POPUP");
            document.getElementById("mostrarStand").style.visibility = "visible ";
            var logo = document.getElementById('rm');
            logo.src = "./static/img/stands/s"+area_global+".webp";
            dibujar(area_global);
        }
    })
  }

  /**
* Funcion:  custom_popup brinda parametros de configuracion para 
* @param {String} titulo
* @param {String} img
* @return none
*/
function custom_popup_Alerta(titulo) {
  Swal.fire({
    customClass: {
      // confirmButton: 'alert-btn confirm-btn',
      denyButton: 'alert-btn cancel-btn',
      closeButton: 'cancel-btn',
      popup: 'swal2-pop-style',
    },
    buttonsStyling: false,

    title: titulo,
    width: "auto",
    height: "auto",
    color: '#000',
  });
}


// REGISTRAMOS EL SERVICE WORKER

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('../sw.js').catch(error => {
      console.log(error);
  })
}