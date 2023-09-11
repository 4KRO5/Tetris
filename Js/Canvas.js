function setup() {
    createCanvas(250, 500);
    tablero = new Tablero();

    mapeosTetriminos();
    tetrimino = new Tetrimino();
    resizeCanvas(tablero.ancho, tablero.alto);
}

function draw() {
    tablero.dibujar();
    tetrimino.caer(); // Llama al método caer() para que el tetrimino caiga automáticamente
    tetrimino.dibujar();
    keyEvents();
}