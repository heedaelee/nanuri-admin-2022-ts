import React from "react";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import clsx from "clsx";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material";
import Theme from "../../../../lib/Theme";
import { UserListObj } from "../../../../@types/models/apps/UserList";

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

interface TableContentListItemProps {
  user: UserListObj;
  onChangeCheckedUsers?: (event: any, id: number) => void;
  checkedUsers: number[];
  onSelectUsersForDelete?: (userIds: number[]) => void;
  onOpenEditUser: (user: UserListObj) => void;
  onViewUserDetail: (user: UserListObj) => void;

  [x: string]: any;
}

const TableContentListItemMobile: React.FC<
  TableContentListItemProps
> = ({ user, checkedUsers, onViewUserDetail }) => {
  return (
    <>
      <TableContentListItemWrapper
        dense
        key={user.id}
        className={clsx("item-hover", {
          rootCheck: checkedUsers.includes(user.id),
        })}
        onClick={() => onViewUserDetail(user)}
      >
        <Box
          sx={{
            width: { xs: "75%", sm: "80%", md: "50%" },
            display: "flex",
            alignItems: "center",
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
              {user.name}
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
              {user.contact}
            </Box>
          </Box>
        </Box>
      </TableContentListItemWrapper>
    </>
  );
};

export default TableContentListItemMobile;
