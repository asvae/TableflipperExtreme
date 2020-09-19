import {
  randomizeFromProbabilityArray,
  popRandomValueFromArray, ProbabilityArray,
} from '../helpers'
import { allColorCombinations } from '../mtg-helpers'
import { CardColor } from '../types'


//                                0     1     2     5
const colorPoolsProbabilities: ProbabilityArray = [0.05, 0.65, 0.25, 0.05]

export const randomizeColorPool = (): CardColor[] => {
  const result = randomizeFromProbabilityArray(colorPoolsProbabilities)
  const numberOfColors = result === 3 ? 5 : result
  return popRandomValueFromArray(allColorCombinations.filter(colors => colors.length === numberOfColors))
}

export const probabilitiesForColorCount: ProbabilityArray[] = [
  [100.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [9.1, 90.9, 0.0, 0.0, 0.0, 0.0],
  [14.1, 56.7, 29.2, 0.0, 0.0, 0.0],
  [24.0, 14.3, 28.7, 28.9, 1.0, 3.1],
].map(array => array.map(value => value / 100))

export const getCardColorFromProbabilities = (probabilities: ProbabilityArray, colors: CardColor[]): CardColor[] => {
  const numberOfColors = randomizeFromProbabilityArray(probabilities)
  const colorsTmp = [...colors]
  while (numberOfColors !== colorsTmp.length) {
    popRandomValueFromArray(colorsTmp)
  }
  return colorsTmp
}

export const generateRandomColorSets = (colorPool: CardColor[], cardCount: number): CardColor[][] => {
  const probabilities = probabilitiesForColorCount[colorPool.length === 5 ? 3 : colorPool.length]
  return Array.from(Array(cardCount).keys()).map(() => getCardColorFromProbabilities(probabilities, colorPool))
}
