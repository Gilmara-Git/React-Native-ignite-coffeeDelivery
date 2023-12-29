import { Spinner, Center } from "native-base";

type LoadingProps = {
  spinnerColor: string;
  size: string;
};

export const Loading = ({ spinnerColor, size }: LoadingProps) => {
  return (
    <Center flex={1} backgroundColor="base.gray100">
      <Spinner color={spinnerColor} size={size} />
    </Center>
  );
};
