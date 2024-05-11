import { Button, Center, Heading, VStack } from "@chakra-ui/react"
import Card from "components/common/Card"
import GuildLogo from "components/common/GuildLogo"
import RadioButtonGroup from "components/common/RadioButtonGroup"
import useSWR from "swr"
import { GuildBase } from "types"

async function getGuilds() {
  return (await fetch("https://api.guild.xyz/v2/guilds?limit=4")).json()
}

export function GuessGuildByLogo() {
  const {
    data: guilds,
    error,
    isLoading,
  } = useSWR<GuildBase[]>("/api/user", getGuilds)

  return (
    <Card py="6" px={{ base: 5, md: 6 }} pos="relative" width={400}>
      <VStack>
        <Heading
          as="h1"
          fontFamily="display"
          fontSize="lg"
          fontWeight="bold"
          letterSpacing="wide"
          textAlign="center"
          maxW="full"
          noOfLines={1}
          wordBreak="break-all"
        >
          Guess the guild
        </Heading>
        <Center my={8}>
          <GuildLogo size={24} />
        </Center>
        {!error && isLoading ? (
          "loading guilds"
        ) : (
          // guilds.map((guild) => <GuildCard guildData={guild} key={guild.id} />)
          // guilds.map((guild) => <DisplayCard textAlign={'center'}>{guild.name}</DisplayCard>)
          <RadioButtonGroup
            chakraStyles={{
              orientation: "vertical",
              size: "lg",
              alignItems: "stretch",
              spacing: 2,
              width: "100%",
            }}
            options={guilds.map((guild, i) => ({
              label: guild.name,
              value: `Option ${i + 1}`,
            }))}
          />
        )}
        <Button type="button" colorScheme="green" isDisabled mt={4} w={"100%"}>
          Place bet
        </Button>
      </VStack>
    </Card>
  )
}
