let tablero;
let tetriminoActivo;
let tetriminoGuardado;
let colaTetriminos = [null, null, null];
<<<<<<< HEAD
let tiempoTranscurrido = 0;
=======
>>>>>>> 42bd05983313c3f6e1b515d5f490dca921b9b1cb
let score = 0;

function setup() {
    createCanvas(250, 500).position(250, 100);

    tablero = new Tablero();
    mapeoTetriminos();

    colaTetriminos = Array.from({ length: 3 }, () => new Tetrimino());
    tetriminoActivo = new Tetrimino();
    tetriminoGuardado = null;

    displayScore();

    colaTetriminosCanvas = select("#colaTetriminosCanvas");

    font = loadFont('../Font/Retro Gaming.ttf');
    textFont(font);

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