import { View, ActivityIndicator } from "react-native";

type LoadingProps = {
  spinnerColor: string;
  size: number;
};

export const Loading = ({ spinnerColor, size }: LoadingProps) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#272221",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator color={spinnerColor} size={size} />
    </View>
  );
};
