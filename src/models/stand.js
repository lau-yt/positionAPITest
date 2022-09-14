export default class Stand {
    /**
     * constructor de la clase
     * @param {Number} numero 
     * @param {Boolean} estado 
     */

    constructor (nro, visitado) {
        this.numero = nro;
        this.visitado = visitado;
      }

    /**
     * devuelve el numero del stand
     * @return {Number} numero de stand
     */
    getNumero = ()=>{
        return this.numero;
    }

    /**
     * devuelve el estado del stand (visitado/no visitado)(true/false)
     * @return {Boolean} estado de visita
     */
    getEstado=()=>{
        return this.estado
    }

    /**
     * setea el estado del stand (visitado/no visitado)(true/false)
     * @return none
     */
    setEstado = (estado) => {
        this.estado = estado;
    }

    /**
     * setea el numero del stand
     * @return none
     */
    setNumero = (nro)=>{
        this.numero = nro;
    }
    /**
     * marca el stand como visitado
     * @return none
     */
    tickVisitado = ()=>{
        this.visitado = true;
    }

    /**
     * retorna el estado del stand 
     * @returns {Boolean} visitado -> true , CC -> false
     */
    isVisitado = () => {
        return this.visitado;
    }

    /**
     * compara numeros de stand para ver si son iguales
     * realiza una resta entre numeros de stand (param - this.numero)
     * @param {Number} numero numero a comparar
     * @returns {Boolean} resultado_comparacion:    result -> 0  son iguales
     *                                              result >  0  es el siguente
     *                                              result <  0  es el anterior
     */
    compareStands = (numero)=>{
        return (numero - this.numero);
    }

    /**
     * esta funcion verifica si fue visitado y es el mismo numero
     * @param {Number} numero numero de stand a comparar
     * @returns {Boolean} resultado: es el mismo numero y fue visitado -> true;
     */
    mismoNumeroVisitado = (numero)=>{
        return ( (this.compareStands(numero) == 0) && this.isVisitado());
    }

    /**
     * esta funcion verifica si fue visitado y es el mismo numero
     * @param {Number} numero numero de stand a comparar
     * @returns {Boolean} resultado: es el mismo numero y no visitado -> true;
     */
    mismoNumeroNoVisitado = (numero)=>{
        return ((this.compareStands(numero) == 0) && !this.isVisitado());
    }

}