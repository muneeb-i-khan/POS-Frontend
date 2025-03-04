export interface Customer {
  name: string;
  phone: string;
}

export interface OrderItem {
  barcode: string;
  quantity: number;
  prodName?: string;
  price?: number;
  sellingPrice?: number;
}

export interface Order {
  id?: number;
  customer: Customer; 
  items: OrderItem[]; 
  orderDate: string;
  totalAmount?: number;
  isEditing?: boolean;
  [key: string]: any;
}
