import React, { useEffect, useState } from "react";
import { UserListObj } from "../../../@types/models/apps/UserList";
import AppDialog from "../../atoms/AppDialog";
import UserActions from "./UserActions";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { DialogActions } from "@mui/material";
import Button from "../../atoms/Button";
import { styled } from "@mui/material/styles";
import Theme from "../../../lib/Theme";
import { rem } from "../../../lib/util/otherUtills";

interface UserDetailProps {
  isShowDetail: boolean;
  selectedUser: UserListObj | null;
  onShowDetail: (show: boolean) => void;
  onSelectUsersForDelete: (ids: number[]) => void;
  onOpenEditUser: (contact: UserListObj | null) => void;
}

const FlexWrapper = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: "1px solid",
  };
});

const UserDetail = ({
  isShowDetail,
  selectedUser,
  onShowDetail,
  onSelectUsersForDelete,
  onOpenEditUser,
}: UserDetailProps) => {
  const [user, setUser] = useState<UserListObj | null>(selectedUser);

  //props에 userData받고 , 여기서 재 setState 해줌
  useEffect(() => {
    setUser(selectedUser);
  }, [selectedUser]);

  const onDeleteUser = () => {
    onSelectUsersForDelete([user!.id]);
    onShowDetail(false);
  };

  return (
    <>
      <AppDialog
        actionTitle=""
        sxStyle={{
          "& .MuiPaper-root:hover": {
            "& .btn-action-view": {
              opacity: 1,
              visibility: "visible",
            },
          },
        }}
        onClose={() => onShowDetail(false)}
        hideClose
        open={isShowDetail}
        title={
          <UserActions
            onDeleteUser={onDeleteUser}
            onOpenEditUser={onOpenEditUser}
            user={user}
          />
        }
      >
        {user ? (
          <div>
            <Box
              sx={{
                borderBottom: (theme) =>
                  `1px solid ${theme.palette.divider}`,
                ml: 0,
                mr: 0,
                pl: 5,
                pr: 5,
                pb: 4,
              }}
            >
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {user.image ? (
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2.5,
                    }}
                    src={user.image}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2.5,
                    }}
                  >
                    {user.name[0].toUpperCase()}
                  </Avatar>
                )}
                <Box component="h3">{user.name}</Box>
              </Box>
            </Box>

            <Box
              sx={{
                border: "1px solid",
                pt: 1,
                pb: 1,
                pl: "9rem",
                pr: "8rem",
              }}
            >
              <Box
                component="h6"
                sx={{
                  fontSize: rem(14),
                  fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
                  color: Theme.color.gray[1],
                }}
              >
                기본정보
              </Box>
              <Box
                sx={{
                  display: "flex",

                  border: "1px solid blue",
                  mt: 1,
                }}
              >
                <Box
                  component="h6"
                  sx={{
                    border: "1px solid Sienna",
                    flex: 1,
                    ml:5
                  }}
                >
                  주소:
                </Box>
                <Box
                  component="h6"
                  sx={{
                    border: "1px solid red",
                    flex: 1,
                  }}
                >
                  서울시 강남구 신림동 112-1번지
                </Box>
              </Box>
            </Box>
          </div>
        ) : (
          <div />
        )}
        {/* 새로운 라인:하단버튼 */}
        <DialogActions
          sx={{
            border: "1px solid red",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            size="modal"
            type="submit"
            onClick={() => onShowDetail(false)}
          >
            닫기
          </Button>
        </DialogActions>
      </AppDialog>
    </>
  );
};

export default UserDetail;
