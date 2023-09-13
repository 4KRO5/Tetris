let tablero;
let tetriminoActivo;
let tetriminoGuardado;

function setup() {
    createCanvas(250, 500);
    background(220);
    tablero = new Tablero();
    mapeosTetriminos();
    tetriminoActivo = new Tetrimino();
    tetriminoGuardado = null;
    //resizeCanvas(tablero.ancho, tablero.alto);
}

function draw() {
    background('blue');
    tablero.dibujar();
    if (!tablero.comprobarGameOver(tetriminoActivo)) {
        tetriminoActivo.caer();
        tetriminoActivo.dibujar();
        tablero.eliminarFilasCompletas();
        keyEvents();
    } else {
        fill(0, 0, 0, 175);
        rect(0, 0, tablero.ancho, tablero.alto);
        textSize(32);
        fill(255, 0, 0);
        text("Game Over", tablero.ancho / 2 - 80, tablero.alto / 2);
    }

    actualizarTetriminoGuardado();
}