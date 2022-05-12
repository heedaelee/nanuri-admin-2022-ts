import React from "react";
import styled, { css } from "styled-components";
import Theme from "../../lib/Theme";
import { darken, lighten } from "polished";

interface ButtonProps {
  children: any;
  onClick?: (any?: any) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  size: "medium" | "full" | "modal" | "small";
  animation?: "active";
}

const Button = ({
  children = "버튼",
  onClick,
  disabled,
  style,
  size = "medium",
  animation,
}: ButtonProps) => {
  return (
    <StyledButton
      onClick={onClick ? () => onClick() : undefined}
      size={size}
      disabled={disabled}
      style={style}
      animation={animation}
    >
      {children}
    </StyledButton>
  );
};

//일단 307px로
//TODO: heigt나 등등도 나중에 점차점차 처리해주기!! 이렇게 함수로 만들어서!
const handleWidthType = (size: ButtonProps["size"]) => {
  switch (size) {
    case "medium":
      return "307px";
    case "full":
      return "307px";
    case "modal":
      return "307px";
    case "small":
      return "307px";
    default:
      return "307px";
  }
};

const handleHeightType = (size: ButtonProps["size"]) => {
  switch (size) {
    case "medium":
      return "58px";
    case "full":
      return "58px";
    case "modal":
      return "58px";
    case "small":
      return "58px";
    default:
      return "58px";
  }
};

const StyledButton = styled.button<ButtonProps>`
  width: ${({ size }) => handleWidthType(size)};
  height: ${({ size }) => handleHeightType(size)};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${Theme.color.green[1]};
  border-radius: 4px;
  border: none;
  cursor: pointer;
  /* transition: 0.25s; */
  transition-duration: 0.3s;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  color: white;

  //NOTE:animation이 active일때 active 작동!
  ${(props) =>
    props.animation &&
    css`
      &:active {
        box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
        background: ${darken(0.1, Theme.color.green[1])};
        transform: scale(1);
        position: relative;
        top: 4px;
      }
    `}

  //hover는 default로 
  &:hover {
    letter-spacing: 2px;
    transform: scale(1.2);
    background: ${lighten(0.1, Theme.color.green[1])};
  }
`;

export default Button;
