import React, { useEffect, useState } from "react";
import { UserObj_res } from "../../../@types/models/apps/UserList";
import AppDialog from "../../atoms/AppDialog";
import UserActions from "./UserActions";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { DialogActions, TextField } from "@mui/material";
import Button from "../../atoms/Button";
import { styled } from "@mui/material/styles";
import Theme from "../../../lib/Theme";
import { rem } from "../../../lib/util/otherUtills";
import { NoNameText, Text } from "../../atoms/Text";

interface UserDetailProps {
  isShowDetail: boolean;
  selectedUser: UserObj_res | null;
  onShowDetail: (show: boolean) => void;
  onSelectUsersForDelete: (ids: string[]) => void;
  onOpenEditUser: (contact: UserObj_res | null) => void;
}

const InfoRow = styled("div")(({ theme }) => {
  return {
    display: "flex",
    fontSize: rem(14),
    // border: "1px solid blue",
    "& + &": {
      marginTop: 6,
    },
  };
});
const InfoKey = styled("div")(({ theme }) => {
  return {
    // border: "1px solid Sienna",
    paddingRight: 10,
    display: "flex",
    justifyContent: "flex-end",
    flex: "0 1 40%",
  };
});
const InfoValue = styled("div")(({ theme }) => {
  return {
    // border: "1px solid red",
    paddingLeft: 10,
    display: "flex",
    justifyContent: "flex-start",
    flex: "0 1 60%",
  };
});

const TopMenuNames = [
  { id: 1, key: "nickname", name: "닉네임" },
  { id: 2, key: "email", name: "이메일" },
  { id: 3, key: "auth_provider", name: "로그인 방식" },
  { id: 4, key: "address", name: "주소" },
];
const BottomMenuNames = [
  { id: 5, key: "created_at", name: "가입일" },
  { id: 6, key: "updated_at", name: "정보 수정일" },
  { id: 7, key: "is_active", name: "활성 상태" },
  { id: 8, key: "is_admin", name: "가입 유형" },
];

const UserDetail = ({
  isShowDetail,
  selectedUser,
  onShowDetail,
  onSelectUsersForDelete,
  onOpenEditUser,
}: UserDetailProps) => {
  if (selectedUser) {
    selectedUser.created_at =
      selectedUser.created_at && selectedUser.created_at.slice(0, 10);
    selectedUser.updated_at =
      selectedUser.updated_at && selectedUser.updated_at.slice(0, 10);
  }
  const [user, setUser] = useState<UserObj_res | null>(selectedUser);

  //props에 userData받고 , 여기서 재 setState 해줌
  useEffect(() => {
    setUser(selectedUser);
  }, [selectedUser]);

  const onDeleteUser = () => {
    onSelectUsersForDelete([user!.uuid]);
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
                {user.profile ? (
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2.5,
                    }}
                    src={user.profile}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 2.5,
                    }}
                  >
                    {user.nickname}
                  </Avatar>
                )}
                <Box component="h3">{user.nickname}</Box>
              </Box>
            </Box>

            <Box
              sx={{
                // border: "1px solid",
                pt: 1,
                pb: 1,
                pl: { xs: 1, sm: 8 },
                pr: { xs: 1, sm: 8 },
              }}
            >
              <Box
                component="h6"
                sx={{
                  fontSize: rem(14),
                  fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
                  color: Theme.color.gray[2],
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
                      (selectedUser[menu.key as keyof UserObj_res] ? (
                        selectedUser[menu.key as keyof UserObj_res]
                      ) : (
                        <NoNameText>데이터 없음</NoNameText>
                      ))}
                  </InfoValue>
                </InfoRow>
              ))}
              <Box
                component="h6"
                sx={{
                  fontSize: rem(14),
                  fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
                  color: Theme.color.gray[2],
                }}
              >
                기타정보
              </Box>
              {BottomMenuNames.map((menu, i) => (
                <InfoRow key={menu.id}>
                  <InfoKey>{menu.name}</InfoKey>
                  <InfoValue>
                    {selectedUser && menu.name === "활성 상태" ? (
                      selectedUser[menu.key as keyof UserObj_res] ===
                      true ? (
                        <span style={{ color: Theme.color.green[1] }}>
                          활성
                        </span>
                      ) : (
                        <span style={{ color: "red" }}>비활성</span>
                      )
                    ) : selectedUser && menu.name === "가입 유형" ? (
                      selectedUser[menu.key as keyof UserObj_res] ===
                      true ? (
                        "관리자"
                      ) : (
                        "회원"
                      )
                    ) : (
                      selectedUser![menu.key as keyof UserObj_res]
                    )}
                  </InfoValue>
                </InfoRow>
              ))}

              {/* 메모 기능 취소 */}
              {/* <Box
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
                  rows={6}
                  name="notes"
                  value={user.notes ? user.notes : "메모가 없습니다"}
                  variant="outlined"
                  disabled
                />
              </InfoRow> */}
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
