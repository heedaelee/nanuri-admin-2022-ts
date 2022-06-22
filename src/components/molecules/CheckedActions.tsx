import React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import { useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Hidden } from "@mui/material";
import AppTooltip from "../atoms/AppTooltip";

interface CheckedActionsProps {
  checkedItems: any[];
  setCheckedItems: (checkedItems: any[]) => void;
  onSelectItemsForDelete: (checkedItems: any[]) => void;
}

const CheckedActions = ({
  checkedItems,
  setCheckedItems,
  onSelectItemsForDelete,
}: CheckedActionsProps) => {
  return (
    <Box
      component="span"
      sx={{
        display: "flex",
        alignItems: "center",
        mr: { xs: 2, xl: 3 },
        // border: "1px solid",
      }}
    >
      <AppTooltip title={"삭제"}>
        <IconButton
          sx={{
            color: (theme) => theme.palette.text.disabled,
            // border: "1px solid",
          }}
          onClick={() => onSelectItemsForDelete(checkedItems)}
        >
          <DeleteOutlinedIcon
            sx={{
              cursor: "pointer",
              display: "block",
            }}
            fontSize="large"
          />
        </IconButton>
      </AppTooltip>
    </Box>
  );
};

export default CheckedActions;
