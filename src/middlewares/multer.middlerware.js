import multer, { diskStorage } from "multer";

const storage = diskStorage({
    destination: function(req,file,cb) {
        cb(null,'./public/temp') // may change
    },
    filename: function(req,file,cb){
        cb(null, file.originalname+"_videohub") // custom file name also possible
    }
})

export const upload = multer({
    storage,
})