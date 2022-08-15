import React, { Children } from "react";
// import styled, { css } from "styled-components";
import MyTheme from "../../lib/Theme";
import { styled, SxProps, Theme } from "@mui/material/styles";
import styledComponent from "styled-components";
interface CardProps {
  children?: any;
  onClick?: (any?: any) => void;
  sx?: SxProps<Theme>;
}

const Card = ({ children, onClick, sx }: CardProps) => {
  return (
    <StyledCard
      onClick={onClick ? () => onClick() : undefined}
      sx={sx}
    >
      {children}
    </StyledCard>
  );
};

const StyledCard = styled("div")(() => {
  return {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "15px 20px",
    borderRadius: "8px",
    background: "#ffffff",
    boxShadow: MyTheme.cardBoxShadowJS,
  };
});

// const StyledCard = styledComponent.div`
//   flex: 1;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   padding: 15px 20px;
//   border-radius: 8px;

//   background: #ffffff;
//   ${Theme.cardBoxShadow}
//   ${(props) =>
//     props.onClick &&
//     css`
//       cursor: pointer;
//     `}
// `;

export default Card;
