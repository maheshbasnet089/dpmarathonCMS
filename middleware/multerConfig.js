const multer = require("multer")

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        // validating the fileType
        const allowedFileTypes = ['image/png','image/jpeg','image/jpg']
        if(!allowedFileTypes.includes(file.mimetype)){
            cb(new Error("This fileType is not supported"))
        }else{
            cb(null,"./uploads") // cb(error,success) , cb(error)

        }
      
    },
    filename : function(req,file,cb){
        
        cb(null,Date.now()+  "-" +   file.originalname)
    }
})

module.exports = {
    multer,
    storage
}