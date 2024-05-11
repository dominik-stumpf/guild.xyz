export function shuffleArray<T>(arr: T[]): T[] {
  const shuffledArray = [...arr]
  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffledArray[i]
    shuffledArray[i] = shuffledArray[j]
    shuffledArray[j] = temp
  }
  return shuffledArray
}
