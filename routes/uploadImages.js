const { Router } = require('express');
const { uploadImagesPost, uploadImagesGet } = require('../controllers/uploadImages');

const router = Router();

//aqui van todas las rutas y su logica

router.get('/', uploadImagesGet);
router.post('/', uploadImagesPost)








module.exports = router;