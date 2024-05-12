export function checkIsAscending(arr: number[]) {
  for (let i = 0; i < arr.length - 1; i += 1) {
    if (arr[i] > arr[i + 1]) {
      return false
    }
  }
  return true
}
