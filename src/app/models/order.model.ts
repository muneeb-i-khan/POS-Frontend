export interface OrderItem {
  barcode: string;
  quantity: number;
  prodName?: string;
  price?: number;
}

export interface Order {
  id?: number;
  items: OrderItem[];
  orderDate: string;
  totalAmount?: number;
  isEditing?: boolean;
  [key: string]: any;
} 