let tetriminoActivo;
let tetriminoGuardado;
let colaTetriminos = [null, null, null];
let tiempoTranscurrido = 0;
let score = 2400;
let level = 1;
let fallSpeed = 1000;
const stages = [
    { scoreRequired: 100, fallInterval: 950 },
    { scoreRequired: 300, fallInterval: 850 },
    { scoreRequired: 600, fallInterval: 800 },
    { scoreRequired: 900, fallInterval: 700 },
    { scoreRequired: 1200, fallInterval: 600 },
    { scoreRequired: 1500, fallInterval: 500 },
    { scoreRequired: 1800, fallInterval: 400 },
    { scoreRequired: 2100, fallInterval: 300 },
    { scoreRequired: 2400, fallInterval: 200 },
    { scoreRequired: 2700, fallInterval: 100 },
];

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