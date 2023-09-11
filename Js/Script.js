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
            if (!tetrimino.colisionAbajo()) {
                tetrimino.posicion.y++;
            }
            lastKeyPressTime = millis();
        }
        if (keyIsDown(UP_ARROW)) {
            tetrimino.posicion.y--
            lastKeyPressTime = millis();
        }
    }
}