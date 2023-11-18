import { useRadio, Box } from "@chakra-ui/react";

export function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        borderColor={"gray.600"}
        fontSize={"sm"}
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        px={3}
        py={1}
      >
        {props.children}%
      </Box>
    </Box>
  );
}