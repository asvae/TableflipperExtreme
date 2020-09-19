import {
  randomizeColorPool,
  getCardColorFromProbabilities,
} from './random-half-deck-generator'

it('randomizeColorPool', () => {
  const result = randomizeColorPool()
  expect(typeof result).toBe('object')
})

it('getCardColorFromProbabilities', () => {
  expect(getCardColorFromProbabilities([1.0, 0.0, 0.0, 0.0, 0.0, 0.0], [])).toEqual([])
  // console.log([
  //   getCardColorFromProbabilities([0.2, 0.2, 0.2, 0.2, 0.1, 0.1], ['B', 'G', 'R', 'U', 'W']),
  // ])
})

