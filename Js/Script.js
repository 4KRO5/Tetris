let lastKeyPressTime = 0;
const inputDelay = 200;

function keyEvents() {
    if (millis() - lastKeyPressTime > inputDelay) {
        if (keyIsDown(RIGHT_ARROW)) {
            tetrimino.moverHorizontalmente(1);
            lastKeyPressTime = millis();
        }
        if (keyIsDown(LEFT_ARROW)) {
            tetrimino.moverHorizontalmente(-1);
            lastKeyPressTime = millis();
        }
        if (keyIsDown(DOWN_ARROW)) {
            tetrimino.fallInterval = 100;
        } else {
            tetrimino.fallInterval = 1000;
        }
        if (keyIsDown(UP_ARROW)) {
            tetrimino.rotar();
            lastKeyPressTime = millis();
        }
        if (keyIsDown(32) && !spacePressed) {
            spacePressed = true;
            while (!tetrimino.colisionAbajo()) {
                tetrimino.posicion.y++;
            }
            tetrimino.detener();
        } else if (!keyIsDown(32)) {
            spacePressed = false;
        }
    }
}