import React from "react";
import styled, { CSSProperties } from "styled-components";
import Theme from "../../lib/Theme";

interface CardItemProps {
  title: string;
  content: string;
  unit?: string;
  contentStyle?: CSSProperties | undefined;
}

const CardItem = ({
  title,
  content,
  unit,
  contentStyle,
}: CardItemProps) => {
  return (
    <CardItemWrapper>
      <CardTitle>{title}</CardTitle>
      <CardContent
        style={contentStyle}
      >{`${content} ${unit}`}</CardContent>
    </CardItemWrapper>
  );
};

const CardItemWrapper = styled.div`
  /* border: 1px solid; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  & + & {
    margin-left: 10px;
  }
  height: 100%;
`;

const CardTitle = styled.p`
  /* border: 1px solid red; */
  text-align: center;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 35px;
  color: ${Theme.color.gray[3]};
  margin: 0;
`;
const CardContent = styled.p`
  /* border: 1px solid green; */
  text-align: center;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 21px;
  line-height: 35px;
  color: ${Theme.color.green[2]};
  margin: 0;
`;

export default CardItem;
