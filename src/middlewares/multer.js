const multer = require('multer')

var storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/products/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

let store = multer({
    storage : storage1
})

module.exports = store;