import React from "react";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import clsx from "clsx";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material";
import Theme from "../../../../lib/Theme";
import { UserObj_res } from "../../../../@types/models/apps/UserList";

const TableContentListItemWrapper = styled(ListItem)(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    fontSize: 14,
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 10,
    cursor: "pointer",
    overflow: "hidden",
    paddingLeft: 20,
    alignItems: "center",
    "& .contactViewLeft": {
      width: "65%",
      display: "flex",
      // border: "1px solid",
    },
    "& .contactViewRight": {
      width: "40%",
      display: "flex",
      color: Theme.color.gray[2],
      // border: "1px solid",
    },
    "& .rootCheck": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      boxShadow: `0 3px 5px 0 ${alpha(
        theme.palette.common.black,
        0.08
      )}`,
    },
    "& .overflowText": {
      fontWeight: Theme.fonts.fontWeight.MEDIUM,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      // border: "1px solid",
    },
  };
});

const NoValueText = styled("span")(({ theme }) => {
  return {
    color: Theme.color.gray[1],
  };
});

interface UserListTableItemMobileProps {
  user: UserObj_res;
  onChangeCheckedUsers?: (event: any, uuid: string) => void;
  checkedUsers: string[];
  onSelectUsersForDelete?: (userIds: string[]) => void;
  onOpenEditUser: (user: UserObj_res) => void;
  onViewUserDetail: (user: UserObj_res) => void;

  [x: string]: any;
}

const UserListTableItemMobile: React.FC<
  UserListTableItemMobileProps
> = ({ user, checkedUsers, onViewUserDetail }) => {
  console.log("uuid : ");
  console.log(user.uuid);
  return (
    <TableContentListItemWrapper
      dense
      key={user.uuid}
      className={clsx("item-hover", {
        rootCheck: checkedUsers.includes(user.uuid),
      })}
      onClick={() => onViewUserDetail(user)}
    >
      {/* 왼쪽 글박스 시작 */}
      <Box className="contactViewLeft">
        <Box
          sx={{
            mr: 3,
            mt: 1,
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
          sx={{
            overflow: "hidden",
            width: "70%",
            // border: "1px solid red",
          }}
        >
          <Box className="overflowText" component="p">
            {user.nickname ? (
              user.nickname
            ) : (
              <NoValueText>이름 없음</NoValueText>
            )}
          </Box>
          <Box
            component="p"
            sx={{
              color: "text.secondary",
            }}
          >
            {user.posts.length > 0 ? (
              `글 ${user.posts.length}개`
            ) : (
              <NoValueText>작성 글 없음</NoValueText>
            )}
          </Box>
        </Box>
      </Box>
      {/* 왼쪽 글박스 종료 */}
      {/* 오른쪽 글박스 시작 */}
      <Box className="contactViewRight">
        <Box className="overflowText">{user.email}</Box>
      </Box>
      {/* 오른쪽 글박스 시작 */}
    </TableContentListItemWrapper>
  );
};

export default UserListTableItemMobile;
