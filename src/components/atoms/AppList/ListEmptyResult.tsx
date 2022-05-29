import React, { ReactNode } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

interface ListEmptyResultProps {
  title?: string | ReactNode;
  actionTitle?: string | ReactNode;
  onClick?: () => void;
  loading?: boolean;
  loader?: boolean;
  placeholder?: ReactNode;
  content?: string;
}

const ListEmptyResult: React.FC<ListEmptyResultProps> = ({
  loader,
  placeholder,
  loading,
  title = "데이터가 없습니다",
  actionTitle,
  content,
  onClick,
}) => {
  if (loading || loader) {
    // 로딩중
    return (
      <React.Fragment>
        {placeholder ? (
          placeholder
        ) : (
          <Box
            sx={{
              flexDirection: "row",
              minHeight: "450px",
              height: "100%",
              flex: 1,
              display: "flex",
              p: 5,
              justifyContent: "center",
              alignItems: "center",
              borderColor: "transparent",
              borderRadius: "4px",
              textAlign: "center",
            }}
          >
            <CircularProgress size={16} />
            <Box component="span" sx={{ ml: 2 }}>
              Loading...
            </Box>
          </Box>
        )}
      </React.Fragment>
    );
  } else {
    //로딩 끝
    return (
      <Box
        sx={{
          flexDirection: "column",
          minHeight: "450px",
          height: "100%",
          flex: 1,
          display: "flex",
          p: 5,
          justifyContent: "center",
          alignItems: "center",
          border: 1,
          borderColor: "transparent",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        {title ? (
          <Typography
            sx={{
              fontSize: 14,
              color: (theme) => theme.palette.text.secondary,
              fontWeight: (theme) =>
                theme.typography.fontWeightMedium,
              mb: 2,
            }}
            component="h4"
            variant="h4"
          >
            {title}
          </Typography>
        ) : null}
        <Typography
          sx={{
            fontSize: 14,
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          {content}
        </Typography>

        {actionTitle ? (
          <Button
            color="primary"
            variant="contained"
            sx={{ mt: 7.5, height: 45, minWidth: 150 }}
            onClick={onClick}
          >
            {actionTitle}
          </Button>
        ) : null}
      </Box>
    );
  }
};

export default ListEmptyResult;
