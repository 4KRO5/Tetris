let lastKeyPressTime = 0;
const inputDelay = 200;
let savedThisTurn = false;

function keyEvents() {
    if (millis() - lastKeyPressTime > inputDelay) {
        if (keyIsDown(RIGHT_ARROW)) {
            tetriminoActivo.moverHorizontalmente(1);
            lastKeyPressTime = millis();
        }
        if (keyIsDown(LEFT_ARROW)) {
            tetriminoActivo.moverHorizontalmente(-1);
            lastKeyPressTime = millis();
        }
        if (keyIsDown(DOWN_ARROW)) {
            tetriminoActivo.fallInterval = 100;
        } else {
            tetriminoActivo.fallInterval = 1000;
        }
        if (keyIsDown(UP_ARROW)) {
            tetriminoActivo.rotar();
            lastKeyPressTime = millis();
        }
        if (keyIsDown(32) && !spacePressed) {
            spacePressed = true;
            while (!tetriminoActivo.colisionAbajo()) {
                tetriminoActivo.posicion.y++;
            }
            tetriminoActivo.detener();
            savedThisTurn = false;
        } else if (!keyIsDown(32)) {
            spacePressed = false;
        }
        if (keyIsDown(83) && !sPressed && !savedThisTurn) {
            sPressed = true;
            if (tetriminoGuardado) {
                const temp = tetriminoActivo;
                tetriminoActivo = tetriminoGuardado;
                tetriminoGuardado = temp;
                tetriminoActivo.posicion.x = 4;
                tetriminoActivo.posicion.y = 0;
            } else {
                tetriminoGuardado = tetriminoActivo;
                tetriminoActivo = new Tetrimino();
            }
            savedThisTurn = true;
        } else if (!keyIsDown(83)) {
            sPressed = false;
        }
    }
}

const tetriminoGuardadoCanvas = document.getElementById('tetriminoGuardadoCanvas');
const tetriminoGuardadoCtx = tetriminoGuardadoCanvas.getContext('2d');

function dibujarTetriminoGuardado(tetrimino) {
    tetriminoGuardadoCtx.clearRect(0, 0, tetriminoGuardadoCanvas.width, tetriminoGuardadoCanvas.height);
    const ladoCelda = tetriminoGuardadoCanvas.width / 4;
    tetriminoGuardadoCtx.fillStyle = tetrimino.color;
    for (const celda of tetrimino.mapa) {
        const x = celda.x * ladoCelda + tetriminoGuardadoCanvas.width / 2;
        const y = celda.y * ladoCelda + tetriminoGuardadoCanvas.height / 2;
        tetriminoGuardadoCtx.fillRect(x, y, ladoCelda, ladoCelda);
    }
}

function actualizarTetriminoGuardado() {
    if (tetriminoGuardado) {
        dibujarTetriminoGuardado(tetriminoGuardado);
    }
}