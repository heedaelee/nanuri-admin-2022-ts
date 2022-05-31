import React from "react";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import clsx from "clsx";
import ItemMenu from "../ItemMenu";
import { blue } from "@mui/material/colors";

import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material";
import { UserListObj } from "../../../../@types/models/apps/UserList";
import Theme from "../../../../lib/Theme";

const TableContentListItemWrapper = styled(ListItem)(({ theme }) => {
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

interface TableContentListItemProps {
  user: UserListObj;
  onChangeCheckedUsers: (event: any, id: number) => void;
  checkedUsers: number[];
  onSelectUsersForDelete: (userIds: number[]) => void;
  onOpenEditUser: (user: UserListObj) => void;
  onViewUserDetail: (user: UserListObj) => void;

  [x: string]: any;
}

const TableContentListItem: React.FC<TableContentListItemProps> = ({
  user,
  onChangeCheckedUsers,
  checkedUsers,
  onSelectUsersForDelete,
  onViewUserDetail,
  onOpenEditUser,
}) => {
  return (
    <>
      <TableContentListItemWrapper
        dense
        key={user.id}
        className={clsx("item-hover", {
          rootCheck: checkedUsers.includes(user.id),
        })}
        sx={{ padding: "4px 10px" }}
        onClick={() => onViewUserDetail(user)}
      >
        <Box
          sx={{
            width: { xs: "75%", sm: "80%", md: "50%" },
            display: "flex",
            alignItems: "center",
            // border: '1px solid',
          }}
        >
          <span onClick={(event) => event.stopPropagation()}>
            <Checkbox
              sx={{
                color: (theme) => theme.palette.text.disabled,
              }}
              checked={checkedUsers.includes(user.id)}
              onChange={(event) =>
                onChangeCheckedUsers(event, user.id)
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
            {user.image ? (
              <Avatar
                sx={{
                  backgroundColor: blue[500],
                  width: 36,
                  height: 36,
                }}
                src={user.image}
              />
            ) : (
              <Avatar
                sx={{
                  backgroundColor: blue[500],
                  width: 36,
                  height: 36,
                }}
              >
                {user.name[0].toUpperCase()}
              </Avatar>
            )}
          </Box>
          <Box
            component="span"
            sx={{
              mr: 4,
              fontWeight: Theme.fonts.fontWeight.MEDIUM,
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user.name}
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
            width: { xs: "25%", sm: "20%", md: "50%" },
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
              }}
            >
              {user.contact}
            </Box>
            <Box
              component="span"
              sx={{
                mr: 4,
                flex: 1,
                display: { xs: "none", md: "block" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user.active}
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
            <ItemMenu
              user={user}
              onOpenEditUser={onOpenEditUser}
              onSelectUsersForDelete={onSelectUsersForDelete}
            />
          </Box>
        </Box>
      </TableContentListItemWrapper>
    </>
  );
};

export default TableContentListItem;
