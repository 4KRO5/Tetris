function setup() {
    createCanvas(250, 500);
    tablero = new Tablero();
    tetrimino = new Tetrimino();
    resizeCanvas(tablero.ancho, tablero.alto);
}

function draw() {
    background('lightgray');
    tablero.dibujar();
    tetrimino.dibujar();
}