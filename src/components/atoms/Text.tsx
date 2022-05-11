import React from "react";
import styled from "styled-components";
import Theme from "../../lib/Theme";
import { darken, lighten } from "polished";

interface TextProps {
  children: any;
  style?: React.CSSProperties;
  size: "medium" | "full" | "modal" | "small";
}

interface ErrorTextProps {
  children: any;
  color?: string;
  size?: string;
  style?: React.CSSProperties;
}

export const Text = ({}: TextProps) => {
  return <></>;
};

export const ErrorText = ({
  children,
  color,
  size,
  style,
}: ErrorTextProps) => {
  return (
    <ErrorTextStyled
      color={color}
      size={size}
      style={style}
    >
      {children}
    </ErrorTextStyled>
  );
};

const ErrorTextStyled = styled.p<ErrorTextProps>`
  position: absolute;
  /* top: 58px; */
  margin-top: 5px;
  color: ${({ color }) => color || "#faa1a1"};
  font-size: ${({ size }: any) => size || "14px"};
  font-family: "SpoqaHanSansNeo-Medium";
`;
