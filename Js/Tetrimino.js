class Tetrimino {
	constructor(nombre = random(["Z", "S", "J", "L", "T", "O", "I"])) {
		this.nombre = nombre;
		this.color = tetriminos[nombre].color;
		this.mapa = tetriminos[nombre].mapa.map(element => element.copy());
		this.posición = createVector(4, 1);
		this.lastFallTime = 0;
	}

	dibujar() {
		fill(this.color);
		const ladoCelda = tablero.ladoCelda;

		for (const celda of this.mapa) {
			let x = this.posición.x + celda.x;
			let y = this.posición.y + celda.y;
			let c = tablero.coordenada(x, y);
			rect(c.x, c.y, ladoCelda);
		}
	}

	rotar() {
		const nuevaMapa = this.rotarMapa();

		if (!this.hayColisión(nuevaMapa)) {
			this.mapa = nuevaMapa;
		} else {
			this.posición.x--;

			if (!this.hayColisión(nuevaMapa)) {
				this.mapa = nuevaMapa;
			} else {
				this.posición.x += 2;

				if (!this.hayColisión(nuevaMapa)) {
					this.mapa = nuevaMapa;
				} else {
					this.posición.x--;
				}
			}
		}
	}

	rotarMapa() {
		const nuevaMapa = [];
		const longitud = this.mapa.length;

		for (let i = 0; i < longitud; i++) {
			const x = this.mapa[i].y;
			const y = -this.mapa[i].x;
			nuevaMapa.push(createVector(x, y));
		}
		return nuevaMapa;
	}

	hayColisión(nuevaMapa) {
		return this.colisiónParedes(this.posición, nuevaMapa) || this.colisiónTetriminos(this.posición, nuevaMapa);
	}


	colisiónTetriminos(posición, mapa) {
		for (const punto of mapa) {
			const x = posición.x + punto.x;
			const y = posición.y + punto.y;
			if (x < 0 || x >= tablero.columnas || y >= tablero.filas || tablero.celdaOcupada(x, y)) {
				return true;
			}
		}
		return false;
	}

	caer() {
		const tiempoActual = millis();

		if (tiempoActual - this.lastFallTime > this.fallInterval) {
			this.lastFallTime = tiempoActual;

			if (!this.colisiónAbajo()) {
				this.posición.y++;
			} else {
				return this.detener();
			}
		}
	}

	moverHorizontalmente(dirección) {
		if (!this.colisiónParedes({ x: this.posición.x + dirección, y: this.posición.y })) {
			this.posición.x += dirección;
		}
	}

	colisiónParedes(nuevaPosición) {
		for (const celda of this.mapa) {
			let x = nuevaPosición.x + celda.x;
			let y = nuevaPosición.y + celda.y;

			if (x < 0 || x >= tablero.columnas || y >= tablero.filas || tablero.celdaOcupada(x, y)) {
				return true;
			}
		}
		return false;
	}

	colisiónAbajo() {
		for (const celda of this.mapa) {
			let x = this.posición.x + celda.x;
			let y = this.posición.y + celda.y + 1;

			if (x < 0 || x >= tablero.columnas || y >= tablero.filas || tablero.celdaOcupada(x, y)) {
				return true;
			}
		}
		return false;
	}

	detener() {
		for (const celda of this.mapa) {
			let x = this.posición.x + celda.x;
			let y = this.posición.y + celda.y;
			tablero.ocuparCelda(x, y, this.color);
		}
		return true;
	}
}

function mapeoTetriminos() {
	tetriminos = {
		Z: { color: "red", mapa: [createVector(0, 0), createVector(-1, -1), createVector(0, -1), createVector(1, 0)] },
		S: { color: "lime", mapa: [createVector(0, 0), createVector(1, -1), createVector(0, -1), createVector(-1, 0)] },
		J: { color: "orange", mapa: [createVector(0, 0), createVector(-1, 0), createVector(-1, -1), createVector(1, 0)] },
		L: { color: "dodgerblue", mapa: [createVector(0, 0), createVector(-1, 0), createVector(1, -1), createVector(1, 0)] },
		T: { color: "magenta", mapa: [createVector(0, 0), createVector(-1, 0), createVector(1, 0), createVector(0, -1)] },
		O: { color: "yellow", mapa: [createVector(0, 0), createVector(0, -1), createVector(1, -1), createVector(1, 0)] },
		I: { color: "cyan", mapa: [createVector(0, 0), createVector(-1, 0), createVector(1, 0), createVector(2, 0)] }
	};
}