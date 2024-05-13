import { Button, Flex, Heading, VStack } from "@chakra-ui/react"
import Card from "components/common/Card"
import GuildLogo from "components/common/GuildLogo"
import { GameDriver } from "pages/guess-the-guild"
import { useEffect, useMemo, useState } from "react"
import { checkIsAscending } from "utils/checkIsAscending"
import { shuffleArray } from "utils/shuffleArray"
import { BlankGuildCard } from "./BlankGuildCard"
import { GUILD_COUNT } from "../constants"

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

export const PairLogosToGuilds: GameDriver = ({ setRoundState, guilds }) => {
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
  const [isCorrecting, setIsCorrecting] = useState(false)

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
          {shuffledIndices.map((i) => (
            <GuildLogo
              userSelect="none"
              key={guilds[i].id}
              imageUrl={guilds[i].imageUrl}
              onPointerDown={() => {
                setGuessIndex(i)
              }}
              cursor="pointer"
              priority
              pointerEvents={isCorrecting ? "none" : undefined}
              {...highlightActiveButton(i, guessIndex, blankGuessIndex)}
            />
          ))}
        </Flex>
        {guildsWithGuessedImage.map((guild, i) => (
          <BlankGuildCard
            userSelect="none"
            guildData={guild}
            key={guild.id}
            {...highlightActiveButton(i, blankGuessIndex, guessIndex)}
            onPointerDown={() => {
              setBlankGuessIndex(i)
            }}
            pointerEvents={isCorrecting ? "none" : undefined}
          />
        ))}
        <Button
          type="button"
          colorScheme={isCorrecting ? "red" : "green"}
          isDisabled={pairings.some((pairing) => pairing === null)}
          mt={4}
          w={"100%"}
          onClick={() => {
            if (isCorrecting) {
              setRoundState("finish")
              return
            }
            const isValid = checkIsAscending(pairings)
            if (isValid) {
              setRoundState("pass")
              return
            }
            setRoundState("fail")
            setIsCorrecting(true)
            setPairings(ASCENDING_INDICES)
          }}
        >
          {isCorrecting ? "Next round" : "Place bet"}
        </Button>
      </VStack>
    </Card>
  )
}
