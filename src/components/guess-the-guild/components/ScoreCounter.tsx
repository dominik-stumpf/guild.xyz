import { Text } from "@chakra-ui/react"
import { useThemeContext } from "components/[guild]/ThemeContext"

interface Props {
  score: number
}

export function ScoreCounter({ score }: Props) {
  const { textColor } = useThemeContext()

  return (
    <>
      <Text
        fontFamily="display"
        fontWeight="bold"
        fontSize="6xl"
        textAlign="center"
        color={textColor}
      >
        {score}
      </Text>
      <Text
        fontFamily="display"
        mb={16}
        textAlign="center"
        color={textColor}
        whiteSpace="nowrap"
      >
        Record &ndash; {score}
      </Text>
    </>
  )
}
