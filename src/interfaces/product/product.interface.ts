interface IProductRequest {
  name: string;
  description: string;
  price: number;
  img_url?: string;
  isAvailable?: boolean;
  category: any;
}

interface IProductResponse {
  name: string;
  description: string;
  price: number;
  img_url: string;
  is_available: boolean;
  created_at: Date;
  updated_at: Date | null;
  categoryId: string | null;
  restaurantId: string | null;
}
export { IProductRequest, IProductResponse };
