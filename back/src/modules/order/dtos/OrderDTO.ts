export interface OrderDTO {
  id?: string
  description: string
  clientId: string
  status: number
  orderItems?: string[]
}
