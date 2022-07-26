import React from "react";
import Box from "@mui/material/Box";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { IconButton } from "@mui/material";
import { UserObj } from "../../../@types/models/apps/UserList";

interface UserActionsProps {
  user: UserObj | null;
  onDeleteUser: () => void;
  onOpenEditUser: (user: UserObj | null) => void;
}

const UserActions: React.FC<UserActionsProps> = ({
  onDeleteUser,
  onOpenEditUser,
  user,
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
          onClick={() => onOpenEditUser(user)}
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
          onClick={onDeleteUser}
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

export default UserActions;
