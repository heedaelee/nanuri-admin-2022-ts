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
    alignItems: "flex-start",
    "& .contactViewLeft": {
      alignItems: "flex-start",
    },
    "&.rootCheck": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      boxShadow: `0 3px 5px 0 ${alpha(
        theme.palette.common.black,
        0.08
      )}`,
    },
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
  console.log(user.uuid);
  return (
    <>
      <TableContentListItemWrapper
        dense
        key={user.uuid}
        className={clsx("item-hover", {
          rootCheck: checkedUsers.includes(user.uuid),
        })}
        onClick={() => onViewUserDetail(user)}
      >
        <Box
          sx={{
            width: { xs: "75%", sm: "80%", md: "50%" },
            display: "flex",
            alignItems: "center",
            border: "1px solid",
          }}
          className="contactViewLeft"
        >
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
          <Box sx={{ mr: 3, overflow: "hidden" }}>
            <Box
              sx={{
                fontWeight: Theme.fonts.fontWeight.MEDIUM,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              component="p"
            >
              {user.nickname}
            </Box>

            <Box
              component="p"
              sx={{
                color: "text.secondary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {`글 ${user.posts.length}개`}
            </Box>
          </Box>
        </Box>
      </TableContentListItemWrapper>
    </>
  );
};

export default UserListTableItemMobile;
