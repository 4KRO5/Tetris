let tetriminoActivo;
let tetriminoGuardado;
let colaTetriminos = [null, null, null];
let tiempoTranscurrido = 0;
let score = 0;
let level = 0;
let fallSpeed = 1000;
let juegoPausado = true;
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
    { scoreRequired: 3000, fallInterval: 50 },
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

    const playButton = select("#playButton");
    playButton.mousePressed(toggleGame);
}

function draw() {
    tablero.dibujar();

    if (!tablero.comprobarGameOver(tetriminoActivo) && !juegoPausado) {
        if (tetriminoActivo.caer()) { generarNuevoTetrimino() }
        tetriminoActivo.dibujar();
        tablero.eliminarFilasCompletas();
        keyEvents();
    } else if (tablero.comprobarGameOver(tetriminoActivo) && !juegoPausado) {
        mostrarGameOver();
    }

    actualizarTetriminoGuardado();
    dibujarColaTetriminos();
}

function toggleGame() {
    juegoPausado = !juegoPausado;
    const playButton = select("#playButton");
    
    if (juegoPausado) {
        playButton.html("Play");
    } else {
        playButton.html("Pause");
    }
}