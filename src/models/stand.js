export default class Stand {
    /**
     * constructor de la clase
     * @param {Number} numero 
     * @param {Boolean} visitado 
     */
    constructor (numero, visitado) {
        this.numero = numero;
        this.visitado = visitado;
      }
    
    /**
     * devuelve el numero del stand
     * @return {Number} numero de stand
     */
    get numero(){
        return this.numero;
    }

    /**
     * devuelve el estado del stand (visitado/no visitado)(true/false)
     * @return {Boolean} estado de visita
     */
    get visitado(){
        return this.visitado
    }

    /**
     * visita un nuevo stand por primera vez por lo que asigna numero y pone stan en falso (no visitado)
     * @param {Number} numero 
     */
    visitarStand = (numero)=>{
        this.numero = numero;
        this.visitado = false;
    }

    /**
     * marca el stand como visitado
     * @return none
     */
    MarcarVisitado = ()=>{
        this.visitado = true;
    }

    /**
     * retorna el estado del stand 
     * @returns {Boolean} visitado -> true , CC -> false
     */
    fueVisitado = () => {
        return this.visitado;
    }

    /**
     * compara numeros de stand para ver si son iguales
     * @param {Number} numero numero a comparar
     * @returns {Boolean} resultado_comparacion: son iguales -> true , CC -> false
     */
    compareStand = (numero)=>{
        return (this.numero == numero);
    }

    /**
     * esta funcion verifica si fue visitado y es el mismo numero
     * @param {Number} numero numero de stand a comparar
     * @returns {Boolean} resultado: es el mismo numero y fue visitado -> true;
     */
    mismoNumeroVisitado = (numero)=>{
        return (this.compareStand(numero) && this.fueVisitado);
    }

    /**
     * esta funcion verifica si fue visitado y es el mismo numero
     * @param {Number} numero numero de stand a comparar
     * @returns {Boolean} resultado: es el mismo numero y no visitado -> true;
     */
    mismoNumeroNoVisitado = (numero)=>{
        return (this.compareStand(numero) && (!this.fueVisitado));
    }

}