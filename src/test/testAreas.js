import {cheack_area1, cheack_area2, cheack_area3, cheack_area4, cheack_area5, cheack_area6} from "../models/areas.js"
import { actualizopila2 } from "../models/pseucodigo.js";
var max_latitude = -34.883800; 
var min_latitude = -34.884000;
var max_longitude = -58.019800;
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
/*for (let i = 0; i < 10; i++) {
    position.latitude = Math.random()*(max_latitude - min_latitude) + min_latitude;
    position.longitude = Math.random()*(max_longitude - min_longitude) + min_longitude;
    //console.log('coordenadas generadas: lat ', position.latitude,'; long ', position.longitude);
    area = getPosition(position);
    if (area != 0){
        actualizopila(area);
    }  
    else console.log('no actualizo pila');
}*/
// pruebas con coordenadas manuales 
//stand 1
position.latitude = -34.88399282067345 ;
position.longitude = -58.01998972892761;
area = getPosition(position);
actualizopila2(area);
//stand 2 
position.latitude = -34.8839306636607 ;
position.longitude = -58.0199846997857;
area = getPosition(position);
actualizopila2(area);
//stand 1
position.latitude = -34.88399282067345 ;
position.longitude = -58.01998972892761;
area = getPosition(position);
actualizopila2(area);
//stand 2 
position.latitude = -34.8839306636607 ;
position.longitude = -58.0199846997857;
area = getPosition(position);
actualizopila2(area);
//stand 3
position.latitude = -34.88383825314777 ;
position.longitude = -58.01997061818839;
area = getPosition(position);
actualizopila2(area);
//stand 3
position.latitude = -34.88383825314777 ;
position.longitude = -58.01997061818839;
area = getPosition(position);
actualizopila2(area);
//stand 4
position.latitude = -34.88389683482428 ;
position.longitude = -58.01990188658237;
area = getPosition(position);
actualizopila2(area);
//stand 3
position.latitude = -34.88383825314777 ;
position.longitude = -58.01997061818839;
area = getPosition(position);
actualizopila2(area);
//stand 4
position.latitude = -34.88389683482428 ;
position.longitude = -58.01990188658237;
area = getPosition(position);
actualizopila2(area);
//stand 4
position.latitude = -34.88389683482428 ;
position.longitude = -58.01990188658237;
area = getPosition(position);
actualizopila2(area);
//stand 4
position.latitude = -34.88389683482428 ;
position.longitude = -58.01990188658237;
area = getPosition(position);
actualizopila2(area);//stand 4
position.latitude = -34.88389683482428 ;
position.longitude = -58.01990188658237;
area = getPosition(position);
actualizopila2(area);

console.log('PRUEBAS NUEVAS!!');
//stand 3
position.latitude = -34.88383825314777 ;
position.longitude = -58.01997061818839;
area = getPosition(position);
actualizopila2(area);
//stand 2 
position.latitude = -34.8839306636607 ;
position.longitude = -58.0199846997857;
area = getPosition(position);
actualizopila2(area);
//stand 1
position.latitude = -34.88399282067345 ;
position.longitude = -58.01998972892761;
area = getPosition(position);
actualizopila2(area);

//stand 2 
position.latitude = -34.8839306636607 ;
position.longitude = -58.0199846997857;
area = getPosition(position);
actualizopila2(area);
//stand 3
position.latitude = -34.88383825314777 ;
position.longitude = -58.01997061818839;
area = getPosition(position);
actualizopila2(area);
//stand 4
position.latitude = -34.88389683482428 ;
position.longitude = -58.01990188658237;
area = getPosition(position);
actualizopila2(area);