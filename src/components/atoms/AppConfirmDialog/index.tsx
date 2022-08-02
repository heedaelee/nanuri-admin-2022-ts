import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
// import Button from "@mui/material/Button";
import { TransitionProps } from "@mui/material/transitions";
import React, { ReactNode, useContext } from "react";
import { AppInfoContext } from "../../../lib/AppInfoProvider/AppInfoProvider";
import Theme from "../../../lib/Theme";
import { onDeletePosts } from "../../../modules/postListModule";
import { onDeleteUsers } from "../../../modules/userListModule";
import Button from "../Button";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  // eslint-disable-next-line no-undef
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AppConfirmDialogProps {
  dialogTitle: string | ReactNode;
  open: boolean;
  onDeny: (isOpen: boolean) => void;
  title: string | ReactNode;
  onGetList: () => void;
  //
  type: "DELETE_USERS" | "DELETE_POSTS";
  deleteModule?: {
    listToDelete: string[];
    setListToDelete: (list: string[]) => void;
  };
}

const AppConfirmDialog: React.FC<AppConfirmDialogProps> = ({
  open,
  onDeny,
  title,
  dialogTitle,
  onGetList,
  type,
  deleteModule,
}) => {
  const { setMessage } = useContext(AppInfoContext);

  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={() => onDeny(false)}
      sx={{
        "& .MuiPaper-root": {
          width: 279,
        },
      }}
    >
      <DialogTitle>
        <div>
          <Typography
            component="h4"
            variant="h4"
            sx={{
              mb: 3,
              fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
            }}
            id="alert-dialog-title"
          >
            {dialogTitle}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent
        sx={{
          color: "text.secondary",
          fontSize: "16px",
          fontFamily: "'Pretendard'",
          fontWeight: 600,
          lineHeight: "24px",
          whiteSpace: "pre-line",
          textAlign: "center",
        }}
        id="alert-dialog-description"
      >
        {title}
      </DialogContent>
      <DialogActions
        sx={{
          pb: 5,
          px: 6,
          justifyContent: "center",
        }}
      >
        <Button
          size="modal"
          color={Theme.color.gray[1]}
          onClick={() => onDeny(false)}
        >
          취소
        </Button>
        <Button
          size="modal"
          onClick={() => {
            if (type === "DELETE_USERS") {
              deleteModule &&
                onDeleteUsers(
                  //리스트가 아니라 단일 선택으로 수정
                  deleteModule.listToDelete[0],
                  onGetList,
                  deleteModule.setListToDelete,
                  onDeny,
                  setMessage
                );
            }
            if (type === "DELETE_POSTS") {
              deleteModule &&
                onDeletePosts(
                  deleteModule.listToDelete as string[],
                  onGetList,
                  deleteModule.setListToDelete as (
                    params: string[]
                  ) => void,
                  onDeny,
                  setMessage
                );
            }
          }}
        >
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppConfirmDialog;
