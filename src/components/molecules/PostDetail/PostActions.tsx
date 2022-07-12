import React from "react";
import Box from "@mui/material/Box";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { IconButton } from "@mui/material";
import { post } from "../../../@types/models/apps/PostList";

interface PostActionsProps {
  post: post | null;
  onDeletePost: () => void;
  onOpenEditPost: (post: post | null) => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  onDeletePost,
  onOpenEditPost,
  post,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          transition: "all 0.5s ease",
          opacity: 0,
          visibility: "hidden",
        }}
        className="btn-action-view"
      >
        <IconButton
          onClick={onDeletePost}
          sx={{
            color: (theme) => theme.palette.text.secondary,
            "& svg": {
              fontSize: 20,
            },
          }}
        >
          <DeleteOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={() => onOpenEditPost(post)}
          sx={{
            color: (theme) => theme.palette.text.secondary,
            "& svg": {
              fontSize: 20,
            },
          }}
        >
          <EditOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PostActions;
