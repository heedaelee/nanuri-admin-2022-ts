import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AppTooltip from "../../../atoms/AppTooltip";
import Box from "@mui/material/Box";
import { UserObj } from "../../../../@types/models/apps/UserList";
import { styled } from "@mui/material/styles";
import { post } from "../../../../@types/models/apps/PostList";

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
  onSelectItemsForDelete: (ids: any[]) => void;
  user?: UserObj;
  post?: post;
  type: "USERLIST" | "POSTLIST";
  onOpenEditUser?: (item: UserObj) => void;
  onOpenEditPost?: (item: post) => void;
}

const ItemMenu: React.FC<ItemMenuProps> = ({
  onSelectItemsForDelete,
  user,
  post,
  onOpenEditUser,
  onOpenEditPost,
  type,
}) => {
  const onDeleteContact = (e: any) => {
    user && onSelectItemsForDelete([user.uuid]);
    post && onSelectItemsForDelete([post.uuid]);
    e.stopPropagation();
  };

  const onClickEditOption = (e: any) => {
    user && onOpenEditUser && onOpenEditUser(user);
    post && onOpenEditPost && onOpenEditPost(post);
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
