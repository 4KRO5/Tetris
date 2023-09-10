class Tetrimino {
    constructor() {
        this.posicion = createVector(0, 0);
    }

    dibujar() {
        push();
        fill('red');
        let c = tablero.coordenada(this.posicion.x, this.posicion.y);
        rect(c.x, c.y, tablero.ladoCelda);
        pop();
    }
}