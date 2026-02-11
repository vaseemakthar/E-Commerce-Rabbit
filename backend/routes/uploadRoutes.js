const express= require('express')
const multer= require('multer')
const {uploadSingleImage, uploadMultipleImages} = require('../config/cloudinary')

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({storage})

// Upload single image
router.post("/", upload.single("image"), async(req, res)=>{
    try{
        if(!req.file)
        {
            return res.status(400).json({message: "No file Uploaded"})
        }

        const result = await uploadSingleImage(req.file.buffer)
        res.json({imageUrl: result.secure_url, publicId: result.public_id})
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({message: "Server error!", error: error.message})
    }
})

// Upload multiple images
router.post("/multiple", upload.array("images", 10), async(req, res)=>{
    try{
        if(!req.files || req.files.length === 0)
        {
            return res.status(400).json({message: "No files Uploaded"})
        }

        const fileBuffers = req.files.map(file => file.buffer)
        const uploadedImages = await uploadMultipleImages(fileBuffers)

        res.json({images: uploadedImages})
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({message: "Server error!", error: error.message})
    }
})

module.exports = router