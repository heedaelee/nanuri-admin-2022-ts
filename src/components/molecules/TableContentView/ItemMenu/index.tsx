import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AppTooltip from "../../../atoms/AppTooltip";
import Box from "@mui/material/Box";
import { UserListObj } from "../../../../@types/models/apps/UserList";
import { styled } from "@mui/material/styles";

const WhenHoveringActionWrapper = styled("div")(() => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: -30,
    top: "50%",
    zIndex: 1,
    transform: "translateY(-50%)",
    transition: "all 0.4s ease",
    opacity: 0,
    visibility: "hidden",
  };
});

interface ItemMenuProps {
  onSelectUsersForDelete: (ids: number[]) => void;
  user: UserListObj;
  onOpenEditUser: (user: UserListObj) => void;
}

const ItemMenu: React.FC<ItemMenuProps> = ({
  onSelectUsersForDelete,
  user,
  onOpenEditUser,
}) => {
  const onDeleteContact = (e: any) => {
    onSelectUsersForDelete([user.id]);
    e.stopPropagation();
  };

  const onClickEditOption = (e: any) => {
    onOpenEditUser(user);
    e.stopPropagation();
  };

  return (
    <Box
      component="span"
      sx={{
        display: "flex",
        alignItems: "center",
        marginLeft: "auto",
        position: "relative",
      }}
    >
      <span className="conActionHoverHideRoot">
        <AppTooltip title="더보기">
          <IconButton
            sx={{
              color: (theme) => theme.palette.text.disabled,
              padding: 2,
              "& .MuiSvgIcon-root": {
                fontSize: 22,
              },
            }}
            size="large"
          >
            <MoreVertIcon />
          </IconButton>
        </AppTooltip>
      </span>

      <WhenHoveringActionWrapper className="conActionHoverRoot">
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
            padding: 2,
            "& .MuiSvgIcon-root": {
              fontSize: 22,
            },
          }}
          onClick={onClickEditOption}
          size="large"
        >
          <EditOutlinedIcon />
        </IconButton>
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
            padding: 2,
            "& .MuiSvgIcon-root": {
              fontSize: 22,
            },
          }}
          onClick={onDeleteContact}
          size="large"
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </WhenHoveringActionWrapper>
    </Box>
  );
};

export default ItemMenu;
