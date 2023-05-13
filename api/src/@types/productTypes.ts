interface ProductType {
  name: string
  slug: string
  description: string
  price: number
  discount: number
  images: Array<string>
  category: string
  brand: string
  stockQuantity: number
  ratings: Array<number>
  averageRating: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Define a new interface for the optional properties
interface PartialProductType {
  name?: string
  slug?: string
  description?: string
  price?: number
  discount?: number
  images?: Array<string>
  category?: string
  brand?: string
  stockQuantity?: number
  ratings?: Array<number>
  averageRating?: number
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { ProductType, PartialProductType }
