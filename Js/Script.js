let lastKeyPressTime = 0;
const inputDelay = 100;
let savedThisTurn = false;

function keyEvents() {
    if (millis() - lastKeyPressTime > inputDelay) {
        if (keyIsDown(UP_ARROW)) { tetriminoActivo.rotar(); lastKeyPressTime = millis(); }
        if (keyIsDown(RIGHT_ARROW)) { tetriminoActivo.moverHorizontalmente(1); lastKeyPressTime = millis(); }
        if (keyIsDown(LEFT_ARROW)) { tetriminoActivo.moverHorizontalmente(-1); lastKeyPressTime = millis(); }
        if (keyIsDown(DOWN_ARROW)) { tetriminoActivo.fallInterval = 100; } else {
            tetriminoActivo.fallInterval = fallSpeed;
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

function displayScore() {
    fill(255);
    textSize(20);
    text("Score: " + score, 10, 30);
}

function mostrarGameOver() {
    fill(0, 0, 0, 150);
    rect(0, 0, tablero.ancho, tablero.alto);

    textSize(32);
    fill(255, 0, 0);

    const x = tablero.ancho / 2 - 102;
    const y = tablero.alto / 2;

    text("Game Over", x, y);
}

function displayScore() {
    fill(255);
    textSize(20);
    const scoreText = "Score: " + score;
    const timeText = "Time: " + Math.floor(millis() / 1000);
    text(scoreText, 10, 30);
    text(timeText, 10, 50);

    if (level < stages.length) {
        if (stages[level].scoreRequired <= score) {
            fallSpeed = stages[level].fallInterval;
            level++;
        }
    }
}

function generarNuevoTetrimino() {
    tetriminoActivo = colaTetriminos[2];
    colaTetriminos[2] = colaTetriminos[1];
    colaTetriminos[1] = colaTetriminos[0];
    colaTetriminos[0] = new Tetrimino();
}

function dibujarTetriminoEnCanvas(canvas, tetrimino) {
    const ctx = canvas.getContext('2d');
    const ladoCelda = 100 / 4;

    ctx.clearRect(0, 0, 100, 100);
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

function dibujarColaTetriminos() {
    const ladoCeldaCola = 100 / 4;

    const ctxCola = colaTetriminosCanvas.elt.getContext('2d');
    ctxCola.clearRect(0, 0, 100, 300);

    for (let i = 0; i < colaTetriminos.length; i++) {
        const tetrimino = colaTetriminos[i];
        if (tetrimino) {
            const x = 25;
            const y = i * 100 + 50;
            for (const celda of tetrimino.mapa) {
                ctxCola.fillStyle = tetrimino.color;
                ctxCola.fillRect(x + celda.x * ladoCeldaCola, y + celda.y * ladoCeldaCola, ladoCeldaCola, ladoCeldaCola);
            }
        }
    }
}