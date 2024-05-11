import { Button, Flex, Heading, VStack } from "@chakra-ui/react"
import Card from "components/common/Card"
import GuildLogo from "components/common/GuildLogo"
import { useState } from "react"
import useSWR from "swr"
import { GuildBase } from "types"
import { BlankGuildCard } from "./BlankGuildCard"

async function getGuilds() {
  return (await fetch("https://api.guild.xyz/v2/guilds?limit=4")).json()
}

const PAIR_COUNT = 4

export function PairLogosToGuilds() {
  const {
    data: guilds,
    error,
    isLoading,
  } = useSWR<GuildBase[]>("/api/user", getGuilds)
  const [pairings, setPairings] = useState<undefined | [number, number][]>()

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
          <GuildLogo />
          <GuildLogo />
          <GuildLogo />
          <GuildLogo />
        </Flex>
        {!error && isLoading
          ? "loading guilds"
          : guilds.map((guild) => <BlankGuildCard guildData={guild} />)}
        <Button
          type="button"
          colorScheme="green"
          isDisabled={pairings?.length !== PAIR_COUNT}
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
