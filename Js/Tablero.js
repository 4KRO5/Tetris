class Tablero {
    constructor() {
        this.columnas = 10;
        this.filas = 20;
        this.ladoCelda = 25;
        this.ancho = this.columnas * this.ladoCelda;
        this.alto = this.filas * this.ladoCelda;
        this.posicion = createVector(0, 0);
    }

    coordenada(x, y) {
        return createVector(x, y).mult(this.ladoCelda).add(this.posicion);
    }

    dibujar() {
        push();
        noStroke();
        for (let columna = 0; columna < this.columnas; columna++) {
            for (let fila = 0; fila < this.filas; fila++) {
                fill((columna + fila) % 2 === 0 ? 'black' : '#005');
                let c = this.coordenada(columna, fila);
                rect(c.x, c.y, this.ladoCelda);
            }
        }
        pop();
    }
}