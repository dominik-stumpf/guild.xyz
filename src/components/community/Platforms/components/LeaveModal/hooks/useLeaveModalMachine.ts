import { useWeb3React } from "@web3-react/core"
import { useMachine } from "@xstate/react"
import { useCommunity } from "components/community/Context"
import { MetaMaskError } from "utils/processMetaMaskError"
import { assign, createMachine, DoneInvokeEvent } from "xstate"

type ContextType = {
  error: MetaMaskError | null
}

const leaveModalMachine = createMachine<ContextType, DoneInvokeEvent<any>>({
  initial: "idle",
  context: {
    error: null,
  },
  states: {
    idle: {
      on: { LEAVE: "fetching" },
    },
    fetching: {
      invoke: {
        src: "leavePlatform",
        onDone: {
          // TODO: will show a success notification and close the modal
          target: "idle",
        },
        onError: {
          target: "error",
        },
      },
    },
    error: {
      on: { LEAVE: "fetching", CLOSE_MODAL: "idle" },
      entry: assign({
        error: (_, event) => event.data,
      }),
      exit: assign({
        error: () => null,
      }),
    },
  },
})

const useLeaveModalMachine = (platform: string): any => {
  const { id: communityId } = useCommunity()
  const { account } = useWeb3React()

  return useMachine(leaveModalMachine, {
    services: {
      // ! This is a dummy function for the demo !
      // Depending on what the returned error will look like, we might need to add a new type to ErrorType in Error.tsx
      leavePlatform: async (): Promise<MetaMaskError | null> => {
        console.log({ account, platform, communityId })
        return new Promise((resolve, reject) => {
          setTimeout(() => reject(new Error()), 100)
        })
      },
    },
  })
}

export default useLeaveModalMachine
