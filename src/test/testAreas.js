import {cheack_area1, cheack_area2, cheack_area3, cheack_area4, cheack_area5, cheack_area6} from "../models/areas.js"
import { actualizopila } from "../models/pseucodigo.js";
var max_latitude = -34.883800; //-34.883958 
var min_latitude = -34.884000;
var max_longitude = -58.019800;//-58.019937
var min_longitude = -58.02000;

var position = {
    latitude: Math.random()*(max_latitude - min_latitude) + min_latitude,
    longitude: Math.random()*(max_longitude - min_longitude) + min_longitude
}
/**
 * Funcion modulado de getPosition
 * @param {Object} position 
 */
 function getPosition(position){
    const latitude = position.latitude;
    const longitude = position.longitude; 
        if  (cheack_area3(latitude,longitude)){
            console.log('3'); return 3;
        }
        else {
                if (cheack_area1(latitude,longitude)){ 
                    console.log('1'); return 1;
                    
                }
                else{
                    if (cheack_area2(latitude,longitude)){
                        console.log('2'); 
                        return 2;
                    }
                    else{
                        if (cheack_area4(latitude,longitude)){
                            console.log('4');
                            return 4;
                        }
                        else {
                            if(cheack_area5(latitude,longitude)){
                                console.log('5');
                                return 5;
                            }
                            else 
                                if(cheack_area6(latitude,longitude)){    
                                    console.log('6');
                                    return 6;
                                }
                                else{
                                    console.log('-1');
                                    return 0;
                                } 
    
                        }   
                    }    
                }   
            }
}
var area;
for (let i = 0; i < 10; i++) {
    position.latitude = Math.random()*(max_latitude - min_latitude) + min_latitude;
    position.longitude = Math.random()*(max_longitude - min_longitude) + min_longitude;
    //console.log('coordenadas generadas: lat ', position.latitude,'; long ', position.longitude);
    area = getPosition(position);
    if (area != 0){
        actualizopila(area);
    }  
    else console.log('no actualizo pila');
}
