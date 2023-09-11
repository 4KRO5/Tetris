function setup() {
    createCanvas(250, 500);
    tablero = new Tablero();

    mapeosTetriminos();
    tetrimino = new Tetrimino();
    resizeCanvas(tablero.ancho, tablero.alto);
}

function draw() {
    tablero.dibujar();
    tetrimino.dibujar();
    keyEvents();
}