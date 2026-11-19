import { memo } from "react";
import { Box, Spinner, Text, VStack, Icon } from "@chakra-ui/react";
import { TbDeviceTvOld } from "react-icons/tb";

function SpinLoader() {
  return (
    <VStack
      spacing={3}
      align="center"
      justify="center"
      py={{ base: 12, md: 16 }}
      role="status"
      aria-label="Loading MoreNews stories"
    >
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="112px"
        height="112px"
      >
        <Spinner
          thickness="3px"
          speed="0.9s"
          color="#ff7600"
          emptyColor="orange.100"
          size="xl"
          width="104px"
          height="104px"
        />

        <Icon
          as={TbDeviceTvOld}
          boxSize="72px"
          color="#ff7600"
          position="absolute"
          aria-hidden="true"
        />
      </Box>

      <Text
        fontSize="sm"
        color="gray.500"
        fontWeight="semibold"
        letterSpacing=".03em"
      >
        Loading MoreNews
      </Text>
    </VStack>
  );
}

export default memo(SpinLoader);
