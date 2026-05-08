export type CartItem = {
  id: string
  quantity: number
  price?: {
    amount: number
    currency: 'EUR'
  }
}

export function calculateTotal(items: CartItem[]) {
  return items.reduce((sum, item) => {
    const amount = item.price?.amount ?? 0
    return sum + amount * item.quantity
  }, 0)
}
