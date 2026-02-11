const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

require("dotenv").config()

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Upload single image
const uploadSingleImage = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto',
                folder: 'ecommerce/products'
            },
            (error, result) => {
                if (result) {
                    resolve(result)
                } else {
                    reject(error)
                }
            }
        )
        streamifier.createReadStream(fileBuffer).pipe(stream)
    })
}

// Upload multiple images
const uploadMultipleImages = async (fileBuffers) => {
    const uploadedImages = []
    for (const fileBuffer of fileBuffers) {
        try {
            const result = await uploadSingleImage(fileBuffer)
            uploadedImages.push({
                url: result.secure_url,
                publicId: result.public_id,
                altText: ""
            })
        } catch (error) {
            throw new Error(`Failed to upload image: ${error.message}`)
        }
    }
    return uploadedImages
}

// Delete image from Cloudinary
const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId)
        return result
    } catch (error) {
        throw new Error(`Failed to delete image: ${error.message}`)
    }
}

module.exports = {
    uploadSingleImage,
    uploadMultipleImages,
    deleteImage
}
