let tablero;
let tetriminoActivo;
let tetriminoGuardado;
let colaTetriminos = [null, null, null];

function setup() {
    const canvasWidth = 250;
    const canvasHeight = 500;

    createCanvas(canvasWidth, canvasHeight);
    background(220);

    tablero = new Tablero();
    mapeoTetriminos();

    colaTetriminos = Array.from({ length: 3 }, () => new Tetrimino());
    tetriminoActivo = new Tetrimino();
    tetriminoGuardado = null;

    resizeCanvas(tablero.ancho, tablero.alto);
}

function draw() {
    background('blue');
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
    //actualizarColaTetriminosGuardados();
}