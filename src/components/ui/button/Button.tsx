import styled from "styled-components/native";
import { COLORS } from "../../../constants/colors";

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
};

const Button: React.FC<ButtonProps> = ({ children, width }) => {
  return (
    <ButtonPressable style={{ width }}>
      <ButtonText>{children}</ButtonText>
    </ButtonPressable>
  );
};

export default Button;
