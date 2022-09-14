/**
 * @brief dada una latitud y longitud verifica que esten en el rango correspondiente a esta area
 * 
 * @param {Number} latitude 
 * @param {Number} longitude 
 * @returns true|false
 */
function cheack_area1(latitude, longitude){
    if (  between(longitude,-58.02002,-58.019937) ){            
        if ( between(latitude,-34.884010,-34.883958) ){ 
            return true;
        }
    }
    return false;
}
/**
 * @brief dada una latitud y longitud verifica que esten en el rango correspondiente a esta area
 * 
 * @param {Number} latitude 
 * @param {Number} longitude 
 * @returns true|false
 */
function cheack_area2(latitude, longitude){
    if (between(longitude,-58.02002,-58.019937)){
        if ( between(latitude,-34.883958,-34.883860) )
        {
            return true;
        }
    }
    return false;
}
/**
 * @brief dada una latitud y longitud verifica que esten en el rango correspondiente a esta area
 * 
 * @param {Number} latitude 
 * @param {Number} longitude 
 * @returns true|false
 */
function cheack_area3(latitude, longitude){
    if (  between(longitude,-58.02002,-58.019854) ){
        if  (  between( latitude,-34.883860, -34.883800) ){
            return true;
        }
    }
    return false;
}
/**
 * @brief dada una latitud y longitud verifica que esten en el rango correspondiente a esta area
 * 
 * @param {Number} latitude 
 * @param {Number} longitude 
 * @returns true|false
 */
function cheack_area4(latitude, longitude){
    if ( between(longitude,-58.019937,-58.019854) ){       
        if ( between(latitude,-34.883910,-34.883860) )
        {                 
            return true;
        }
    }
    return false;
}
/**
 * @brief dada una latitud y longitud verifica que esten en el rango correspondiente a esta area
 * 
 * @param {Number} latitude 
 * @param {Number} longitude 
 * @returns true|false
 */
function cheack_area5(latitude, longitude){
    if ( between(longitude,-58.019937,-58.019854) ){
        if ( between(latitude,-34.883958,-34.883910) )
        {
            return true;
        }
    }
    return false;
}
/**
 * @brief dada una latitud y longitud verifica que esten en el rango correspondiente a esta area
 * 
 * @param {Number} latitude 
 * @param {Number} longitude 
 * @returns true|false
 */
function cheack_area6(latitude, longitude){
    if ( between(longitude,-58.019937,-58.019854) ){
        if ( between(latitude,-34.884010,-34.883958) )
        {
            return true;
        }
    }
    return false;
}

/** 
 * @brief funcion privada; verifica si el numero x esta entre el minimo y maximo
 * @param {Number} x numero a validar
 * @param {Number} min cota inferior
 * @param {Number} max cota superior
 * @returns {boolean} TRUE (esta en el rango)  |  FALSE (CC)
 * @remark logica utilizada: x >= min && x <= max
 * 
 * @example
 * //returns true
 * between(5, 1, 10);
 * 
 * @example
 * //returns false
 * between(25, 30, 80);
 */
function between(x, min, max,DEBUG=false) {
    if(DEBUG)
        console.log(`x:${x} >= min:${min} && x:${x} <= max:${max} --> ${(x >= min && x <= max)}`);
    return (x >= min && x <= max);
}

export { cheack_area1, cheack_area2, cheack_area3, cheack_area4, cheack_area5, cheack_area6}