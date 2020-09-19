export const popRandomValueFromArray = <T>(array: T[]): T => {
  const index = Math.floor(Math.random() * array.length)
  return array.splice(index, 1)[0];
}

export type ProbabilityArray = number[] // sum should be 1

/**
 * @param probabilities array with sum equal 1
 * @example [0.1, 0.3, 0.6]
 * @return index of array
 */
export const randomizeFromProbabilityArray = (probabilities: ProbabilityArray): number => {

  let sum = 0
  const value = Math.random()
  for (const i in probabilities) {
    sum += probabilities[i]
    if (value < sum) {
      return +i
    }
  }
  throw new Error (`${probabilities} sum is more than 1`)
}
