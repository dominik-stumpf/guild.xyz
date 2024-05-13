import {
  Button,
  ButtonGroup,
  Center,
  Heading,
  VStack,
  useRadioGroup,
} from "@chakra-ui/react"
import Card from "components/common/Card"
import GuildLogo from "components/common/GuildLogo"
import { GameDriver } from "pages/guess-the-guild"
import { useMemo, useState } from "react"
import useSWR from "swr"
import { GuildBase } from "types"
import { GUILD_COUNT } from "../constants"
import { ValidatableRadioButton } from "./ValidatableRadioButton"

async function getGuilds() {
  return (await fetch("https://api.guild.xyz/v2/guilds?limit=4")).json()
}

export const GuessGuildByLogo: GameDriver = ({ setRoundState }) => {
  const {
    data: guilds,
    error,
    isLoading,
  } = useSWR<GuildBase[]>("/api/user", getGuilds)
  const [selectedGuild, setSelectedGuild] = useState<undefined | string>()
  const [isCorrecting, setIsCorrecting] = useState(false)
  const randomGuildIndex = useMemo(() => Math.floor(GUILD_COUNT * Math.random()), [])
  const { getRadioProps } = useRadioGroup({
    name: "guild names",
    onChange: (value) => {
      setSelectedGuild(value)
    },
    value: selectedGuild,
  })

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
              userSelect="none"
              size={24}
              imageUrl={isLoading ? undefined : guilds[randomGuildIndex].imageUrl}
              priority
            />
          )}
        </Center>
        {!error && !isLoading && (
          <ButtonGroup
            orientation="vertical"
            size="lg"
            alignItems="stretch"
            spacing={2}
            width="100%"
          >
            {guilds.map((guild) => {
              const radio = getRadioProps({ value: guild.id.toString() })
              return (
                <ValidatableRadioButton
                  key={guild.id}
                  {...radio}
                  label={guild.name}
                  incorrect={
                    isCorrecting && guild.id !== guilds[randomGuildIndex].id
                  }
                  disabled={isCorrecting}
                >
                  {guild.id.toString()}
                </ValidatableRadioButton>
              )
            })}
          </ButtonGroup>
        )}
        <Button
          type="button"
          colorScheme={isCorrecting ? "red" : "green"}
          isDisabled={selectedGuild === undefined}
          mt={4}
          w={"100%"}
          onClick={() => {
            if (isCorrecting) {
              setRoundState("finish")
              return
            }
            const isValid = selectedGuild === guilds[randomGuildIndex].id.toString()
            if (isValid) {
              setRoundState("pass")
              return
            }
            setRoundState("fail")
            setIsCorrecting(true)
          }}
        >
          {isCorrecting ? "Next round" : "Place bet"}
        </Button>
      </VStack>
    </Card>
  )
}
