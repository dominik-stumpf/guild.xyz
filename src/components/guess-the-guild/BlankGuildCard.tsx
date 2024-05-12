import {
  HStack,
  SimpleGrid,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react"
import DisplayCard from "components/common/DisplayCard"
import GuildLogo from "components/common/GuildLogo"
import { Users } from "phosphor-react"
import { GuildBase } from "types"
import pluralize from "utils/pluralize"
import { PropsWithoutRef } from "react"
import { Rest } from "types"

interface Props extends PropsWithoutRef<Rest> {
  guildData: GuildBase
}

export function BlankGuildCard({ guildData, ...rest }: Props) {
  return (
    <DisplayCard bg="whiteAlpha.200" {...rest}>
      <SimpleGrid
        templateColumns={"3rem calc(100% - 5.25rem)"}
        gap={4}
        alignItems="center"
      >
        <GuildLogo
          position="relative"
          padding="4px"
          border="2px dashed"
          borderColor="whiteAlpha.500"
          backgroundClip="padding-box"
          imageUrl={guildData.imageUrl}
        />
        <VStack spacing={2} alignItems="start" w="full" maxW="full" mb="0.5" mt="-1">
          <HStack spacing={1}>
            <Text
              as="span"
              fontFamily="display"
              fontSize="lg"
              fontWeight="bold"
              letterSpacing="wide"
              maxW="full"
              noOfLines={1}
              wordBreak="break-all"
            >
              {guildData.name}
            </Text>
          </HStack>

          <Wrap zIndex="1">
            <Tag as="li">
              <TagLeftIcon as={Users} />
              <TagLabel>
                {new Intl.NumberFormat("en", { notation: "compact" }).format(
                  guildData.memberCount ?? 0
                )}
              </TagLabel>
            </Tag>
            <Tag as="li">
              <TagLabel>{pluralize(guildData.rolesCount ?? 0, "role")}</TagLabel>
            </Tag>
          </Wrap>
        </VStack>
      </SimpleGrid>
    </DisplayCard>
  )
}
