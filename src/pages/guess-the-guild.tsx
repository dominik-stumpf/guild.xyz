import { Center } from "@chakra-ui/react"
import { ThemeProvider, useThemeContext } from "components/[guild]/ThemeContext"
import Layout from "components/common/Layout"
import { GameMenu } from "components/guess-the-guild/components/GameMenu"
import { GuessGuildByLogo } from "components/guess-the-guild/components/GuessGuildByLogo"
import { PairLogosToGuilds } from "components/guess-the-guild/components/PairLogosToGuilds"
import { ScoreCounter } from "components/guess-the-guild/components/ScoreCounter"
import {
  DIFFICULTIES,
  GUILD_COUNT,
  RECORD_KEYNAME,
} from "components/guess-the-guild/constants"
import {
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react"
import useSWRImmutable from "swr/immutable"
import { GuildBase } from "types"
import { shuffle } from "utils/shuffle"

// not sure where to put the types
type RoundState = "start" | "fail" | "pass" | "finish"
interface GameDriverProps {
  setRoundState: Dispatch<SetStateAction<RoundState>>
  guilds: GuildBase[]
}
export type GameDriver = FunctionComponent<GameDriverProps>
export type Difficulty = (typeof DIFFICULTIES)[number]
interface GameMode {
  Driver: GameDriver
  scoreReward: number
}

export const GAMEMODES: GameMode[] = [
  { Driver: GuessGuildByLogo, scoreReward: 1 },
  { Driver: PairLogosToGuilds, scoreReward: 2 },
] as const

// since only the first 200 guilds could be fetched using offset from API, difficulties are adjusted accordingly
const DIFFICULTY_POOL_SIZE = {
  easy: 50,
  medium: 100,
  hard: 200,
} as const satisfies Record<Difficulty, number>

function retrieveLocalStorageRecord() {
  return parseInt(localStorage.getItem(RECORD_KEYNAME)) || 0
}

function syncLocalStorageRecord(currentScore: number) {
  const storageScore = retrieveLocalStorageRecord()
  if (currentScore > storageScore) {
    localStorage.setItem(RECORD_KEYNAME, currentScore.toString())
  }
}

function getRandomGameModeIndex() {
  return Math.floor(GAMEMODES.length * Math.random())
}

const GUILD_REQUEST =
  "https://api.guild.xyz/v2/guilds?limit=1000&offset=0&order=FEATURED"

async function fetchGuilds() {
  return (await fetch(GUILD_REQUEST)).json()
}

function GuessTheGuild() {
  const [roundState, setRoundState] = useState<RoundState>("start")
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [currentGameModeIndex, setCurrentGameModeIndex] = useState(
    getRandomGameModeIndex()
  )
  const [score, setScore] = useState(0)
  const [record, setRecord] = useState(0)
  const [roundCount, setRoundCount] = useState(0)
  const {
    data: guilds,
    error,
    isLoading,
  } = useSWRImmutable<GuildBase[]>(GUILD_REQUEST, fetchGuilds)

  const fetchOffsetLimit = DIFFICULTY_POOL_SIZE[difficulty]

  const guildPool = useMemo(() => {
    if (guilds) {
      return guilds
        .slice(0, fetchOffsetLimit)
        .filter((guild) => guild?.imageUrl?.length > 0)
    }
  }, [difficulty, guilds])

  const guildsInRound = useMemo(() => {
    if (guildPool) {
      shuffle(guildPool)
      return guildPool.slice(0, GUILD_COUNT)
    }
  }, [guildPool, roundCount])

  const activeGameMode = GAMEMODES[currentGameModeIndex]
  const { Driver } = activeGameMode

  useEffect(() => {
    setRecord(retrieveLocalStorageRecord())
  }, [])

  useEffect(() => {
    // sync every update to keep localStorage the single source of truth
    syncLocalStorageRecord(score)
    if (score > record) {
      setRecord(score)
    }
  }, [score])

  useEffect(() => {
    switch (roundState) {
      case "fail": {
        setScore(0)
        break
      }
      case "pass": {
        setScore((prev) => prev + activeGameMode.scoreReward)
        setRoundState("start")
        break
      }
      case "finish": {
        setRoundState("start")
        break
      }
      case "start": {
        setRoundCount((prev) => (prev += 1))
        setCurrentGameModeIndex(getRandomGameModeIndex())
      }
      default: {
        break
      }
    }
  }, [roundState])

  if (error) {
    return <Center>Failed to find guild cards</Center>
  }

  return (
    <>
      {difficulty !== null && <ScoreCounter score={score} record={record} />}
      <Center>
        {difficulty === null ? (
          <GameMenu setDifficulty={setDifficulty} />
        ) : (
          isLoading || (
            <Driver
              setRoundState={setRoundState}
              key={roundCount}
              guilds={guildsInRound}
            />
          )
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
