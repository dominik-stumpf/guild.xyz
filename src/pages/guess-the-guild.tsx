import { Center, Text } from "@chakra-ui/react"
import { ThemeProvider, useThemeContext } from "components/[guild]/ThemeContext"
import Layout from "components/common/Layout"
import { GuessGuildByLogo } from "components/guess-the-guild/GuessGuildByLogo"
import { ReactNode, useState } from "react"

function GuessTheGuild() {
  const [score, setScore] = useState(0)
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
      <Center>
        <GuessGuildByLogo />
      </Center>
    </>
  )
}

function LayoutWrapper({ children }: { children: ReactNode }) {
  const { textColor, localThemeColor, localBackgroundImage } = useThemeContext()
  return (
    <Layout
      backgroundOffset={260}
      textColor={textColor}
      background={localThemeColor}
      backgroundImage={localBackgroundImage}
      ogTitle="Guess the guild"
      showFooter={false}
    >
      {children}
    </Layout>
  )
}

export default function () {
  return (
    <ThemeProvider>
      <LayoutWrapper>
        <GuessTheGuild />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
