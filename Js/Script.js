// En Script.js
let lastKeyPressTime = 0;
const inputDelay = 200; // Tiempo en milisegundos entre cada lectura de teclado

function keyEvents() {
    if (millis() - lastKeyPressTime > inputDelay) {
        if (keyIsDown(RIGHT_ARROW)) {
            tetrimino.posicion.x++;
            lastKeyPressTime = millis(); // Actualizar el tiempo de la última pulsación de tecla
        }
        if (keyIsDown(LEFT_ARROW)) {
            tetrimino.posicion.x--;
            lastKeyPressTime = millis(); // Actualizar el tiempo de la última pulsación de tecla
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