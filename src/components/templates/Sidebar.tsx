import React from "react";
import styled from "styled-components";
import Theme from "../../lib/Theme";
import Avatar from "@mui/material/Avatar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  return (
    <LeftSide>
      {/* 상단 */}
      <LeftSideTop>
        <TitleRow>
          <Title>최대표</Title>
        </TitleRow>
        <ProfileRow>
          <Avatar
            alt="profile"
            sx={{ width: 56, height: 56, bgcolor: "#FAFAFC" }}
          />
          <ProfleLabel>시니어 운영자</ProfleLabel>
        </ProfileRow>
        <IconRow>
          <IconItem>
            <SettingsOutlinedIcon sx={{ color: "#36373B" }} />
          </IconItem>
          <IconItem>
            <NotificationsNoneOutlinedIcon />
          </IconItem>
          <IconItem>
            <SearchOutlinedIcon />
          </IconItem>
        </IconRow>
      </LeftSideTop>

      {/* 하단 */}
      <LeftSideBottom>
        <Link to="." style={{ textDecoration: "none" }}>
          <MenuRow>대시보드</MenuRow>
        </Link>
        <Link to="./users" style={{ textDecoration: "none" }}>
          <MenuRow>회원 관리</MenuRow>
        </Link>
        <Link to="./contents" style={{ textDecoration: "none" }}>
          <MenuRow>게시물 관리</MenuRow>
        </Link>
      </LeftSideBottom>
    </LeftSide>
  );
};

const LeftSide = styled.div`
  display: flex;
  flex: 2.2;
  height: 100%;
  flex-direction: column;
`;


const LeftSideTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  flex: 2.5;
  border-bottom: 4px solid ${Theme.color.blue[1]};
`;

const TitleRow = styled.div``;
const Title = styled.p`
  color: ${Theme.color.gray[3]};
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
`;
const ProfileRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfleLabel = styled.p`
  font-weight: 800;
  font-size: 14px;
  line-height: 17px;
  color: ${Theme.color.gray[2]};
`;
const IconRow = styled.div`
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const IconItem = styled.div`
  & + & {
    margin-left: 20px;
  }
  cursor: pointer;
`;

//NOTE:하단 css
const LeftSideBottom = styled.div`
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 7.5;
`;

const MenuRow = styled.div`
  margin-left: 6vw;
  margin-top: 7vh;
  padding: 0.3vw;
  color: ${Theme.color.gray[1]};
  width: fit-content;

  //글꼴
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  /* font-size: 28px; */
  font-size: 28px;
  line-height: 35px;
  /* border: 1px solid black; */
`;

export default Sidebar;
