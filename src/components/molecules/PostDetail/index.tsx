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
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import { Text } from "../../atoms/Text";
// import styled from "styled-components";

interface PostDetailProps {
  isShowDetail: boolean;
  selectedPost: post | null;
  onShowDetail: (show: boolean) => void;
  onSelectPostsForDelete: (posts: string[]) => void;
  onOpenEditPost: (post: post | null) => void;
  postImage: { file: File; isRep: boolean }[];
  setPostImage: (active: { file: File; isRep: boolean }[]) => void;
}

const PostDetail = ({
  isShowDetail,
  selectedPost,
  onShowDetail,
  onSelectPostsForDelete,
  onOpenEditPost,
  postImage,
  setPostImage,
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

  // console.log('PostDetail Img : ');
  // console.dir(postImage);

  return (
    <>
      <AppDialog
        fullHeight
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
        // title={
        //   <PostActions
        //     onDeletePost={onDeletePost}
        //     onOpenEditPost={onOpenEditPost}
        //     post={post}
        //   />
        // }
      >
        <HeaderWrapper>
          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // border: "1px solid",
              alignItems: "center",
            }}
          >
            <Box
              component="h6"
              sx={{
                display: "flex",
                // mb: { xs: 4, xl: 6 },
                fontSize: rem(18),
                fontWeight: 900,
                // border: "1px solid red",
              }}
            >
              게시물 상세 페이지
            </Box>
            <PostActions
              onDeletePost={onDeletePost}
              onOpenEditPost={onOpenEditPost}
              post={post}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {postImage.length > 0 ? (
              <ImageList
                gap={6}
                sx={{
                  width: 150 * postImage.length,

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
                      alt={item.file.name}
                      loading="lazy"
                      style={{ cursor: "pointer" }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            ) : (
              <Box
                component={"div"}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  // border: "1px solid",
                  alignItems: "center",
                }}
              >
                <ImageNotSupportedOutlinedIcon
                  sx={{
                    transform: "scale(2)",
                    color: Theme.color.gray[1],
                  }}
                />
                <Box
                  sx={{ mt: 3 }}
                  color={Theme.color.gray[1]}
                  component={"h5"}
                >
                  사진 없음
                </Box>
              </Box>
            )}
          </Box>
        </HeaderWrapper>
        {/* img리스트 행 끝 */}

        {/* 컨텐츠 body */}
        <Box component="div">
          <Box
            component="h6"
            sx={{
              mt: { xs: 6, xl: 8 },
              mb: { xs: 4, xl: 6 },
              fontSize: 14,
              fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
            }}
          >
            기본정보
          </Box>

          <BasicInfoWrapper>
            <InfoRow>
              <Box
                sx={{
                  width: "50%",
                  border: "1px solid red",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  // pr: "5rem",
                }}
              >
                <InfoKey>상품명 :</InfoKey>
                <InfoValue sx={{ pl: "20px" }}>
                  {selectedPost?.title}
                </InfoValue>
              </Box>
              <Box
                sx={{
                  width: "50%",
                  border: "1px solid blue",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  pl: "4rem",
                }}
              >
                <InfoKey>가격 :</InfoKey>
                <InfoValue
                  sx={{ pl: "20px" }}
                >{`${selectedPost?.unit_price} 원`}</InfoValue>
              </Box>
            </InfoRow>
            <InfoRow>test</InfoRow>
          </BasicInfoWrapper>
        </Box>

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

const HeaderWrapper = styled("div")(({ theme }) => {
  return {
    padding: 20,
    marginLeft: -24,
    marginRight: -24,
    marginTop: -20,
    display: "flex",
    flexDirection: "column",
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: "relative",
  };
});

const BasicInfoWrapper = styled("div")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    border: " 1px solid black",
    height: "100%",
    padding: "0px 70px",
  };
});

const InfoRow = styled("div")(({ theme }) => {
  return {
    display: "flex",
    width: "100%",
    border: "1px solid lime",
    // "& + &": {
    //   marginTop: 6,
    // },
  };
});
const InfoKey = styled("div")(({ theme }) => {
  return {
    // border: "1px solid Sienna",
    fontSize: rem(14),
    display: "flex",
  };
});
const InfoValue = styled("div")(({ theme }) => {
  return {
    // border: "1px solid red",
    display: "flex",
    fontSize: rem(14),
  };
});

export default PostDetail;
