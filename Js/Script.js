let lastKeyPressTime = 0;
const inputDelay = 200;

function keyEvents() {
    if (millis() - lastKeyPressTime > inputDelay) {
        if (keyIsDown(RIGHT_ARROW)) {
            tetrimino.posicion.x++;
            lastKeyPressTime = millis();
        }
        if (keyIsDown(LEFT_ARROW)) {
            tetrimino.posicion.x--;
            lastKeyPressTime = millis();
        }
        if (keyIsDown(DOWN_ARROW)) {
            tetrimino.posicion.y++
            lastKeyPressTime = millis();
        }
        if (keyIsDown(UP_ARROW)) {
            tetrimino.posicion.y--
            lastKeyPressTime = millis();
        }
    }
}