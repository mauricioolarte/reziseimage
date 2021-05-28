const reducirImagen = require('./diemensionesAjustadas');
const getOrientacion = require('./orientacion');
const sharp = require('sharp');

const convertirImagen = (pathImage) => {

	// dimensiones hoja
	const A4HEIGHT = 1123;
	const A4WIDTH = 796;
	// const pathImage = 'paisajeh.png'
	const outputPath = '~/newImage.png'

	const dataImg = getOrientacion(pathImage);
	// obtener dimensiones nuevas
	if ((dataImg.height > A4HEIGHT) || (dataImg.width > A4WIDTH)) {
		const dimensionesAjustadas = reducirImagen(dataImg.height, dataImg.width, dataImg.orientacion)
		return (sharp(pathImage)
			.resize(parseInt(`${dimensionesAjustadas.ancho}`), parseInt(`${dimensionesAjustadas.alto}`))
			.toFile(outputPath, (err, info) => {
				if (err) { console.error(err) }
				if (info) { console.log(info) }
			})

		)
	}

}

module.exports = convertirImagen;

