import React from "react";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import clsx from "clsx";
import ItemMenu from "../ItemMenu";
import { blue } from "@mui/material/colors";

import { alpha } from "@mui/material";
import { UserObj_res } from "../../../../@types/models/apps/UserList";
import Theme from "../../../../lib/Theme";
// import styled from "styled-components";
import { styled } from "@mui/material/styles";
import { rem } from "../../../../lib/util/otherUtills";
import { NoNameText } from "../../../atoms/Text";

const UserListTableItemWrapper = styled(ListItem)(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 14,
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    cursor: "pointer",
    overflow: "hidden",
    "&.rootCheck": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      boxShadow: `0 3px 5px 0 ${alpha(
        theme.palette.common.black,
        0.08
      )}`,
    },
    "& .conActionHoverHideRoot": {
      transition: "all 0.4s ease",
    },
    "&:hover": {
      "&": {
        background: "#f0c9932b",
      },
      "& .conActionHoverRoot": {
        opacity: 1,
        visibility: "visible",
        right: 0,
      },
      "& .conActionHoverHideRoot": {
        opacity: 0,
        visibility: "hidden",
      },
      "& .contactViewInfo": {
        [theme.breakpoints.up("sm")]: {
          width: "calc(100% - 114px)",
        },
      },
    },
  };
});

// const NoNameText = styled("div")(({ theme }) => {
//   return {
//     fontSize: rem(12),
//     color: Theme.color.gray[1],
//   };
// });

interface UserListTableItemProps {
  user: UserObj_res;
  onChangeCheckedUsers: (event: any, id: string) => void;
  checkedUsers: string[];
  onSelectUsersForDelete: (userIds: string[]) => void;
  onOpenEditUser: (user: UserObj_res) => void;
  onViewUserDetail: (user: UserObj_res) => void;

  [x: string]: any;
}

const UserListTableItem: React.FC<UserListTableItemProps> = ({
  user,
  onChangeCheckedUsers,
  checkedUsers,
  onSelectUsersForDelete,
  onViewUserDetail,
  onOpenEditUser,
}) => {
  // console.log(user)
  return (
    <>
      <UserListTableItemWrapper
        dense
        key={user.uuid}
        className={clsx("item-hover", {
          rootCheck: checkedUsers.includes(user.uuid),
        })}
        sx={{ padding: "4px 10px" }}
        onClick={() => onViewUserDetail(user)}
      >
        <Box
          sx={{
            width: { xs: "75%", sm: "80%", md: "60%" },
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            // border: "1px solid",
          }}
        >
          <span onClick={(event) => event.stopPropagation()}>
            <Checkbox
              sx={{
                color: (theme) => theme.palette.text.disabled,
              }}
              checked={checkedUsers.includes(user.uuid)}
              onChange={(event) =>
                onChangeCheckedUsers(event, user.uuid)
              }
              color="primary"
            />
          </span>

          <Box
            sx={{
              mr: 3,
            }}
            component="span"
          >
            {user.profile ? (
              <Avatar
                sx={{
                  backgroundColor: blue[500],
                  width: 36,
                  height: 36,
                }}
                src={user.profile}
              />
            ) : (
              <Avatar
                sx={{
                  backgroundColor: blue[500],
                  width: 36,
                  height: 36,
                }}
              >
                {user.nickname}
              </Avatar>
            )}
          </Box>
          <Box
            component="span"
            sx={{
              mr: 4,
              fontWeight: Theme.fonts.fontWeight.MEDIUM,
              width: "20%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              // border: "1px solid",
            }}
          >
            {user.nickname ? (
              user.nickname
            ) : (
              <NoNameText>닉네임 없음</NoNameText>
            )}
          </Box>

          <Box
            component="span"
            sx={{
              mr: 4,
              flex: 1,
              display: { xs: "none", sm: "block" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user.email}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: { xs: "25%", sm: "20%", md: "40%" },
          }}
        >
          <Box
            sx={{
              transition: "all 0.4s ease",
              display: "flex",
              alignItems: "center",
              width: { sm: "calc(100% - 70px)" },
            }}
            className="contactViewInfo"
          >
            <Box
              component="span"
              sx={{
                mr: 4,
                flex: 1,
                display: { xs: "none", md: "block" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              {`글 ${user.posts.length}개`}
            </Box>
            <Box
              component="span"
              sx={{
                // mr: 4,
                flex: 1,
                display: { xs: "none", md: "block" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textAlign: "center",
                // border: "1px solid",
              }}
            >
              {user.is_active === true
                ? user.is_admin === true
                  ? "운영진"
                  : "활성"
                : "비활성"}
            </Box>
          </Box>

          <Box
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            {/* 공통 컴포넌트 */}
            <ItemMenu
              user={user}
              type={"USERLIST"}
              onOpenEditUser={onOpenEditUser}
              onSelectItemsForDelete={onSelectUsersForDelete}
            />
          </Box>
        </Box>
      </UserListTableItemWrapper>
    </>
  );
};

export default UserListTableItem;
