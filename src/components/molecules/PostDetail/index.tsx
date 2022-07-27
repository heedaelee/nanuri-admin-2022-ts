import React, { useEffect, useState } from "react";
import { UserObj_res } from "../../../@types/models/apps/UserList";
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
import Tooltip from "@mui/material/Tooltip";
import DateFnsAdapter from "@date-io/date-fns";
import { ko } from "date-fns/locale";
import AppTextField from "../../atoms/AppFormComponents/AppTextField";
// import styled from "styled-components";

interface PostDetailProps {
  isShowDetail: boolean;
  selectedPost: post | null;
  onShowDetail: (show: boolean) => void;
  onSelectPostsForDelete: (posts: string[]) => void;
  onOpenEditPost: (post: post | null) => void;
  postImage: { file: File; isRep: boolean }[];
  setPostImage: (active: { file: File; isRep: boolean }[]) => void;
  handleDetailPostClose: () => void;
}

const PostDetail = ({
  isShowDetail,
  selectedPost,
  onShowDetail,
  onSelectPostsForDelete,
  onOpenEditPost,
  postImage,
  setPostImage,
  handleDetailPostClose,
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

  const dateFns = new DateFnsAdapter({ locale: ko });

  //string 날짜 규격 셋팅 함수
  function formatDate(param: string | Date) {
    //string -> date -> string with korean

    let date = param && typeof param === "string" && dateFns.parseISO(param);

    return (
      date &&
      !(typeof date === "boolean") &&
      dateFns.formatByString(date, "yyyy. M. dd.")
    );
  }

  //Date -> String 으로 변경
  const kr_waited_from = formatDate(selectedPost?.waited_from!!);
  const kr_waited_until = formatDate(selectedPost?.waited_until!!);

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
        // onClose={() => onShowDetail(false)}
        onClose={() => handleDetailPostClose()}
        hideClose
        open={isShowDetail}
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
                      outline: item.isRep ? "4px solid green" : undefined,
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
              fontSize: rem(16),
              fontWeight: Theme.fonts.fontWeight.SEMI_BOLD,
            }}
          >
            기본정보
          </Box>

          <BasicInfoWrapper>
            {/* 상품명 & 가격 */}
            <InfoRow>
              <FirstMenuBlock>
                <InfoKey>상품명 :</InfoKey>
                <InfoValue
                  sx={{
                    // border: "1px solid",
                    pl: "10px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {selectedPost?.title}
                </InfoValue>
              </FirstMenuBlock>
              <SecondMenuBlock>
                <InfoKey>가격 :</InfoKey>
                <InfoValue>{`${selectedPost?.unit_price} 원`}</InfoValue>
              </SecondMenuBlock>
            </InfoRow>

            {/*구매링크*/}
            <InfoRow>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <InfoKey>구매링크 :</InfoKey>
                <Tooltip title="해당 사이트로 가기">
                  <InfoValue
                    sx={{
                      pl: rem(10),
                      color: Theme.color.gray[1],
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      window.open(`${selectedPost?.product_url}`, "_blank")
                    }
                  >
                    {selectedPost?.product_url}
                  </InfoValue>
                </Tooltip>
              </Box>
            </InfoRow>

            {/*모집기간*/}
            <InfoRow>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <InfoKey>모집기간 :</InfoKey>
                <InfoValue>
                  {kr_waited_from} ~ {kr_waited_until}
                </InfoValue>
              </Box>
            </InfoRow>

            {/*모집 인원 & 참여 인원*/}
            <InfoRow>
              <FirstMenuBlock>
                <InfoKey>모집인원 :</InfoKey>
                <InfoValue>
                  {selectedPost?.min_participants} &nbsp;
                  <Span>명</Span> &nbsp; ~ &nbsp;
                  {selectedPost?.max_participants} &nbsp;
                  <Span>명</Span>
                </InfoValue>
              </FirstMenuBlock>
              {/*참여 인원*/}
              <SecondMenuBlock>
                <InfoKey>참여인원 :</InfoKey>
                <InfoValue>
                  {selectedPost?.num_participants} &nbsp;
                  <Span>명</Span>
                </InfoValue>
              </SecondMenuBlock>
            </InfoRow>

            {/* 카태고리 & 배송방법 */}
            <InfoRow>
              <FirstMenuBlock>
                <InfoKey>카테고리 :</InfoKey>
                <InfoValue>{selectedPost?.category}</InfoValue>
              </FirstMenuBlock>
              <SecondMenuBlock>
                <InfoKey>배송방법 :</InfoKey>
                <InfoValue>
                  {selectedPost?.trade_type === "DIRECT" ? "직거래" : "배송"}
                </InfoValue>
              </SecondMenuBlock>
            </InfoRow>

            {/* 카태고리 & 배송방법 */}
            <InfoRow>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <InfoKey>내용:</InfoKey>
                <InfoValue
                  sx={{
                    pl: rem(10),
                    // border: "1px solid",
                  }}
                >
                  <TextField
                    multiline
                    rows={6}
                    inputProps={{
                      style: { fontSize: rem(12) },
                    }}
                    sx={{
                      width: "100%",
                    }}
                    disabled
                    name="description"
                    value={selectedPost?.description}
                  />
                </InfoValue>
              </Box>
            </InfoRow>
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
    // border: " 1px solid black",
    height: "100%",
    padding: "0px 10px 0px 70px",
  };
});

const InfoRow = styled("div")(({ theme }) => {
  return {
    display: "flex",
    width: "100%",
    // border: "1px solid lime",
    "& + &": {
      marginTop: 9,
    },
  };
});

const FirstMenuBlock = styled("div")(({ theme }) => {
  return {
    width: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    // pr: "5rem",
  };
});
const SecondMenuBlock = styled("div")(({ theme }) => {
  return {
    width: "40%",
    // border: "1px solid blue",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    // paddingLeft: "2rem",
  };
});
const InfoKey = styled("div")(({ theme }) => {
  return {
    // border: "1px solid Sienna",
    width: 65,
    fontSize: rem(14),
    display: "flex",
  };
});
const InfoValue = styled("div")(({ theme }) => {
  return {
    paddingLeft: rem(10),
    // border: "1px solid red",
    width: "70%",
    display: "flex",
    fontSize: rem(14),
  };
});

const Span = styled("span")(({ theme }) => {
  return {
    color: Theme.color.gray[1],
  };
});

export default PostDetail;
