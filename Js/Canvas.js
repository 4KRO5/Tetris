let tablero;
let tetrimino;

function setup() {
    createCanvas(250, 500);
    tablero = new Tablero();
    mapeosTetriminos();
    tetrimino = new Tetrimino();
    resizeCanvas(tablero.ancho, tablero.alto);
}

function draw() {
    background('white');
    tablero.dibujar();
    if (!tablero.comprobarGameOver(tetrimino)) {
        tetrimino.caer();
        tetrimino.dibujar();
        tablero.eliminarFilasCompletas();
        keyEvents();
    } else {
        fill(0, 0, 0, 175);
        rect(0, 0, width, height);
        textSize(32);
        fill(255, 0, 0);
        text("Game Over", width / 2 - 80, height / 2);
    }
}