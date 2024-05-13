import { Difficulty } from "pages/guess-the-guild"
import { useMemo } from "react"
import { GuildBase } from "types"
import useSWR from "swr"
import { GUILD_COUNT } from "../constants"
import { shuffle } from "utils/shuffle"

const DIFFICULTY_POOL_SIZE = {
  easy: 100,
  medium: 500,
  hard: 1000,
} as const satisfies Record<Difficulty, number>

const GUILD_REQUEST =
  "https://api.guild.xyz/v2/guilds?limit=1&offset=0&order=FEATURED"

function fetchData(offsets: number[]) {
  const requests = offsets.slice(0, GUILD_COUNT).map((offset) => {
    const request = new URL(GUILD_REQUEST)
    request.searchParams.set("offset", offset.toString())
    return request
  })
  return Promise.all(
    requests.map(async (request) => (await (await fetch(request)).json())[0])
  )
}

export function useFetchRandomGuilds(difficulty: Difficulty, fetchCount: number) {
  const fetchOffsetLimit = DIFFICULTY_POOL_SIZE[difficulty]
  const shuffledOffsets = useMemo(() => {
    const offsets = Array.from({ length: fetchOffsetLimit }, (_, i) => i)
    shuffle(offsets)
    return offsets
  }, [fetchOffsetLimit, fetchCount])

  const {
    data: guilds,
    error,
    isLoading,
  } = useSWR<GuildBase[]>(shuffledOffsets, fetchData)
}
