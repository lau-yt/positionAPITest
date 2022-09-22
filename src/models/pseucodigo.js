import Pila from "./stack.js";
import Stand from "./stand.js";

var pila = new Pila();

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

//cambio la estructura de los stands por una clase 
//entonces hay que modificar esta funcion para acoplar la nueva estructura
export function actualizopila(area){
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
                    console.log('-Estas en el area '+area);
                    stand.numero = area; 
                    stand.visitado = false;
                    pila.push(stand);
                }    
                else { 
                    if ((pila.top().numero > area)&&(((pila.top().numero)-1)==area)){ 
                        console.log('Ya ha visitado este stand ( stand nro.'+area+' )');
                        stand.numero = area;
                        stand.visitado = true;
                        pila.push(stand);  
                    }   
                    else console.log('Error de sensado!!!!');
                }
            } 
            else {
                if (areaFueVisitada(area) || visitaIncompleta(area)){          
                    console.log('--Ya ha visitado este stand ( stand nro.'+area+' )'); //ingresa por aca, el problema ocurre cuando viene el siguiente y visitado esta en true
                    stand.numero = area;
                    stand.visitado = true;
                    pila.push(stand); 
                    
                }else{ //no ingresa por este if de aca abajo sino que va por else con error de sensado
                    //if ((pila.top().visitado == false)&&(pila.top().numero < area)&&(((pila.top().numero)+1) == area )){
                    if ((pila.top().numero < area)&&(((pila.top().numero)+1) == area )){
                        console.log('Estas en el area '+area);
                        stand.numero = area; 
                        stand.visitado = false;
                        pila.push(stand);                        
                    } else {
                       console.log('error de sensado');
                    }
                }
            }
            
        }

    }
    
}

export function actualizopila2(area){
    let areaEstoy = area;
    if (pila.esVacio()) { //caso del historial vacio
        if (areaEstoy == 1){
            console.log('Estas en el area 1');
            pila.push(new Stand(area,false));
        }
        else{
            console.log('dirigirse al area 1 para iniciar'); 
        }
    }else{ //el historial tiene contenido
        if(pila.top().compareStands(area) == 0){  
           console.log('No hago nada porque esta mismo stand q visita '+area); 
        }
        else{ //es un area diferente
            //realizo el cálculo si el stand es uno anterior a el o bien uno posterior
            //si es EL stand siguiente al que tengo de la pila debo verificar 4 condiciones
            if ((pila.top().compareStands(area) > 0)) {
                // console.log('Area fue visitada devuelve: ',areaFueVisitada(area));
                if (areaFueVisitada(area)){  //si esta dentro de la pila entonces ya pase por ahi y lo apilo con marca de visitado
                    console.log('es un siguiente de la pila ya visitado');
                    pila.push(new Stand(area,true));
                }
                else { // es un nuevo stand 
                    if (visitaIncompleta(area)){
                        console.log('visita incompleta!!');
                        pila.push(new Stand(area,false));
                    }
                    else {
                        if ((Math.abs(pila.top().compareStands(area) == 1))){
                            console.log('nuevo stand!!');
                            pila.push(new Stand(area-1,true));
                            pila.push(new Stand(area,false));
                        }
                    }
                }
            }   
            //si es EL stand anterior , aplico en el historial como visitado (true)
            else {
                if (Math.abs(pila.top().compareStands(area) < 0) && (areaFueVisitada(area))){
                    console.log('stand anterior!');
                    pila.push(new Stand(area,true));
                }
            }
        }

    }
    
}