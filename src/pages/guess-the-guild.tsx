import { Center } from "@chakra-ui/react"
import { ThemeProvider, useThemeContext } from "components/[guild]/ThemeContext"
import Layout from "components/common/Layout"
import { GameMenu } from "components/guess-the-guild/components/GameMenu"
import { GuessGuildByLogo } from "components/guess-the-guild/components/GuessGuildByLogo"
import { PairLogosToGuilds } from "components/guess-the-guild/components/PairLogosToGuilds"
import { ScoreCounter } from "components/guess-the-guild/components/ScoreCounter"
import {
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react"

export type RoundState = "start" | "fail" | "pass"
interface GameDriverProps {
  setRoundState: Dispatch<SetStateAction<RoundState>>
}
export type GameDriver = FunctionComponent<GameDriverProps>
export type Difficulty = (typeof DIFFICULTIES)[number]
interface GameMode {
  Driver: GameDriver
  scoreReward: number
}

export const DIFFICULTIES = ["easy", "medium", "hard"] as const
const GAMEMODES: GameMode[] = [
  { Driver: GuessGuildByLogo, scoreReward: 1 },
  { Driver: PairLogosToGuilds, scoreReward: 2 },
]

function getRandomGameModeIndex() {
  return Math.floor(GAMEMODES.length * Math.random())
}

function GuessTheGuild() {
  const [roundState, setRoundState] = useState<RoundState>("start")
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [activeGameModeIndex, setActiveGameModeIndex] = useState(
    getRandomGameModeIndex()
  )
  const [score, setScore] = useState(0)
  const [roundCount, setRoundCount] = useState(0)

  const activeGameMode = GAMEMODES[activeGameModeIndex]
  const { Driver } = activeGameMode

  useEffect(() => {
    console.log("playing in difficulty", difficulty)
  }, [difficulty])

  useEffect(() => {
    switch (roundState) {
      case "fail": {
        setScore(0)
        setRoundState("start")
        break
      }
      case "pass": {
        setScore((prev) => prev + activeGameMode.scoreReward)
        setRoundState("start")
        break
      }
      case "start": {
        setRoundCount((prev) => (prev += 1))
        setActiveGameModeIndex(getRandomGameModeIndex())
      }
      default: {
        break
      }
    }
  }, [roundState])

  return (
    <>
      {difficulty !== null && <ScoreCounter score={score} />}
      <Center>
        {difficulty === null ? (
          <GameMenu setDifficulty={setDifficulty} />
        ) : (
          <Driver setRoundState={setRoundState} key={roundCount} />
        )}
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
