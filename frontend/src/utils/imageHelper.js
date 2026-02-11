/**
 * Convert relative image paths to absolute URLs
 * @param {string} imageUrl - The image URL (can be relative or absolute)
 * @returns {string} - The absolute image URL
 */
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return ""
  
  // If it's already an absolute URL, return as is
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl
  }
  
  // If it's a relative path, prepend the backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
  return `${backendUrl}${imageUrl}`
}

/**
 * Process product images to ensure they have full URLs
 * @param {object} product - The product object
 * @returns {object} - The product with processed images
 */
export const processProductImages = (product) => {
  if (!product?.images) return product
  
  return {
    ...product,
    images: product.images.map((image) => ({
      ...image,
      url: getImageUrl(image.url),
    })),
  }
}
