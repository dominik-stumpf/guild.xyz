import { Button, Heading, VStack } from "@chakra-ui/react"
import Card from "components/common/Card"
import RadioButtonGroup from "components/common/RadioButtonGroup"
import { useState } from "react"

const DIFFICULTIES = ["easy", "medium", "hard"] as const

export function GameMenu() {
  const [difficulty, setDifficulty] = useState<string>()

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
            setDifficulty(value)
          }}
          value={difficulty}
          options={DIFFICULTIES.map((guild) => ({
            label: guild,
            value: guild,
          }))}
        />
        <Button
          type="button"
          colorScheme="green"
          isDisabled={difficulty === undefined}
          mt={4}
          w={"100%"}
          onClick={() => {
            console.log("submitting", difficulty)
          }}
        >
          Start game
        </Button>
      </VStack>
    </Card>
  )
}
