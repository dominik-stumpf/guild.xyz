export function checkIsAscending(arbitrary: number[]) {
  for (let i = 0; i < arbitrary.length - 1; i += 1) {
    if (arbitrary[i] > arbitrary[i + 1]) {
      return false
    }
  }
  return true
}
