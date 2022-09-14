class Points {

    constructor() {
        //primera sección 
        let pointList = [
            [-34.884010,-58.020020], 
            [-34.883958,-58.020020],
            [-34.883958, -58.019937],
            [-34.884010, -58.019937]
        ];
        //segunda sección 
        let pointList2 = [
            [-34.883958,-58.02002],
            [-34.883958, -58.019937],
            [-34.883860, -58.019937],
            [-34.883860,-58.02002],
        ];
        //tercera sección 
        let pointList3 = [
            [-34.883860, -58.019854],
            [-34.883860,-58.02002],
            [-34.883800, -58.02002],
            [-34.883800, -58.019854]
        ];
        //cuarta sección 
        let pointList4 = [
            [-34.883860, -58.019937],
            [-34.883860,-58.019854],
            [-34.883910, -58.019854],
            [-34.883910, -58.019937]
        ];
        //quinta sección 
        let pointList5 = [
            [-34.883958, -58.019937],
            [-34.883958,-58.019854],
            [-34.883910, -58.019854],
            [-34.883910, -58.019937]
        ];
        //sexta sección 
        let pointList6 = [
            [-34.883958, -58.019937],
            [-34.883958,-58.019854],
            [-34.884010, -58.019854],
            [-34.884010, -58.019937]
        ];

        this.list_points = [pointList,pointList2,pointList3,pointList4,pointList5,pointList6];
    }
    
    get points() {
        return this.list_points;
    }

    // funcion encargada de mostrar el contenido de pointAreas
    verContenido () {
        console.log("impresion de lista de puntos por area");
        this.list_points.forEach((area,indice) => {
            console.log(`area ${indice + 1}`);
            area.forEach(punto => { console.log(punto); });
        });   
    }

}



const points = new Points();
console.log(points.points[0]);