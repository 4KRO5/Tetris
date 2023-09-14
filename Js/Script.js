let lastKeyPressTime = 0;
const inputDelay = 150;
let savedThisTurn = false;

function keyEvents() {
    if (millis() - lastKeyPressTime > inputDelay) {
        if (keyIsDown(UP_ARROW)) { tetriminoActivo.rotar(); lastKeyPressTime = millis(); }
        if (keyIsDown(RIGHT_ARROW)) { tetriminoActivo.moverHorizontalmente(1); lastKeyPressTime = millis(); }
        if (keyIsDown(LEFT_ARROW)) { tetriminoActivo.moverHorizontalmente(-1); lastKeyPressTime = millis(); }
        if (keyIsDown(DOWN_ARROW)) { tetriminoActivo.fallInterval = 100; } else {
            tetriminoActivo.fallInterval = 1000;
        }

        if (keyIsDown(32) && !spacePressed) {
            spacePressed = true;
            while (!tetriminoActivo.colisiónAbajo()) {
                tetriminoActivo.posición.y++;
            }
            if (tetriminoActivo.detener()) {
                generarNuevoTetrimino();
            }

            savedThisTurn = false;
        } else if (!keyIsDown(32)) {
            spacePressed = false;
        }

        if (keyIsDown(83) && !sPressed && !savedThisTurn) {
            sPressed = true;
            if (tetriminoGuardado) {
                [tetriminoActivo, tetriminoGuardado] = [tetriminoGuardado, tetriminoActivo];
                tetriminoActivo.posición.x = 4;
                tetriminoActivo.posición.y = 0;
            } else {
                tetriminoGuardado = tetriminoActivo;
                generarNuevoTetrimino();
            }
            savedThisTurn = true;
        } else if (!keyIsDown(83)) {
            sPressed = false;
        }
    }
}

function generarNuevoTetrimino() {
    tetriminoActivo = colaTetriminos[0];
    colaTetriminos[0] = colaTetriminos[1];
    colaTetriminos[1] = colaTetriminos[2];
    colaTetriminos[2] = new Tetrimino();
}

function dibujarTetriminoEnCanvas(canvas, tetrimino) {
    const ctx = canvas.getContext('2d');
    const ladoCelda = canvas.width / 4;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = tetrimino.color;

    for (const celda of tetrimino.mapa) {
        const x = celda.x * ladoCelda + canvas.width / 4;
        const y = celda.y * ladoCelda + canvas.height / 2;
        ctx.fillRect(x, y, ladoCelda, ladoCelda);
    }
}

function actualizarTetriminoGuardado() {
    if (tetriminoGuardado) {
        dibujarTetriminoEnCanvas(tetriminoGuardadoCanvas, tetriminoGuardado);
    }
}

function mostrarGameOver() {
    fill(0, 0, 0, 175);
    rect(0, 0, tablero.ancho, tablero.alto);

    textSize(32);
    fill(255, 0, 0);

    const x = tablero.ancho / 2 - 80;
    const y = tablero.alto / 2;

    text("Game Over", x, y);
}

/////////////////////////////////////////////////////////////////////////////
// function actualizarColaTetriminosGuardados() {
//     for (let i = 0; i < colaTetriminosGuardados.length; i++) {
//         const tetrimino = colaTetriminosGuardados[i];
//         dibujarTetriminoEnCanvas(colaTetriminosGuardadosCanvas, tetrimino);
//     }
// }