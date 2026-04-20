export type ProductStatus = 'active' | 'sold-out' | 'pre-order' | 'archived' | 'coming-soon'

export interface Product {
  // ... existing fields
  status: ProductStatus;
  preOrderConfig?: {
    startAt: string; // ISO Date
    endAt: string;   // ISO Date
  };
}