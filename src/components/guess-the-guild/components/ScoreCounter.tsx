import { Text } from "@chakra-ui/react"
import { useThemeContext } from "components/[guild]/ThemeContext"

interface Props {
  score: number
  record: number
}

export function ScoreCounter({ score, record }: Props) {
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
        Record &ndash; {record}
      </Text>
    </>
  )
}
