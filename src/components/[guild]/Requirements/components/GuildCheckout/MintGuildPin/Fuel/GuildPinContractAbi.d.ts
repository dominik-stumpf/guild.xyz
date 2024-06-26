/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.60.0
  Forc version: 0.44.0
  Fuel-Core version: 0.20.5
*/

import type {
  BigNumberish,
  BN,
  BytesLike,
  Contract,
  DecodedValue,
  EvmAddress,
  FunctionFragment,
  Interface,
  InvokeFunction,
} from "fuels"

import type { Enum, Option } from "./common"

export enum AccessErrorInput {
  NotOwner = "NotOwner",
}
export enum AccessErrorOutput {
  NotOwner = "NotOwner",
}
export enum GuildActionInput {
  Joined = "Joined",
  Owner = "Owner",
  Admin = "Admin",
}
export enum GuildActionOutput {
  Joined = "Joined",
  Owner = "Owner",
  Admin = "Admin",
}
export type IdentityInput = Enum<{
  Address: AddressInput
  ContractId: ContractIdInput
}>
export type IdentityOutput = Enum<{
  Address: AddressOutput
  ContractId: ContractIdOutput
}>
export enum InitErrorInput {
  AlreadyInitialized = "AlreadyInitialized",
  NotInitialized = "NotInitialized",
}
export enum InitErrorOutput {
  AlreadyInitialized = "AlreadyInitialized",
  NotInitialized = "NotInitialized",
}
export type StateInput = Enum<{
  Uninitialized: []
  Initialized: IdentityInput
  Revoked: []
}>
export type StateOutput = Enum<{
  Uninitialized: []
  Initialized: IdentityOutput
  Revoked: []
}>
export enum TokenErrorInput {
  AlreadyClaimed = "AlreadyClaimed",
  AlreadyBurned = "AlreadyBurned",
  ExpiredSignature = "ExpiredSignature",
  InvalidSignature = "InvalidSignature",
  InvalidAssetId = "InvalidAssetId",
  InvalidContractId = "InvalidContractId",
  InsufficientAmount = "InsufficientAmount",
  PinIdDoesNotExist = "PinIdDoesNotExist",
  NotPinOwner = "NotPinOwner",
  CouldNotRemoveEntry = "CouldNotRemoveEntry",
}
export enum TokenErrorOutput {
  AlreadyClaimed = "AlreadyClaimed",
  AlreadyBurned = "AlreadyBurned",
  ExpiredSignature = "ExpiredSignature",
  InvalidSignature = "InvalidSignature",
  InvalidAssetId = "InvalidAssetId",
  InvalidContractId = "InvalidContractId",
  InsufficientAmount = "InsufficientAmount",
  PinIdDoesNotExist = "PinIdDoesNotExist",
  NotPinOwner = "NotPinOwner",
  CouldNotRemoveEntry = "CouldNotRemoveEntry",
}

export type AddressInput = { value: string }
export type AddressOutput = AddressInput
export type AssetIdInput = { value: string }
export type AssetIdOutput = AssetIdInput
export type BytesInput = { buf: RawBytesInput; len: BigNumberish }
export type BytesOutput = { buf: RawBytesOutput; len: BN }
export type ClaimParametersInput = {
  recipient: AddressInput
  action: GuildActionInput
  user_id: BigNumberish
  guild_id: BigNumberish
  guild_name: string
  created_at: BigNumberish
  signed_at: BigNumberish
  chain_id: BigNumberish
  cid: string
  admin_treasury: IdentityInput
  admin_fee: BigNumberish
  contract_id: ContractIdInput
}
export type ClaimParametersOutput = {
  recipient: AddressOutput
  action: GuildActionOutput
  user_id: BN
  guild_id: BN
  guild_name: string
  created_at: BN
  signed_at: BN
  chain_id: BN
  cid: string
  admin_treasury: IdentityOutput
  admin_fee: BN
  contract_id: ContractIdOutput
}
export type ContractIdInput = { value: string }
export type ContractIdOutput = ContractIdInput
export type ContractInitializedInput = {
  owner: IdentityInput
  signer: EvmAddress
  treasury: IdentityInput
  fee: BigNumberish
}
export type ContractInitializedOutput = {
  owner: IdentityOutput
  signer: EvmAddress
  treasury: IdentityOutput
  fee: BN
}
export type FeeChangedInput = { old: BigNumberish; new: BigNumberish }
export type FeeChangedOutput = { old: BN; new: BN }
export type OwnerChangedInput = { old: IdentityInput; new: IdentityInput }
export type OwnerChangedOutput = { old: IdentityOutput; new: IdentityOutput }
export type PinBurnedInput = { pin_owner: AddressInput; pin_id: BigNumberish }
export type PinBurnedOutput = { pin_owner: AddressOutput; pin_id: BN }
export type PinMintedInput = { recipient: AddressInput; pin_id: BigNumberish }
export type PinMintedOutput = { recipient: AddressOutput; pin_id: BN }
export type RawBytesInput = { ptr: BigNumberish; cap: BigNumberish }
export type RawBytesOutput = { ptr: BN; cap: BN }
export type SignerChangedInput = { old: EvmAddress; new: EvmAddress }
export type SignerChangedOutput = SignerChangedInput
export type StringInput = { bytes: BytesInput }
export type StringOutput = { bytes: BytesOutput }
export type TreasuryChangedInput = { old: IdentityInput; new: IdentityInput }
export type TreasuryChangedOutput = { old: IdentityOutput; new: IdentityOutput }

export type GuildPinContractAbiConfigurables = {
  NAME: string
  SYMBOL: string
  OWNER: IdentityInput
  SIGNER: string
  SIGNATURE_VALIDITY_PERIOD: BigNumberish
  TREASURY: IdentityInput
  FEE: BigNumberish
}

interface GuildPinContractAbiInterface extends Interface {
  functions: {
    initialize: FunctionFragment
    set_fee: FunctionFragment
    set_owner: FunctionFragment
    set_signer: FunctionFragment
    set_treasury: FunctionFragment
    fee: FunctionFragment
    signer: FunctionFragment
    treasury: FunctionFragment
    burn: FunctionFragment
    claim: FunctionFragment
    balance_of: FunctionFragment
    pin_id_by_address: FunctionFragment
    pin_id_by_user_id: FunctionFragment
    pin_owner: FunctionFragment
    total_minted: FunctionFragment
    total_minted_per_guild: FunctionFragment
    owner: FunctionFragment
    decimals: FunctionFragment
    name: FunctionFragment
    symbol: FunctionFragment
    total_assets: FunctionFragment
    total_supply: FunctionFragment
    encoded_metadata: FunctionFragment
    metadata: FunctionFragment
  }

  encodeFunctionData(functionFragment: "initialize", values: []): Uint8Array
  encodeFunctionData(functionFragment: "set_fee", values: [BigNumberish]): Uint8Array
  encodeFunctionData(
    functionFragment: "set_owner",
    values: [IdentityInput]
  ): Uint8Array
  encodeFunctionData(
    functionFragment: "set_signer",
    values: [EvmAddress]
  ): Uint8Array
  encodeFunctionData(
    functionFragment: "set_treasury",
    values: [IdentityInput]
  ): Uint8Array
  encodeFunctionData(functionFragment: "fee", values: []): Uint8Array
  encodeFunctionData(functionFragment: "signer", values: []): Uint8Array
  encodeFunctionData(functionFragment: "treasury", values: []): Uint8Array
  encodeFunctionData(functionFragment: "burn", values: [BigNumberish]): Uint8Array
  encodeFunctionData(
    functionFragment: "claim",
    values: [ClaimParametersInput, string]
  ): Uint8Array
  encodeFunctionData(
    functionFragment: "balance_of",
    values: [AddressInput]
  ): Uint8Array
  encodeFunctionData(
    functionFragment: "pin_id_by_address",
    values: [AddressInput, BigNumberish, GuildActionInput]
  ): Uint8Array
  encodeFunctionData(
    functionFragment: "pin_id_by_user_id",
    values: [BigNumberish, BigNumberish, GuildActionInput]
  ): Uint8Array
  encodeFunctionData(
    functionFragment: "pin_owner",
    values: [BigNumberish]
  ): Uint8Array
  encodeFunctionData(functionFragment: "total_minted", values: []): Uint8Array
  encodeFunctionData(
    functionFragment: "total_minted_per_guild",
    values: [BigNumberish]
  ): Uint8Array
  encodeFunctionData(functionFragment: "owner", values: []): Uint8Array
  encodeFunctionData(
    functionFragment: "decimals",
    values: [AssetIdInput]
  ): Uint8Array
  encodeFunctionData(functionFragment: "name", values: [AssetIdInput]): Uint8Array
  encodeFunctionData(functionFragment: "symbol", values: [AssetIdInput]): Uint8Array
  encodeFunctionData(functionFragment: "total_assets", values: []): Uint8Array
  encodeFunctionData(
    functionFragment: "total_supply",
    values: [AssetIdInput]
  ): Uint8Array
  encodeFunctionData(
    functionFragment: "encoded_metadata",
    values: [BigNumberish]
  ): Uint8Array
  encodeFunctionData(
    functionFragment: "metadata",
    values: [BigNumberish]
  ): Uint8Array

  decodeFunctionData(functionFragment: "initialize", data: BytesLike): DecodedValue
  decodeFunctionData(functionFragment: "set_fee", data: BytesLike): DecodedValue
  decodeFunctionData(functionFragment: "set_owner", data: BytesLike): DecodedValue
  decodeFunctionData(functionFragment: "set_signer", data: BytesLike): DecodedValue
  decodeFunctionData(functionFragment: "set_treasury", data: BytesLike): DecodedValue
  decodeFunctionData(functionFragment: "fee", data: BytesLike): DecodedValue
  decodeFunctionData(functionFragment: "signer", data: BytesLike): DecodedValue
  decodeFunctionData(functionFragment: "treasury", data: BytesLike): DecodedValue
  decodeFunctionData(functionFragment: "burn", data: BytesLike): DecodedValue
  decodeFunctionData(functionFragment: "claim", data: BytesLike): DecodedValue
  decodeFunctionData(functionFragment: "balance_of", data: BytesLike): DecodedValue
  decodeFunctionData(
    functionFragment: "pin_id_by_address",
    data: BytesLike
  ): DecodedValue
  decodeFunctionData(
    functionFragment: "pin_id_by_user_id",
    data: BytesLike
  ): DecodedValue
  decodeFunctionData(functionFragment: "pin_owner", data: BytesLike): DecodedValue
  decodeFunctionData(functionFragment: "total_minted", data: BytesLike): DecodedValue
  decodeFunctionData(
    functionFragment: "total_minted_per_guild",
    data: BytesLike
  ): DecodedValue
  decodeFunctionData(functionFragment: "owner", data: BytesLike): DecodedValue
  decodeFunctionData(functionFragment: "decimals", data: BytesLike): DecodedValue
  decodeFunctionData(functionFragment: "name", data: BytesLike): DecodedValue
  decodeFunctionData(functionFragment: "symbol", data: BytesLike): DecodedValue
  decodeFunctionData(functionFragment: "total_assets", data: BytesLike): DecodedValue
  decodeFunctionData(functionFragment: "total_supply", data: BytesLike): DecodedValue
  decodeFunctionData(
    functionFragment: "encoded_metadata",
    data: BytesLike
  ): DecodedValue
  decodeFunctionData(functionFragment: "metadata", data: BytesLike): DecodedValue
}

export class GuildPinContractAbi extends Contract {
  interface: GuildPinContractAbiInterface
  functions: {
    initialize: InvokeFunction<[], void>
    set_fee: InvokeFunction<[fee: BigNumberish], void>
    set_owner: InvokeFunction<[owner: IdentityInput], void>
    set_signer: InvokeFunction<[signer: EvmAddress], void>
    set_treasury: InvokeFunction<[treasury: IdentityInput], void>
    fee: InvokeFunction<[], BN>
    signer: InvokeFunction<[], string>
    treasury: InvokeFunction<[], IdentityOutput>
    burn: InvokeFunction<[pin_id: BigNumberish], void>
    claim: InvokeFunction<[params: ClaimParametersInput, signature: string], void>
    balance_of: InvokeFunction<[id: AddressInput], BN>
    pin_id_by_address: InvokeFunction<
      [user: AddressInput, guild_id: BigNumberish, action: GuildActionInput],
      Option<BN>
    >
    pin_id_by_user_id: InvokeFunction<
      [user_id: BigNumberish, guild_id: BigNumberish, action: GuildActionInput],
      Option<BN>
    >
    pin_owner: InvokeFunction<[pin_id: BigNumberish], Option<AddressOutput>>
    total_minted: InvokeFunction<[], BN>
    total_minted_per_guild: InvokeFunction<[guild_id: BigNumberish], BN>
    owner: InvokeFunction<[], StateOutput>
    decimals: InvokeFunction<[asset: AssetIdInput], Option<number>>
    name: InvokeFunction<[asset: AssetIdInput], Option<StringOutput>>
    symbol: InvokeFunction<[asset: AssetIdInput], Option<StringOutput>>
    total_assets: InvokeFunction<[], BN>
    total_supply: InvokeFunction<[asset: AssetIdInput], Option<BN>>
    encoded_metadata: InvokeFunction<[pin_id: BigNumberish], StringOutput>
    metadata: InvokeFunction<[pin_id: BigNumberish], StringOutput>
  }
}
