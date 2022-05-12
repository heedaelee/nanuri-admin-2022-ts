import React from "react";
import styled from "styled-components";
import Theme from "../../lib/Theme";
import Avatar from "@mui/material/Avatar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useLocation } from "react-router-dom";
import { navigationItems } from "../../config/index";
import LeftSideBottom from "../molecules/LeftSideBottom";

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  const location = useLocation();
  

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
      <LeftSideBottom />
      {/* 하단 끝*/}
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

export default Sidebar;
