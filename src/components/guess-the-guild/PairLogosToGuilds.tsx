import { Button, Flex, Heading, VStack } from "@chakra-ui/react"
import Card from "components/common/Card"
import GuildLogo from "components/common/GuildLogo"
import { useMemo, useState } from "react"
import useSWR from "swr"
import { GuildBase } from "types"
import { BlankGuildCard } from "./BlankGuildCard"
import { shuffleArray } from "utils/shuffleArray"

async function getGuilds() {
  return (await fetch("https://api.guild.xyz/v2/guilds?limit=4")).json()
}

const GUILD_COUNT = 4

export function PairLogosToGuilds() {
  const {
    data: guilds,
    error,
    isLoading,
  } = useSWR<GuildBase[]>("/api/user", getGuilds)
  const [pairings, setPairings] = useState<undefined | [number, number][]>()
  const shuffledIndices = useMemo(() => {
    return shuffleArray(Array.from({ length: GUILD_COUNT }, (_, i) => i))
  }, [])
  const guildsWithoutImage =
    guilds && guilds.map((guild) => ({ ...guild, imageUrl: undefined }))

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
            shuffledIndices.map((_, i) => (
              <GuildLogo
                imageUrl={isLoading ? undefined : guilds[i].imageUrl}
                priority
              />
            ))}
        </Flex>
        {!error && isLoading
          ? "loading guilds"
          : guildsWithoutImage.map((guild) => <BlankGuildCard guildData={guild} />)}
        <Button
          type="button"
          colorScheme="green"
          isDisabled={isLoading || pairings?.length !== GUILD_COUNT}
          mt={4}
          w={"100%"}
          onClick={() => {
            console.log("submitting", pairings)
          }}
        >
          Place bet
        </Button>
      </VStack>
    </Card>
  )
}
