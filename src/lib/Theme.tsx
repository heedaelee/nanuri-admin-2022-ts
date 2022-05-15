/* eslint-disable import/no-anonymous-default-export */
import styled, { css } from "styled-components";

// 타입 선언
export interface ITheme {
  color: {
    white: string;
    black: string;
    blue: { 1: string; 2: string; 3: string };
    gray: { 1: string; 2: string; 3: string };
    green: { 1: string; 2: string };
  };
  fonts: {
    normal: string;
  };
}

export default {
  color: {
    white: "#FFFFFF",
    black: "#000000",
    blue: { 1: "#F9F9FB", 2: "#A3AED0", 3: "#2B3674" },
    gray: { 1: "#C7C7C7", 2: "#797979", 3: "#575756" },
    green: { 1: "#63B261", 2: "#00661D" },
  },
  fonts: {
    fontFamily: "PretendardVariable",
  },
  cardBoxShadow: css`
    box-shadow: 0px 2px 8px rgba(99, 99, 99, 0.2);
  `,
};
