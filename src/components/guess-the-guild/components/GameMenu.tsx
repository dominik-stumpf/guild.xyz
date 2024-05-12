import { Button, Heading, VStack } from "@chakra-ui/react"
import Card from "components/common/Card"
import RadioButtonGroup from "components/common/RadioButtonGroup"
import { Dispatch, SetStateAction, useState } from "react"
import { DIFFICULTIES, Difficulty } from "pages/guess-the-guild"

interface Props {
  setDifficulty: Dispatch<SetStateAction<Difficulty>>
}

export function GameMenu({ setDifficulty }: Props) {
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty>("medium")

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
          mb={4}
        >
          Select a difficulty
        </Heading>
        <RadioButtonGroup
          chakraStyles={{
            orientation: "vertical",
            size: "lg",
            alignItems: "stretch",
            spacing: 2,
            width: "100%",
            textTransform: "capitalize",
          }}
          onChange={(value) => {
            setActiveDifficulty(value as Difficulty)
          }}
          value={activeDifficulty}
          defaultValue={activeDifficulty}
          options={DIFFICULTIES.map((guild) => ({
            label: guild,
            value: guild,
          }))}
        />
        <Button
          type="button"
          colorScheme="green"
          isDisabled={activeDifficulty === undefined}
          mt={4}
          w={"100%"}
          onClick={() => {
            setDifficulty(activeDifficulty)
          }}
        >
          Start game
        </Button>
      </VStack>
    </Card>
  )
}
