export interface Product {
  id: number;
  name: string;
  barcode: string;
  clientName: string;
  price: number;
  client_id?: number;
  isEditing?: boolean;
} 