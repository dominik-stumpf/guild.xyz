import { Button, Flex, Heading, VStack } from "@chakra-ui/react"
import Card from "components/common/Card"
import GuildLogo from "components/common/GuildLogo"
import { useEffect, useMemo, useState } from "react"
import useSWR from "swr"
import { GuildBase } from "types"
import { shuffleArray } from "utils/shuffleArray"
import { BlankGuildCard } from "../components/BlankGuildCard"
import { checkIsAscending } from "utils/checkIsAscending"
import { GameDriver } from "pages/guess-the-guild"

async function getGuilds() {
  return (await fetch("https://api.guild.xyz/v2/guilds?limit=4")).json()
}

const GUILD_COUNT = 4
const ASCENDING_INDICES = Array.from({ length: GUILD_COUNT }, (_, i) => i)

function highlightActiveButton(
  index: number,
  guessIndex: number | null,
  oppositeGuessIndex: number | null
): { opacity: number } {
  const result = { opacity: 1 }
  if (guessIndex !== null && oppositeGuessIndex === null && guessIndex !== index) {
    result.opacity = 0.4
  }
  return result
}

export const PairLogosToGuilds: GameDriver = ({ setRoundState }) => {
  const {
    data: guilds,
    error,
    isLoading,
  } = useSWR<GuildBase[]>("/api/user", getGuilds)
  const [pairings, setPairings] = useState<(number | null)[]>(
    Array(GUILD_COUNT).fill(null)
  )
  const shuffledIndices = useMemo(() => shuffleArray(ASCENDING_INDICES), [])
  const guildsWithGuessedImage =
    guilds &&
    guilds.map((guild, i, arr) => {
      const pairing = pairings.at(i)
      const gulidIndex = shuffledIndices.find((predicate) => predicate === pairing)
      const imageUrl = pairing === null ? undefined : arr.at(gulidIndex).imageUrl
      return { ...guild, imageUrl }
    })
  const [guessIndex, setGuessIndex] = useState<number | null>(null)
  const [blankGuessIndex, setBlankGuessIndex] = useState<number | null>(null)

  useEffect(() => {
    if (blankGuessIndex !== null && guessIndex !== null) {
      setBlankGuessIndex(null)
      setGuessIndex(null)
      setPairings((prev) => {
        const collisionIndex = prev.findIndex(
          (predicate) => predicate === guessIndex
        )
        if (collisionIndex !== -1) {
          prev[collisionIndex] = prev[blankGuessIndex]
        }
        prev[blankGuessIndex] = guessIndex
        return prev
      })
    }
  }, [guessIndex, blankGuessIndex])

  return (
    <Card py="6" px={{ base: 5, md: 6 }} width={400}>
      <VStack>
        <Heading
          as="h1"
          fontFamily="display"
          fontSize="lg"
          fontWeight="bold"
          letterSpacing="wide"
          textAlign="center"
        >
          Pair the logos with the guilds
        </Heading>
        <Flex gap={2} wrap="wrap" my={8}>
          {!error &&
            shuffledIndices.map((i) => (
              <GuildLogo
                userSelect="none"
                key={isLoading ? i : guilds[i].id}
                imageUrl={isLoading ? undefined : guilds[i].imageUrl}
                onPointerDown={() => {
                  setGuessIndex(i)
                }}
                cursor="pointer"
                priority
                {...highlightActiveButton(i, guessIndex, blankGuessIndex)}
              />
            ))}
        </Flex>
        {!error &&
          !isLoading &&
          guildsWithGuessedImage.map((guild, i) => (
            <BlankGuildCard
              userSelect="none"
              guildData={guild}
              key={guild.id}
              {...highlightActiveButton(i, blankGuessIndex, guessIndex)}
              onPointerDown={() => {
                setBlankGuessIndex(i)
              }}
            />
          ))}
        <Button
          type="button"
          colorScheme="green"
          isDisabled={isLoading || pairings.some((pairing) => pairing === null)}
          mt={4}
          w={"100%"}
          onClick={() => {
            const isValid = checkIsAscending(pairings)
            setRoundState(isValid ? "pass" : "fail")
            // setPairings(ASCENDING_INDICES)
          }}
        >
          Place bet
        </Button>
      </VStack>
    </Card>
  )
}
