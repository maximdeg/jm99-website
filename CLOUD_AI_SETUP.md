# Claid AI Integration Setup Guide

This guide explains how to set up and use the Claid AI integration for generating product images.

## 🚀 Features

- **AI-Generated Product Images**: Create professional product photos with white backgrounds
- **Multiple Product Views**: Generate front, side, and detail views for each product
- **E-commerce Optimized**: Images are optimized for online stores
- **Automatic Integration**: Works seamlessly with the existing e-commerce system

## 📋 Prerequisites

1. **Claid AI Account**: Sign up at [Claid AI](https://claid.ai)
2. **API Key**: Get your API key from the Claid AI dashboard
3. **Node.js Environment**: Ensure your project is running on Node.js

## 🔧 Setup Instructions

### 1. Environment Configuration

Add your Claid AI API key to your `.env` file:

```env
# Existing environment variables
GMAIL_PASS=your_gmail_password
GMAIL_USER=your_gmail_user

# Add Claid AI API key
CLAID_API_KEY=your_claid_api_key_here
```

### 2. API Key Location

The API key is configured in:
- `config/environment.config.ts` - Environment configuration
- `utils/claidService.ts` - Claid AI service implementation

### 3. Usage

#### Automatic Image Generation

The system automatically generates images for products when:
- Running in development mode (`NODE_ENV=development`)
- Products are loaded from the XML file
- Limited to first 10 products to avoid rate limits

#### Manual Image Generation

Use the admin interface at `/admin/generate-images` to:
- Generate images for specific products
- Download generated images
- Preview images before use

## 🎨 Image Specifications

### Generated Images

- **Main Product Image**: 800x800px with white background
- **Product Views**: 600x600px each (front, side, detail)
- **Format**: High-quality JPEG
- **Background**: Pure white (#FFFFFF)
- **Style**: Professional e-commerce photography

### Image Types

1. **Main Image**: Centered product shot with studio lighting
2. **Front View**: Direct front-facing product view
3. **Side View**: 45-degree angle view
4. **Detail View**: Close-up showing product features

## 🔌 API Integration

### Claid AI Service (`utils/claidService.ts`)

```typescript
// Generate main product image
const mainImage = await claidService.generateProductImage(
  productDescription,
  productCode
);

// Generate multiple product views
const productViews = await claidService.generateProductViews(
  productDescription,
  productCode
);
```

### API Endpoints

- `GET /api/products` - Returns products with generated images
- `POST /api/generate-images` - Manually generate images for a product

## 📱 User Interface

### Product Detail Page

- **Image Gallery**: Displays all generated product views
- **Navigation**: Arrow controls to browse images
- **Thumbnails**: Click to select specific views
- **Responsive**: Works on all device sizes

### Admin Interface

- **Image Generation Form**: Input product details
- **Preview**: View generated images before download
- **Download**: Save images locally
- **Error Handling**: Clear error messages

## 🛠️ Technical Implementation

### Image Generation Process

1. **Product Data**: Extract from XML file
2. **AI Prompt**: Create detailed prompts for each view
3. **Claid AI**: Generate images using DALL-E 3
4. **Post-Processing**: Add white background and resize
5. **Storage**: Return image URLs for display

### Error Handling

- **API Failures**: Fallback to placeholder images
- **Rate Limits**: Automatic throttling
- **Network Issues**: Graceful degradation
- **Invalid Data**: Clear error messages

## 💰 Cost Considerations

- **Claid AI Pricing**: Based on image generation volume
- **Rate Limiting**: Implemented to control costs
- **Caching**: Generated images are cached to reduce API calls
- **Development Mode**: Only generates images in development

## 🔒 Security

- **API Key Protection**: Stored in environment variables
- **Server-Side Only**: API calls made from server
- **Input Validation**: Sanitized product descriptions
- **Error Logging**: Secure error handling

## 🚀 Deployment

### Production Considerations

1. **Environment Variables**: Ensure `CLAID_API_KEY` is set
2. **Rate Limiting**: Monitor API usage
3. **Image Caching**: Implement CDN for generated images
4. **Error Monitoring**: Set up logging for API failures

### Development vs Production

- **Development**: Automatic image generation for testing
- **Production**: Manual generation or pre-generated images
- **Caching**: Cache generated images to reduce API calls

## 📞 Support

For issues with:
- **Claid AI API**: Contact Claid AI support
- **Integration**: Check the implementation in `utils/claidService.ts`
- **Environment**: Verify API key configuration

## 🔄 Updates

The system is designed to be easily updated:
- **API Changes**: Update `claidService.ts`
- **New Features**: Extend the service methods
- **UI Improvements**: Modify the admin interface

---

**Note**: This integration uses the [Claid AI API](https://docs.claid.ai/) for professional image generation. Ensure you have proper API access and understand the pricing structure before extensive use.
