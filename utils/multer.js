const multer = require('multer')
const path = require('path')

// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, './uploads/')
//     },
//     filename: (req, file, cb)=>{
//         cb(null, new Date().toISOString() + '-' + file.originalname)
//     }
// })

// const fileFilter = (req, file, cb)=>{
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
//         cb(null, true)
//     }else{
//         cb({ message: 'Unsupported file format'}, false)
//     }
// }

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1024 * 1024},
//     fileFilter: fileFilter
// })

const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter:(req, file, cb)=>{
        checkFileType(file, cb)
    }
})

const checkFileType = (file, cb)=>{
    const filetypes = /jpeg|jpg|jfif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

    const mimetype = filetypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null, true)
    }else{
        cb('Images Only!!')
    }
}

// const checkFileType = (req, file, cb)=>{
//     if (file.mimetype.startsWith('image')) {
//         cb(null, true)
//     }else{
//         cb('images Only')
//     }
// }
module.exports = upload