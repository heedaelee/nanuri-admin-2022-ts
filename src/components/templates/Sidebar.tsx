import React, { useContext, useState } from "react";
import styled from "styled-components";
import Theme from "../../lib/Theme";
import Avatar from "@mui/material/Avatar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useLocation } from "react-router-dom";
import { navigationItems } from "../../config/index";
import LeftSideBottom from "../molecules/LeftSideBottom";
import Button from "@mui/material/Button";
import { rem } from "../../lib/util/otherUtills";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { UserContext } from "../../lib/userAuthProvider/userAuthProvider";

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  const { logout } = useContext(UserContext);

  // achoreElement 란 뜻, 연결해주는 엘리먼트라서 네이밍을 이렇게 한듯.
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl); //요소가 있으면 true, if not, false
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    handleClose();
    logout();
  };
  const handleProfile = () => {
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <LeftSide>
      {/* 상단 */}
      <LeftSideTop>
        <TitleRow>
          <Title>최대표</Title>
        </TitleRow>
        <ProfileRow>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              // border: "1px solid yellow",
              fontWeight: 800,
              fontSize: rem(14),
              color: Theme.color.gray[2],
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              alt="profile"
              sx={{ width: 56, height: 56, bgcolor: "#FAFAFC", mb: 2 }}
            />
            시니어 운영자
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem component={Link} onClick={handleClose} to="/profile">
              프로필 보기
            </MenuItem>
            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
          </Menu>
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
  /* width: 314px; */
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
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
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
