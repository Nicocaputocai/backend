const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/img')); // Carpeta donde guardar las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// Filtro para permitir solo imágenes
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Acepta el archivo
  } else {
    cb(new Error('Solo se permiten archivos de imagen.')); // Rechaza el archivo
  }
};

// Middleware de Multer
const uploadImg = multer({
  storage: storage,
  fileFilter: fileFilter, // Aplica el filtro
  limits: { fileSize: 5 * 1024 * 1024 }, // Tamaño máximo: 5MB
});

module.exports = uploadImg;
