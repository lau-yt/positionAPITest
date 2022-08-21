import Pila from "./stack.js";
var pila = new Pila();

function areaFueVisitada(stand){
    var pilaAux = pila.copia();
    let aux; let ok = false; let i=0;
    while (i<pilaAux.length){
        aux = pilaAux.pop();
        i++;
        if ((aux.numero == stand)&&(aux.visitado == true)) {
            ok = true; 
            break;
        } 
    }
    return ok;
}
function visitaIncompleta(stand){
    //si es incompleta entonces.. stand actual tiene que estar en el historial y ademas en false
    // tambien el anterior stand deberia estar en el historial con valor true 
    let aux; let ok = false; let i=0; let ok1= false; let ok2 = false;
    var pilaAux = pila.copia();
    while (i<pilaAux.length){
        aux = pilaAux.pop();
        i++;
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