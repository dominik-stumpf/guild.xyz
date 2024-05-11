import { Center } from "@chakra-ui/react"
import { ThemeProvider, useThemeContext } from "components/[guild]/ThemeContext"
import Layout from "components/common/Layout"
import { GuessGuildByLogo } from "components/guess-the-guild/GuessGuildByLogo"

function GuessTheGuild() {
  const { textColor, localThemeColor, localBackgroundImage } = useThemeContext()

  return (
    <Layout
      backgroundOffset={47}
      textColor={textColor}
      background={localThemeColor}
      backgroundImage={localBackgroundImage}
      ogTitle="Guess the guild"
      showFooter={false}
    >
      <Center>
        <GuessGuildByLogo />
      </Center>
    </Layout>
  )
}

export default function () {
  return (
    <ThemeProvider>
      <GuessTheGuild></GuessTheGuild>
    </ThemeProvider>
  )
}
