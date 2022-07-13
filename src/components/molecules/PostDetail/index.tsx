import React, { useEffect, useState } from "react";
import { UserListObj } from "../../../@types/models/apps/UserList";
import AppDialog from "../../atoms/AppDialog";
import PostActions from "./PostActions";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {
  DialogActions,
  ImageList,
  ImageListItem,
  TextField,
  Typography,
} from "@mui/material";
import Button from "../../atoms/Button";
import { styled } from "@mui/material/styles";
import Theme from "../../../lib/Theme";
import { rem } from "../../../lib/util/otherUtills";
import { post } from "../../../@types/models/apps/PostList";

interface PostDetailProps {
  isShowDetail: boolean;
  selectedPost: post | null;
  onShowDetail: (show: boolean) => void;
  onSelectPostsForDelete: (posts: string[]) => void;
  onOpenEditPost: (post: post | null) => void;
}

const HeaderWrapper = styled("div")(({ theme }) => {
  return {
    padding: 20,
    marginLeft: -24,
    marginRight: -24,
    marginTop: -20,
    display: "flex",
    flexDirection: "column",
    borderBottom: `1px solid ${theme.palette.divider}`,
    // height: 250,
    // "& .dropzone": {
    //   outline: 0,
    //   "&:hover .edit-icon, &:focus .edit-icon": {
    //     display: "flex",
    //   },
    // },
  };
});

const ButtonWrapper = styled("div")(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
  };
});

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
    flex: "0 1 50%",
  };
});
const InfoValue = styled("div")(({ theme }) => {
  return {
    // border: "1px solid red",
    paddingLeft: 10,
    display: "flex",
    justifyContent: "flex-start",
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

const PostDetail = ({
  isShowDetail,
  selectedPost,
  onShowDetail,
  onSelectPostsForDelete,
  onOpenEditPost,
}: PostDetailProps) => {
  const [post, setPost] = useState<post | null>(selectedPost);

  //props에 userData받고 , 여기서 재 setState 해줌
  useEffect(() => {
    setPost(selectedPost);
  }, [selectedPost]);

  const onDeletePost = () => {
    onSelectPostsForDelete([post!.uuid]);
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
          <PostActions
            onDeletePost={onDeletePost}
            onOpenEditPost={onOpenEditPost}
            post={post}
          />
        }
      >
        {/* <HeaderWrapper>
          <Box
            component="h6"
            sx={{
              mb: { xs: 4, xl: 6 },
              fontSize: rem(14),
              fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
            }}
          >
            게시물 추가 페이지
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {postImage ? (
              <ImageList
                gap={6}
                sx={{
                  width: 150 * postImage.length,
                  // height: 150,
                  objectFit: "cover",
                  padding: "6px",
                  overflowY: "visible",
                }}
                cols={postImage.length}
                rowHeight={164}
              >
                {postImage.map((item, index) => (
                  <ImageListItem
                    key={index}
                    sx={{
                      position: "relative",
                      outline: item.isRep
                        ? "4px solid green"
                        : undefined,
                    }}
                  >
                    {item.isRep && (
                      <Box
                        component={"div"}
                        sx={{
                          display: "flex",
                          top: -20,
                          left: -4,
                          pl: 2,
                          pr: 2,
                          position: "absolute",
                          backgroundColor: "green",
                        }}
                      >
                        <Typography variant="h4" color={"white"}>
                          대표사진
                        </Typography>
                      </Box>
                    )}
                    <img
                      src={`${URL.createObjectURL(item.file)}`}
                      onClick={() => selectRegImg(index)}
                      alt={item.file.name}
                      loading="lazy"
                      style={{ cursor: "pointer" }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            ) : (
              <>이미지 없음</>
            )}
          </Box>
        </HeaderWrapper> */}
        {/* img리스트 행 끝 */}

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

export default PostDetail;
