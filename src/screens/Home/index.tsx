import { View, Text } from "native-base";

export const Home = () => {
  return (
    <View
      flex={1}
      backgroundColor="base.gray100"
      alignItems="center"
      justifyContent="center"
    >
      <Text color="base.gray400">Find the perfect coffee during your day.</Text>
    </View>
  );
};
