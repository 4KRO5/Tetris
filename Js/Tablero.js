class Tablero {
    constructor() {
        this.columnas = 10;
        this.filas = 20;
        this.ladoCelda = 25;
        this.ancho = this.columnas * this.ladoCelda;
        this.alto = this.filas * this.ladoCelda;
        this.posicion = createVector(0, 0);
        this.matriz = [];
        for (let i = 0; i < this.filas; i++) {
            this.matriz.push(new Array(this.columnas).fill(0));
        }
    }

    comprobarGameOver(tetrimino) {
        for (const celda of tetrimino.mapa) {
            const x = tetrimino.posicion.x + celda.x;
            const y = tetrimino.posicion.y + celda.y;

            if (y >= 0 && (this.celdaOcupada(x, y) || y >= this.filas)) {
                return true;
            }
        }
        return false;
    }

    eliminarFilasCompletas() {
        let filasParaEliminar = [];

        for (let fila = this.filas - 1; fila >= 0; fila--) {
            let filaCompleta = true;
            for (let columna = 0; columna < this.columnas; columna++) {
                if (this.matriz[fila][columna] === 0) {
                    filaCompleta = false;
                    break;
                }
            }

            if (filaCompleta) {
                filasParaEliminar.push(fila);
            }
        }

        for (const filaEliminar of filasParaEliminar) {
            this.matriz.splice(filaEliminar, 1);
        }

        const filasFaltantes = this.filas - this.matriz.length;
        for (let i = 0; i < filasFaltantes; i++) {
            this.matriz.unshift(new Array(this.columnas).fill(0));
        }
    }

    celdaOcupada(x, y) {
        if (this.matriz && this.matriz[y] && this.matriz[y][x] !== undefined) {
            return this.matriz[y][x] !== 0;
        }
        return false;
    }

    ocuparCelda(x, y, color) {
        this.matriz[y][x] = color;
    }

    coordenada(x, y) {
        return createVector(x, y).mult(this.ladoCelda).add(this.posicion);
    }

    dibujar() {
        push();
        noStroke();
        for (let columna = 0; columna < this.columnas; columna++) {
            for (let fila = 0; fila < this.filas; fila++) {
                const valor = this.matriz[fila][columna];
                fill(valor !== 0 ? valor : (columna + fila) % 2 === 0 ? 'black' : '#005');
                let c = this.coordenada(columna, fila);
                rect(c.x, c.y, this.ladoCelda);
            }
        }
        pop();
    }
}