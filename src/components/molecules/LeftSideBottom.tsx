import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { navigationItems } from "../../config/index";
import Theme from "../../lib/Theme";
// import { useLocation } from "react-router-dom";
// import Link from "@mui/material/Link";
import { useMediaQuery, useTheme } from "@mui/material";

interface LeftSideBottomProps {
  handleToggleDrawer?: () => void;
}

const LeftSideBottom = ({
  handleToggleDrawer,
}: LeftSideBottomProps) => {
  let location = useLocation();
  let { pathname } = location;
  // console.log("location : ", location);
  const theme = useTheme();

  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

  console.log(`LeftSideBottom에서 isPhone : ${isPhone}`);

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
            <StyledLink
              key={item.text}
              to={item.to}
              onClick={handleToggleDrawer}
            >
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
  height: 100%;
  flex: 7.5;
`;

// const StyledLink = styled(Link)(({ theme }) => {
//   return {};
// });

// const StyledActiveLink = styled(Link)(({ theme }) => {
//   return {};
// });

const StyledLink = styled(Link)`
  /* border: 1px solid red; */
  text-decoration: none;
  /* margin-left: 5.6rem; */
  padding: 0.8rem;
  //글꼴
  color: ${Theme.color.gray[1]};
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 35px;
  @media (max-width: 600px) {
    font-size: 26px;
  }
`;
const StyledActiveLink = styled(Link)`
  /* border: 1px solid yellow; */
  text-decoration: none;
  /* margin-left: 4.5vw; */
  padding: 0.8rem;
  //글꼴
  color: ${Theme.color.black};
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 35px;
  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const MenuRow = styled.div`
  justify-content: center;
  width: 99%;
  height: 16%;
  display: flex;
  align-items: center;
  /* border: 1px solid black; */
`;

export default LeftSideBottom;
