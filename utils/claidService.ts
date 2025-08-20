import ENV from '@/config/environment.config';

interface ClaidImageRequest {
  input: {
    image_url?: string;
    prompt?: string;
  };
  operations: Array<{
    operation: string;
    [key: string]: any;
  }>;
}

interface ClaidImageResponse {
  output: {
    image_url: string;
  };
  status: string;
}

class ClaidService {
  private apiKey: string;
  private baseUrl = 'https://api.claid.ai/v1';

  constructor() {
    this.apiKey = ENV.CLAID_API_KEY || '';
    if (!this.apiKey) {
      console.warn('Claid API key not found in environment variables');
    }
  }

  private async makeRequest(endpoint: string, data: any): Promise<ClaidImageResponse> {
    if (!this.apiKey) {
      throw new Error('Claid API key not configured');
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Claid API error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  /**
   * Generate a product image with white background
   */
  async generateProductImage(productDescription: string, productCode: string): Promise<string> {
    try {
      const request: ClaidImageRequest = {
        input: {
          prompt: `Professional product photography of ${productDescription} on pure white background, high quality, studio lighting, product centered, clean background, e-commerce style`,
        },
        operations: [
          {
            operation: 'generate',
            model: 'dall-e-3',
            size: '1024x1024',
            quality: 'hd',
            style: 'natural',
            n: 1,
          },
          {
            operation: 'background',
            type: 'white',
            padding: 0.1,
          },
          {
            operation: 'resize',
            width: 800,
            height: 800,
            fit: 'contain',
            background: 'white',
          },
        ],
      };

      const response = await this.makeRequest('/image/generate', request);
      return response.output.image_url;
    } catch (error) {
      console.error('Error generating product image:', error);
      // Fallback to placeholder image
      return `https://picsum.photos/800/800?random=${productCode}`;
    }
  }

  /**
   * Generate multiple product views (front, side, detail)
   */
  async generateProductViews(productDescription: string, productCode: string): Promise<string[]> {
    const views = [
      {
        prompt: `Front view of ${productDescription} on white background, professional product photography, centered composition`,
        suffix: 'front',
      },
      {
        prompt: `Side view of ${productDescription} on white background, professional product photography, 45-degree angle`,
        suffix: 'side',
      },
      {
        prompt: `Detail view of ${productDescription} on white background, close-up shot showing product features, professional lighting`,
        suffix: 'detail',
      },
    ];

    const imagePromises = views.map(async (view, index) => {
      try {
        const request: ClaidImageRequest = {
          input: {
            prompt: view.prompt,
          },
          operations: [
            {
              operation: 'generate',
              model: 'dall-e-3',
              size: '1024x1024',
              quality: 'hd',
              style: 'natural',
              n: 1,
            },
            {
              operation: 'background',
              type: 'white',
              padding: 0.1,
            },
            {
              operation: 'resize',
              width: 600,
              height: 600,
              fit: 'contain',
              background: 'white',
            },
          ],
        };

        const response = await this.makeRequest('/image/generate', request);
        return response.output.image_url;
      } catch (error) {
        console.error(`Error generating ${view.suffix} view:`, error);
        // Fallback to placeholder with different random seed
        return `https://picsum.photos/600/600?random=${productCode}${index}`;
      }
    });

    return Promise.all(imagePromises);
  }

  /**
   * Process existing image to add white background
   */
  async addWhiteBackground(imageUrl: string): Promise<string> {
    try {
      const request: ClaidImageRequest = {
        input: {
          image_url: imageUrl,
        },
        operations: [
          {
            operation: 'background',
            type: 'white',
            padding: 0.1,
          },
          {
            operation: 'resize',
            width: 800,
            height: 800,
            fit: 'contain',
            background: 'white',
          },
        ],
      };

      const response = await this.makeRequest('/image/edit', request);
      return response.output.image_url;
    } catch (error) {
      console.error('Error adding white background:', error);
      return imageUrl; // Return original if processing fails
    }
  }
}

export const claidService = new ClaidService();
export default claidService;
