import path from 'path';
import { fileURLToPath } from 'url';
import multer from "multer";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

//indicar donde se guardan los archivos, en este caso disckStorage(almacenamiento en memoria)
const storage = multer.diskStorage({
    //destination:  carpeta donde se guardan //file es la informacion// cb ruta
    destination:function(req,file,cb){
        cb(null,path.join(__dirname, "../scr/public/images"))
    },

    filename:function(req,file,cb){
        cb(null, file.originalname)
    },
})

export const uploader = multer({storage});