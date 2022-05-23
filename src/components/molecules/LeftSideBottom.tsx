import React from "react";
import styled from "styled-components";
import Theme from "../../lib/Theme";
import { navigationItems } from "../../config/index";
import { Link, useLocation } from "react-router-dom";

interface LeftSideBottomProps {}

const LeftSideBottom = ({}: LeftSideBottomProps) => {
  let location = useLocation();
  let { pathname } = location;
  // console.log("location : ", location);

  return (
    <BottomRow>
      {navigationItems.sidebar.map((item) => (
        <MenuRow key={item.text}>
          {/* {`${pathname}  ${item.to}`} */}
          {pathname === item.to ? (
            <StyledActiveLink key={item.text} to={item.to}>
              {item.name}
            </StyledActiveLink>
          ) : (
            <StyledLink key={item.text} to={item.to}>
              {item.name}
            </StyledLink>
          )}
        </MenuRow>
      ))}
    </BottomRow>
  );
};

//NOTE:하단 css
const BottomRow = styled.div`
  /* border: 1px solid red; */
  padding-top: 2vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 7.5;
`;

const StyledLink = styled(Link)`
  /* border: 1px solid red; */
  text-decoration: none;
  margin-left: 5.6rem;
  padding: 0.8rem;
  //글꼴
  color: ${Theme.color.gray[1]};
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 35px;
`;
const StyledActiveLink = styled(Link)`
  /* border: 1px solid yellow; */
  text-decoration: none;
  margin-left: 5.6rem;
  padding: 0.8rem;
  //글꼴
  color: ${Theme.color.black};
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 35px;
`;

const MenuRow = styled.div`
  /* border: 1px solid black; */
  width: 99%;
  height: 16%;
  display: flex;
  align-items: center;
  /* width: fit-content; */
  /* border: 1px solid black; */
`;

export default LeftSideBottom;
