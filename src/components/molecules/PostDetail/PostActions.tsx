import React from "react";
import Box from "@mui/material/Box";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { IconButton } from "@mui/material";
import { postObj_res } from "../../../@types/models/apps/PostList";

interface PostActionsProps {
  post: postObj_res | null;
  onDeletePost: () => void;
  onOpenEditPost: (post: postObj_res | null) => void;
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
        // position: "absolute",
        // justifyContent: "flex-end",
        // alignItems: "center",
        // border: "1px solid blue",
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
      </Box>
    </Box>
  );
};

export default PostActions;
