import styled from "styled-components/native";
import { COLORS } from "../../../constants/colors";
import { GestureResponderEvent } from "react-native";

const ButtonPressable = styled.Pressable`
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${COLORS.pink};
  border-radius: 4px;
  width: 49%;
  height: 40px;
`;
const ButtonText = styled.Text`
  font-size: 16px;
  color: ${COLORS.white};
`;

type ButtonProps = {
  disabled?: boolean;
  children: string;
  width?: string;
  height?: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  width,
  onPress,
  disabled,
  height,
}) => {
  return (
    <ButtonPressable
      disabled={disabled}
      onPress={onPress}
      style={{ width, height }}
    >
      <ButtonText style={disabled && { opacity: 0.2 }}>{children}</ButtonText>
    </ButtonPressable>
  );
};

export default Button;
