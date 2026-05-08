export type CartItem = {
  id: string
  quantity: number
  price?: {
    amount: number
    currency: 'EUR'
  }
}

export function calculateTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price.amount * item.quantity, 0)
}
