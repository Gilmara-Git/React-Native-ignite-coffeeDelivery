import { Button, IButtonProps, Text } from "native-base";

type SizeButton = IButtonProps & {
  title: string;
  active?: boolean;
  color: string;
  pressedColor: string;
  height: number;
};

export const SystemButton = ({
  title,
  variant = "solid",
  active,
  color,
  pressedColor,
  height,
  ...rest
}: SizeButton) => {
  return (
    <Button
      variant={active ? "outline" : "solid"}
      height={height}
      width={24}
      rounded="md"
      borderWidth={active ? 1.5 : 0}
      borderColor={active ? "product.brand_purple" : "transparent"}
      _pressed={{
        bg: pressedColor,
      }}
      {...rest}
    >
      <Text
        fontFamily="roboto_regular"
        fontSize="text_Sm"
        color={active ? "product.brand_purple" : color}
      >
        {title.toUpperCase()}
      </Text>
    </Button>
  );
};
