import { describe, expect, it } from 'vitest'
import { calculateTotal } from '../../src/cart/total'

describe('calculateTotal', () => {
  it('sums priced items', () => {
    const total = calculateTotal([
      { id: 'sku-1', quantity: 2, price: { amount: 500, currency: 'EUR' } },
      { id: 'sku-2', quantity: 1, price: { amount: 1250, currency: 'EUR' } },
    ])

    expect(total).toBe(2250)
  })
})
