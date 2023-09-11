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
                createVector(),
                createVector(-1, 0),
                createVector(1, 0),
                createVector(2, 0),
            ],
        },
    };
}