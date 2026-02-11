const express= require("express")
const Product = require("../models/Product")
const {protect, admin} =  require("../middleware/authMiddleware")

const router= express.Router()

// Get all products
router.get("/", protect, admin, async(req, res)=>{
    try{
        const products= await Product.find({})
        res.json(products)
    }
    catch(error)
    {
        console.error(error)
        return res.status(500).json({message: "server error"})
    }
})

// Get single product
router.get("/:id", protect, admin, async(req, res)=>{
    try{
        const product= await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }
        res.json(product)
    }
    catch(error)
    {
        console.error(error)
        return res.status(500).json({message: "server error"})
    }
})

// Create product
router.post("/", protect, admin, async(req, res)=>{
    try{
        const {name, description, price, discountPrice, countInStock, sku, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, metaTitle, metaDescription, metaKeywords, dimensions} = req.body

        if(!name || !description || !price || !sku || !category || !sizes || !colors || !collections){
            return res.status(400).json({message: "Please provide all required fields"})
        }

        const newProduct = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            sku,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images: images || [],
            isFeatured,
            isPublished,
            tags: tags || [],
            user: req.user._id,
            metaTitle,
            metaDescription,
            metaKeywords,
            dimensions
        })

        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct)
    }
    catch(error)
    {
        console.error(error)
        return res.status(500).json({message: "Server error", error: error.message})
    }
})

// Update product
router.put("/:id", protect, admin, async(req, res)=>{
    try{
        const {name, description, price, discountPrice, countInStock, sku, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, metaTitle, metaDescription, metaKeywords, dimensions} = req.body

        let product = await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        // Update fields
        if(name) product.name = name
        if(description) product.description = description
        if(price) product.price = price
        if(discountPrice) product.discountPrice = discountPrice
        if(countInStock) product.countInStock = countInStock
        if(sku) product.sku = sku
        if(category) product.category = category
        if(brand) product.brand = brand
        if(sizes) product.sizes = sizes
        if(colors) product.colors = colors
        if(collections) product.collections = collections
        if(material) product.material = material
        if(gender) product.gender = gender
        if(images) product.images = images
        if(isFeatured !== undefined) product.isFeatured = isFeatured
        if(isPublished !== undefined) product.isPublished = isPublished
        if(tags) product.tags = tags
        if(metaTitle) product.metaTitle = metaTitle
        if(metaDescription) product.metaDescription = metaDescription
        if(metaKeywords) product.metaKeywords = metaKeywords
        if(dimensions) product.dimensions = dimensions

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }
    catch(error)
    {
        console.error(error)
        return res.status(500).json({message: "Server error", error: error.message})
    }
})

// Delete product
router.delete("/:id", protect, admin, async(req, res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }
        res.json({message: "Product deleted successfully", product})
    }
    catch(error)
    {
        console.error(error)
        return res.status(500).json({message: "Server error", error: error.message})
    }
})

module.exports = router