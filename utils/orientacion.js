const sizeOf = require('image-size');

const getOrientacion = (ruta) => {
	const dimensions = sizeOf(ruta);

	// orientacion de pagina

	let orientacion = "";

	dimensions.width >= dimensions.height ? orientacion = 'H' : orientacion = 'V';

	const dataImg = {
		orientacion: orientacion,
		width: dimensions.width,
		height: dimensions.height
	}

	return dataImg;
}

// getOrientacion('testh.jpeg')
// getOrientacion('testv.jpeg')

module.exports = getOrientacion;