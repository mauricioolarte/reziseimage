const A4HEIGHT = 1123;
const A4WIDTH = 796;
let resta = 0;

function reducirImagen(alto, ancho, orientacion) {
	const relacion = orientacion === 'H' ? (ancho / alto).toFixed(2) : (alto / ancho).toFixed(2);

	if (orientacion === 'H') {

		while (alto > A4WIDTH || ancho > A4HEIGHT) {
			if (ancho > A4HEIGHT) {
				resta = ancho - A4HEIGHT;
				ancho = A4HEIGHT;
				alto = alto - resta / relacion;
			}
			if (alto > A4WIDTH) {
				resta = alto - A4WIDTH;
				alto = A4WIDTH;
				ancho = ancho - resta * relacion
			}
		}
	}
	if (orientacion === 'V') {

		while (alto > A4HEIGHT || ancho > A4WIDTH) {
			if (ancho > A4WIDTH) {
				resta = ancho - A4WIDTH;
				ancho = A4WIDTH;
				alto = alto - resta * relacion;
			}
			if (alto > A4HEIGHT) {
				resta = alto - A4HEIGHT;
				alto = A4HEIGHT;
				ancho = ancho - resta / relacion
			}
		}

	}

	return ({
		alto: alto,
		ancho: ancho
	})

}
// reducirImagen(850, 1125, 'H');
// reducirImagen(1400, 700, 'V');

module.exports = reducirImagen