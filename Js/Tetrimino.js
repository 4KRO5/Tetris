class Tetrimino {
    constructor(nombre = random(["Z", "S", "J", "L", "T", "O", "I"])) {
        this.nombre = nombre;
        let tetrimino = tetriminos[nombre];
        this.color = tetrimino.color;
        this.mapa = [];
        for (const element of tetrimino.mapa) {
            this.mapa.push(element.copy());
        }
        this.posicion = createVector(4, 1);
        this.lastFallTime = 0;
        this.fallInterval = 1000;
    }

    dibujar() {
        push();
        fill(this.color);
        for (const celda of this.mapa) {
            let x = this.posicion.x + celda.x;
            let y = this.posicion.y + celda.y;
            let c = tablero.coordenada(x, y);
            rect(c.x, c.y, tablero.ladoCelda);
        }
        pop();
    }

    caer() {
        if (millis() - this.lastFallTime > this.fallInterval) {
            this.lastFallTime = millis();

            if (!this.colisionAbajo()) {
                this.posicion.y++;
            } else {
                this.detener();
            }
        }
    }

    moverHorizontalmente(direccion) {
        let nuevaPosicion = this.posicion.copy();
        nuevaPosicion.x += direccion;

        if (!this.colisionParedes(nuevaPosicion)) {
            this.posicion.x = nuevaPosicion.x;
        }
    }

    colisionParedes(nuevaPosicion) {
        for (const celda of this.mapa) {
            let x = nuevaPosicion.x + celda.x;
            let y = nuevaPosicion.y + celda.y;

            if (x < 0 || x >= tablero.columnas || y >= tablero.filas || tablero.celdaOcupada(x, y)) {
                return true;
            }
        }
        return false;
    }

    colisionAbajo() {
        for (const celda of this.mapa) {
            let x = this.posicion.x + celda.x;
            let y = this.posicion.y + celda.y + 1;

            if (x < 0 || x >= tablero.columnas || y >= tablero.filas || tablero.celdaOcupada(x, y)) {
                return true;
            }
        }

        for (const celda of this.mapa) {
            let x = this.posicion.x + celda.x;
            let y = this.posicion.y + celda.y + 1;

            if (tablero.celdaOcupada(x, y)) {
                return true;
            }
        }

        return false;
    }

    detener() {
        for (const celda of this.mapa) {
            let x = this.posicion.x + celda.x;
            let y = this.posicion.y + celda.y;
            tablero.ocuparCelda(x, y, this.color);
        }
        this.nombre = random(["Z", "S", "J", "L", "T", "O", "I"]);
        let tetrimino = tetriminos[this.nombre];
        this.color = tetrimino.color;
        this.mapa = [];
        for (const element of tetrimino.mapa) {
            this.mapa.push(element.copy());
        }
        this.posicion = createVector(4, 1);
    }
}

function mapeosTetriminos() {
    tetriminos = {
        Z: {
            color: "red",
            mapa: [
                createVector(),
                createVector(-1, -1),
                createVector(0, -1),
                createVector(1, 0),
            ],
        },
        S: {
            color: "lime",
            mapa: [
                createVector(),
                createVector(1, -1),
                createVector(0, -1),
                createVector(-1, 0),
            ],
        },
        J: {
            color: "orange",
            mapa: [
                createVector(),
                createVector(-1, 0),
                createVector(-1, -1),
                createVector(1, 0),
            ],
        },
        L: {
            color: "dodgerblue",
            mapa: [
                createVector(),
                createVector(-1, 0),
                createVector(1, -1),
                createVector(1, 0),
            ],
        },
        T: {
            color: "magenta",
            mapa: [
                createVector(),
                createVector(-1, 0),
                createVector(1, 0),
                createVector(0, -1),
            ],
        },
        O: {
            color: "yellow",
            mapa: [
                createVector(),
                createVector(0, -1),
                createVector(1, -1),
                createVector(1, 0),
            ],
        },
        I: {
            color: "cyan",
            mapa: [
                createVector(0, -1),
                createVector(-1, -1),
                createVector(1, -1),
                createVector(2, -1),
            ],
        },
    };
}