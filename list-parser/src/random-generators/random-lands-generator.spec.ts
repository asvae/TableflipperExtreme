import { generateLands } from './random-lands-generator'
import { LandType } from '../types'

it('generates 2 of each lands', () => {
  const results = generateLands(6, LandType.island)
  expect(results).toHaveLength(3)
  results.forEach(result => expect(result[0]).toBe(2))
})

it('generates 2 of each lands, then assigns the rest randomly', () => {
  const results = generateLands(7, LandType.island)
  const sum = results.reduce((accumulator, result) => accumulator + result[0], 0)
  expect(sum).toBe(7)
  results.forEach(result => expect(result[0] >= 2).toBe(true))
})
