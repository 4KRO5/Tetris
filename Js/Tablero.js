class Tablero {
    constructor() {
        this.columnas = 10;
        this.filas = 20;
        this.ladoCelda = 25;
        this.ancho = this.columnas * this.ladoCelda;
        this.alto = this.filas * this.ladoCelda;
        this.posición = createVector(0, 0);
        this.matriz = Array.from({ length: this.filas }, () => new Array(this.columnas).fill(0));
    }

    dibujar() {
        push();
        noStroke();
        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                const valor = this.matriz[fila][columna];
                const color = valor !== 0 ? valor : (fila + columna) % 2 === 0 ? 'black' : '#005';
                fill(color);
                rect(columna * this.ladoCelda, fila * this.ladoCelda, this.ladoCelda);
            }
        }
        pop();
    }

    eliminarFilasCompletas() {
        const filasParaEliminar = [];

        for (let fila = this.filas - 1; fila >= 0; fila--) {
            if (this.matriz[fila].every(valor => valor !== 0)) {
                filasParaEliminar.push(fila);
            }
        }

        const numRowsCleared = filasParaEliminar.length;

        let pointsEarned = 0;

        if (numRowsCleared === 1) {
            pointsEarned = 100;
        } else if (numRowsCleared === 2) {
            pointsEarned = 300;
        } else if (numRowsCleared === 3) {
            pointsEarned = 500;
        } else if (numRowsCleared === 4) {
            pointsEarned = 800;
        }

        score += pointsEarned;

        displayScore();

        for (const filaEliminar of filasParaEliminar) {
            this.matriz.splice(filaEliminar, 1);
        }

        const filasFaltantes = this.filas - this.matriz.length;
        for (let i = 0; i < filasFaltantes; i++) {
            this.matriz.unshift(new Array(this.columnas).fill(0));
        }
    }

    comprobarGameOver(tetrimino) {
        return tetrimino.mapa.some(celda => {
            const x = tetrimino.posición.x + celda.x;
            const y = tetrimino.posición.y + celda.y;
            return (y >= 0 && (this.celdaOcupada(x, y) || y >= this.filas));
        });
    }

    coordenada(x, y) {
        return createVector(x, y).mult(this.ladoCelda).add(this.posición);
    }

    celdaOcupada(x, y) {
        return this.matriz && this.matriz[y] && this.matriz[y][x] !== 0;
    }

    ocuparCelda(x, y, color) {
        if (this.matriz && this.matriz[y]) {
            this.matriz[y][x] = color;
        }
    }
}