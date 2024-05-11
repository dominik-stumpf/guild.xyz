import { Button, Center, Heading, VStack } from "@chakra-ui/react"
import Card from "components/common/Card"
import GuildLogo from "components/common/GuildLogo"
import RadioButtonGroup from "components/common/RadioButtonGroup"
import { useMemo, useState } from "react"
import useSWR from "swr"
import { GuildBase } from "types"

async function getGuilds() {
  return (await fetch("https://api.guild.xyz/v2/guilds?limit=4")).json()
}

const GUILD_COUNT = 4

export function GuessGuildByLogo() {
  const {
    data: guilds,
    error,
    isLoading,
  } = useSWR<GuildBase[]>("/api/user", getGuilds)
  const [selectedGuild, setSelectedGuild] = useState<undefined | string>()

  const randomGuildIndex = useMemo(() => Math.floor(GUILD_COUNT * Math.random()), [])

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
          Which guild uses this logo?
        </Heading>
        <Center my={8}>
          {!error && (
            <GuildLogo
              size={24}
              imageUrl={isLoading ? undefined : guilds[randomGuildIndex].imageUrl}
              priority
            />
          )}
        </Center>
        {!error && isLoading ? (
          "loading guilds"
        ) : (
          <RadioButtonGroup
            chakraStyles={{
              orientation: "vertical",
              size: "lg",
              alignItems: "stretch",
              spacing: 2,
              width: "100%",
            }}
            onChange={(value) => {
              setSelectedGuild(value)
            }}
            value={selectedGuild}
            options={guilds.map((guild) => ({
              label: guild.name,
              value: guild.name,
            }))}
          />
        )}
        <Button
          type="button"
          colorScheme="green"
          isDisabled={selectedGuild === undefined}
          mt={4}
          w={"100%"}
          onClick={() => {
            console.log("submitting", selectedGuild)
          }}
        >
          Place bet
        </Button>
      </VStack>
    </Card>
  )
}
