export function shuffle<T>(arbitrary: T[]) {
  for (let i = arbitrary.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arbitrary[i], arbitrary[j]] = [arbitrary[j], arbitrary[i]]
  }
}
