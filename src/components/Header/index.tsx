import { VStack, HStack, Icon, Text } from "native-base";
import { FontAwesome, Fontisto } from "@expo/vector-icons";

type HeaderProps = {
  leftIcon?: string;
  title: string;
  rightIcon?: string;
};

export const Header = ({ leftIcon, title, rightIcon }: HeaderProps) => {
  return (
    <VStack>
      <HStack
        bg="base.gray100"
        pt={12}
        px={8}
        alignItems="center"
        justifyContent="start"
      >
        <Icon as={Fontisto} name={leftIcon} size="5" color="#8047F8" />

        <Text
          fontFamily="roboto_regular"
          fontSize="text_Sm"
          color="base.gray900"
          ml={1}
          flex={1}
        >
          {title}
        </Text>

        <Icon as={FontAwesome} name={rightIcon} size="5" color="#C47F17" />
      </HStack>
    </VStack>
  );
};
