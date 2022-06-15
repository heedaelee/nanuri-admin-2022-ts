import React, { useEffect, useState } from "react";
import { UserListObj } from "../../../@types/models/apps/UserList";
import AppDialog from "../../atoms/AppDialog";
import UserActions from "./UserActions";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { DialogActions, TextField } from "@mui/material";
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

const InfoRow = styled("div")(({ theme }) => {
  return {
    display: "flex",
    // border: "1px solid blue",
    "& + &": {
      marginTop: 6,
    },
  };
});
const InfoKey = styled("div")(({ theme }) => {
  return {
    // border: "1px solid Sienna",
    paddingLeft: 140,
    flex: "0 1 50%",
  };
});
const InfoValue = styled("div")(({ theme }) => {
  return {
    // border: "1px solid red",
    paddingLeft: 10,
    flex: "0 1 50%",
  };
});

const TopMenuNames = [
  { id: 1, key: "name", name: "이름" },
  { id: 2, key: "email", name: "이메일" },
  { id: 3, key: "contact", name: "휴대폰" },
  { id: 4, key: "address", name: "주소" },
];
const BottomMenuNames = [
  { id: 5, key: "regDate", name: "가입일" },
  { id: 6, key: "active", name: "상태" },
];

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
                // border: "1px solid",
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
                  mt: 5,
                }}
              >
                기본정보
              </Box>
              {TopMenuNames.map((menu, i) => (
                <InfoRow key={menu.id}>
                  <InfoKey>{menu.name}</InfoKey>
                  <InfoValue>
                    {selectedUser &&
                      selectedUser[menu.key as keyof UserListObj]}
                  </InfoValue>
                </InfoRow>
              ))}
              <Box
                component="h6"
                sx={{
                  fontSize: rem(14),
                  fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
                  color: Theme.color.gray[1],
                }}
              >
                기타정보
              </Box>
              {BottomMenuNames.map((menu, i) => (
                <InfoRow key={menu.id}>
                  <InfoKey>{menu.name}</InfoKey>
                  <InfoValue>
                    {selectedUser && menu.name === "상태"
                      ? selectedUser[
                          menu.key as keyof UserListObj
                        ] === "1"
                        ? "활성"
                        : "비활성"
                      : selectedUser![menu.key as keyof UserListObj]}
                  </InfoValue>
                </InfoRow>
              ))}
              <Box
                component="h6"
                sx={{
                  fontSize: rem(14),
                  fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
                  color: Theme.color.gray[1],
                }}
              >
                메모
              </Box>
              <InfoRow sx={{ flex: 1, justifyContent: "center" }}>
                <TextField
                  multiline
                  sx={{
                    width: "70%",
                    mt: 3,
                    // border: "1px solid",
                    "& .MuiInputBase-root": {
                      padding: "16px 24px",
                    },
                  }}
                  inputProps={{
                    style: { fontSize: rem(12) },
                  }}
                  rows="3"
                  // placeholder="메모를 입력하세요"
                  name="notes"
                  value={user.notes ? user.notes : "메모가 없습니다"}
                  variant="outlined"
                  disabled
                />
              </InfoRow>
            </Box>
          </div>
        ) : (
          <div />
        )}
        {/* 새로운 라인:하단버튼 */}
        <DialogActions
          sx={{
            // border: "1px solid red",
            display: "flex",
            justifyContent: "center",
            mt: 3,
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
