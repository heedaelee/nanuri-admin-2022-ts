import React, { Children } from "react";
import styled, { css } from "styled-components";
import Theme from "../../lib/Theme";

interface CardProps {
  children?: any;
  onClick?: (any?: any) => void;
  style?: React.CSSProperties;
}

const Card = ({ children, onClick, style }: CardProps) => {
  return (
    <StyledCard
      onClick={onClick ? () => onClick() : undefined}
      style={style}
    >
      {children}
    </StyledCard>
  );
};

const StyledCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  border-radius: 8px;

  background: #ffffff;
  ${Theme.cardBoxShadow}
  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
    `}
`;

export default Card;
