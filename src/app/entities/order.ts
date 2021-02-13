export class Order {
  id: number;
  name: string;
  description: string;
  sku_id: string;
  assigned_to: number;
  order_no: string;
  inovice_no: string;
  platform: string;
  customer_name: string;
  customer_email: string;
  customer_contact_no: string;
  order_date: string;
  order_status: number;
  order_status_value: string;
}
export class OrderStatus {
  id: number;
  name: string;
}
