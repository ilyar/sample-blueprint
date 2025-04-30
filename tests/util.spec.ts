import { getSelectorForMethod } from '@ton/sandbox/dist/utils/selector'

describe('util', () => {
  it(`getSelectorForMethod`, async () => {
    expect(getSelectorForMethod('state')).toEqual(0x12f15)
  })
})
