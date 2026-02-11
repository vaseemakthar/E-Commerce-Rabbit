# Cloudinary Image Upload Integration Guide

## Overview
Your E-commerce backend now has complete Cloudinary integration for storing product images. Images are automatically uploaded to Cloudinary instead of local storage.

## API Endpoints

### 1. Upload Single Image
**Endpoint:** `POST /api/upload`
**Auth:** Not required (can add if needed)

**Request:**
```bash
curl -X POST http://localhost:9000/api/upload \
  -F "image=@path/to/image.jpg"
```

**Response:**
```json
{
  "imageUrl": "https://res.cloudinary.com/.../image.jpg",
  "publicId": "ecommerce/products/xyz123"
}
```

---

### 2. Upload Multiple Images
**Endpoint:** `POST /api/upload/multiple`
**Auth:** Not required

**Request:**
```bash
curl -X POST http://localhost:9000/api/upload/multiple \
  -F "images=@image1.jpg" \
  -F "images=@image2.jpg" \
  -F "images=@image3.jpg"
```

**Response:**
```json
{
  "images": [
    {
      "url": "https://res.cloudinary.com/.../image1.jpg",
      "publicId": "ecommerce/products/xyz123",
      "altText": ""
    },
    {
      "url": "https://res.cloudinary.com/.../image2.jpg",
      "publicId": "ecommerce/products/xyz124",
      "altText": ""
    }
  ]
}
```

---

## Admin Product Routes

### 1. Get All Products
**Endpoint:** `GET /api/admin/products/`
**Auth:** Required (Admin)

**Response:**
```json
[
  {
    "_id": "123abc",
    "name": "Product Name",
    "price": 99.99,
    "images": [
      {
        "url": "https://res.cloudinary.com/.../image.jpg",
        "altText": "Product image"
      }
    ],
    ...
  }
]
```

---

### 2. Get Single Product
**Endpoint:** `GET /api/admin/products/:id`
**Auth:** Required (Admin)

---

### 3. Create Product
**Endpoint:** `POST /api/admin/products/`
**Auth:** Required (Admin)

**Request Body:**
```json
{
  "name": "Premium T-Shirt",
  "description": "High quality cotton t-shirt",
  "price": 49.99,
  "discountPrice": 39.99,
  "countInStock": 100,
  "sku": "TSHIRT-001",
  "category": "Apparel",
  "brand": "MyBrand",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Red", "Blue", "Black"],
  "collections": "Summer",
  "material": "100% Cotton",
  "gender": "Men",
  "images": [
    {
      "url": "https://res.cloudinary.com/.../image.jpg",
      "altText": "Front view"
    },
    {
      "url": "https://res.cloudinary.com/.../image2.jpg",
      "altText": "Back view"
    }
  ],
  "isFeatured": true,
  "isPublished": true,
  "tags": ["summer", "casual"],
  "metaTitle": "Premium T-Shirt",
  "metaDescription": "High quality cotton t-shirt",
  "metaKeywords": "t-shirt, cotton, apparel",
  "dimensions": {
    "length": 70,
    "width": 50,
    "height": 5
  }
}
```

**Response:**
```json
{
  "_id": "123abc",
  "name": "Premium T-Shirt",
  "price": 49.99,
  "images": [...],
  ...
}
```

---

### 4. Update Product
**Endpoint:** `PUT /api/admin/products/:id`
**Auth:** Required (Admin)

**Request Body:** Same as Create Product (all fields are optional)

---

### 5. Delete Product
**Endpoint:** `DELETE /api/admin/products/:id`
**Auth:** Required (Admin)

**Response:**
```json
{
  "message": "Product deleted successfully",
  "product": { ... }
}
```

---

## Frontend Implementation Example

### Upload Images Before Creating Product

```javascript
// Step 1: Upload images to Cloudinary
const uploadImages = async (files) => {
  const formData = new FormData()
  
  files.forEach(file => {
    formData.append('images', file)
  })
  
  const response = await fetch('/api/upload/multiple', {
    method: 'POST',
    body: formData
  })
  
  return await response.json() // Returns {images: [...]}
}

// Step 2: Create product with image URLs
const createProduct = async (productData, imageFiles) => {
  // Upload images first
  const uploadResponse = await uploadImages(imageFiles)
  
  // Create product with image URLs
  const productPayload = {
    ...productData,
    images: uploadResponse.images
  }
  
  const response = await fetch('/api/admin/products/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(productPayload)
  })
  
  return await response.json()
}
```

---

## Cloudinary Configuration

Your Cloudinary credentials are already configured in `.env`:
- `CLOUDINARY_CLOUD_NAME`: Your cloud name
- `CLOUDINARY_API_KEY`: Your API key
- `CLOUDINARY_API_SECRET`: Your API secret

Images are stored in the `ecommerce/products` folder in your Cloudinary account.

---

## Key Benefits

✅ Images stored on CDN (Cloudinary) - faster delivery
✅ Automatic optimization and caching
✅ No local storage needed
✅ Scalable for multiple images
✅ Easy image management and deletion
✅ Public IDs tracked for future deletion

---

## Notes

- Maximum 10 images per upload using the `/multiple` endpoint
- Images are automatically optimized by Cloudinary
- All images are publicly accessible via their URLs
- Use the `publicId` to delete images from Cloudinary if needed
