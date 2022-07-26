const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../public/images');
  },
  filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      callback(null, Date.now()+ name);
  }
});

module.exports = multer({storage: storage}).single('image');

// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png'
// };

// callback(null, name + Date.now() + '.' + extension);