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