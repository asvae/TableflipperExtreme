import { randomizeFromProbabilityArray } from './helpers'

it('randomizeFromProbabilityArray', () => {
  const result = randomizeFromProbabilityArray([0.1, 0.2, 0.7])
  expect(typeof result).toBe('number')
})
