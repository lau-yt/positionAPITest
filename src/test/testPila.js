class Pila {
    elementos = [];
    first = ()=> this.elementos[0];
    push = (elemento) => {
        return this.elementos.push(elemento);
    }
    pop = () =>{
        return this.elementos.pop();
    }
    esVacio = ()=>{
        return this.elementos.length = 0;
    }
    vaciar = ()=>{
        this.elementos.length = 0;
    }
    tamanio = ()=>{
        return this.elementos.length;
    }
}

//main testeo de pila
const pila = new Pila();

pila.push(1)
pila.push(2)
pila.push(2)
pila.push(5)
pila.push(7)
pila.push(7)
pila.push(3)
pila.push(1)

let result = pila.pop();

console.log(result);
console.log(pila);