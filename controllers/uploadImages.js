// este es controlador de las rutas, aqui va la logica de la ruta

const { response, request } = require('express');
const sizeOf = require('image-size');
const sharp = require('sharp')


const reducirImagen = require('../utils/diemensionesAjustadas')
const getOrientacion = require('../utils/orientacion')

const uploadImagesGet = (req = request, res = response) => {

  const body = req.body;
  res.json({
    'msg': 'get API - controlador'
  })
}

const uploadImagesPost = async (req = request, res = response) => {

  // verificando tipo de archivo
  const splitFileName = req.files.file.name.split(".");
  const fileExtension = splitFileName[splitFileName.length - 1]

  if (fileExtension != 'jpg') {
    return res.status(403).json({ msg: 'Solo se permiten archivos JPG' })
  }


  console.log(fileExtension)

  const pathImage = req.files.file.data;

  // dimensiones hoja
  const A4HEIGHT = 1123;
  const A4WIDTH = 796;

  // orientacion y demensiones imagen
  const dataImg = await getOrientacion(pathImage);

  // genera nuevas dimensiones

  if ((dataImg.height > A4HEIGHT) || (dataImg.width > A4WIDTH)) {
    const dimensionesAjustadas = reducirImagen(dataImg.height, dataImg.width, dataImg.orientacion)

    try {
      await sharp(pathImage)
        .resize(parseInt(`${dimensionesAjustadas.ancho}`), parseInt(`${dimensionesAjustadas.alto}`))
        .toFile('image.png', (err, info) => {
          const { channels, premultiplied, ...rest } = info;
          console.log('process ok')
          res.json({
            'msg': rest
          })
        });
    } catch (error) {
      if (err) return res.status(500).json({ message: err })
    }


  } else {
    let imagWhitoutChanges = req.files.file;
    imagWhitoutChanges.mv(`./images/${imagWhitoutChanges.name}`, err => {
      if (err) return res.status(500).json({ message: err })

      return res.json({
        msg: 'imagen guardada',
        info: dataImg
      })
    })
  }

}
module.exports = {
  uploadImagesGet,
  uploadImagesPost
} 