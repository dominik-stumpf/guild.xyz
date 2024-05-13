import { Button, UseRadioProps, useRadio } from "@chakra-ui/react"

export function ValidatableRadioButton(
  props: UseRadioProps & {
    label: string
    disabled: boolean
    incorrect: boolean
    children: string
  }
) {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  const { label, isChecked, disabled, incorrect } = props

  return (
    <Button
      as="label"
      {...checkbox}
      cursor="pointer"
      w="full"
      colorScheme={isChecked ? "indigo" : "gray"}
      textDecoration={incorrect && "line-through"}
      textDecorationThickness="3px"
      isDisabled={disabled}
    >
      <input {...input} disabled={disabled} />
      {label}
    </Button>
  )
}
