function setup() {
    createCanvas(250, 500);
    tablero = new Tablero();
    resizeCanvas(tablero.ancho, tablero.alto);
}

function draw() {
    background('lightgray');
    tablero.dibujar();
}