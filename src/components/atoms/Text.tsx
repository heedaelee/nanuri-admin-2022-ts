import React from "react";
import styled from "styled-components";
import Theme from "../../lib/Theme";
import { rem } from "../../lib/util/otherUtills";

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
    <ErrorTextStyled color={color} size={size} style={style}>
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

interface NoNameTextProps {
  children: any;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}

export const NoNameText = ({
  children,
  color,
  size,
  style,
}: NoNameTextProps) => {
  return (
    <NoNameTextStyled color={color} size={size} style={style}>
      {children}
    </NoNameTextStyled>
  );
};

const NoNameTextStyled = styled.div<NoNameTextProps>`
  font-size: ${({ size }) => rem(size) || rem(12)};
  color: ${({ color }) => color || Theme.color.gray[1]};
`;
