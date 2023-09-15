let tablero;
let tetriminoActivo;
let tetriminoGuardado;
let colaTetriminos = [null, null, null];

function setup() {
    createCanvas(250, 500).position(250, 100);

    tablero = new Tablero();
    mapeoTetriminos();

    colaTetriminos = Array.from({ length: 3 }, () => new Tetrimino());
    tetriminoActivo = new Tetrimino();
    tetriminoGuardado = null;

    colaTetriminosCanvas = select("#colaTetriminosCanvas");

    resizeCanvas(tablero.ancho, tablero.alto);
}

function draw() {
    tablero.dibujar();

    if (!tablero.comprobarGameOver(tetriminoActivo)) {
        if (tetriminoActivo.caer()) { generarNuevoTetrimino() }
        tetriminoActivo.dibujar();
        tablero.eliminarFilasCompletas();
        keyEvents();
    } else {
        mostrarGameOver();
    }

    actualizarTetriminoGuardado();
    dibujarColaTetriminos();
}