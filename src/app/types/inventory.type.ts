export interface Inventory {  
  id: number;
  barcode: string;
  quantity: number;
  prodId: number;
  prodName: string;
  clientName: string;
  isEditing?: boolean;
} 