import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { TransitionProps } from "@mui/material/transitions";
import React, { ReactNode, useContext } from "react";
import { AppInfoContext } from "../../../lib/AppInfoProvider/AppInfoProvider";
import Theme from "../../../lib/Theme";
import { onDeleteUsers } from "../../../modules/userListModule";

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
  toDeleteUsers: number[];
  onGetList: (params?: any) => void;
  setCheckedUsers: (users: number[]) => void;
}

const AppConfirmDialog: React.FC<AppConfirmDialogProps> = ({
  open,
  onDeny,
  title,
  dialogTitle,
  toDeleteUsers,
  onGetList,
  setCheckedUsers,
}) => {
  const { setMessage } = useContext(AppInfoContext);
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={() => onDeny(false)}
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
        sx={{ color: "text.secondary", fontSize: 14 }}
        id="alert-dialog-description"
      >
        {title}
      </DialogContent>
      <DialogActions
        sx={{
          pb: 5,
          px: 6,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            fontWeight: Theme.fonts.fontWeight.MEDIUM,
          }}
          onClick={() =>
            onDeleteUsers(
              toDeleteUsers,
              onGetList,
              setCheckedUsers,
              onDeny,
              setMessage
            )
          }
          color="primary"
          autoFocus
        >
          네
        </Button>
        <Button
          variant="contained"
          sx={{
            fontWeight: Theme.fonts.fontWeight.MEDIUM,
          }}
          onClick={() => onDeny(false)}
          color="secondary"
        >
          아니요
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppConfirmDialog;
