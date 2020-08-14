export const popRandomValueFromArray = <T>(array: T[]): T => {
  const index = Math.floor(Math.random() * array.length)
  return array.splice(index, 1)[0];
}
