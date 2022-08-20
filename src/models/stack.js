export default class Pila {
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