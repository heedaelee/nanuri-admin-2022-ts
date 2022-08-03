import { alpha } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { blue } from "@mui/material/colors";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import React from "react";
import { postObj_res } from "../../../../@types/models/apps/PostList";
import Theme from "../../../../lib/Theme";
import ItemMenu from "../ItemMenu";

const PostListTableItemWrapper = styled(ListItem)(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 14,
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10,
    cursor: "pointer",
    overflow: "hidden",
    "&.rootCheck": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      boxShadow: `0 3px 5px 0 ${alpha(
        theme.palette.common.black,
        0.08
      )}`,
    },
    "& .conActionHoverHideRoot": {
      transition: "all 0.4s ease",
    },
    "&:hover": {
      "&": {
        background: "#f0c9932b",
      },
      "& .conActionHoverRoot": {
        opacity: 1,
        visibility: "visible",
        right: 0,
      },
      "& .conActionHoverHideRoot": {
        opacity: 0,
        visibility: "hidden",
      },
      "& .contactViewInfo": {
        [theme.breakpoints.up("sm")]: {
          width: "calc(100% - 114px)",
        },
      },
    },
  };
});

interface PostListTableItemProps {
  post: postObj_res;
  onChangeCheckedPosts: (event: any, uuid: string) => void;
  checkedPosts: string[];
  onSelectPostsForDelete: (postIds: string[]) => void;
  onOpenEditPost: (post: postObj_res) => void;
  onViewPostDetail: (post: postObj_res) => void;

  [x: string]: any;
}

const PostListTableItem: React.FC<PostListTableItemProps> = ({
  post,
  onChangeCheckedPosts,
  checkedPosts,
  onSelectPostsForDelete,
  onViewPostDetail,
  onOpenEditPost,
}) => {
  const itemRightMargin = 2;
  console.log("key test");
  console.log(post.uuid);

  // 상태 variable -> 한글 string
  const order_status =
    post.order_status === "WAITING"
      ? "모집중"
      : post.order_status === "ORDERING"
      ? "주문 진행중"
      : post.order_status === "ORDERED"
      ? "주문 완료"
      : post.order_status === "DELIVERING1"
      ? "1차 배송중"
      : post.order_status === "DELIVERING2"
      ? "2차 배송중"
      : post.order_status === "DELIVERED"
      ? "배송 완료"
      : post.order_status === "CANCELLED"
      ? "취소"
      : "에러";

  return (
    <>
      <PostListTableItemWrapper
        dense
        key={post.uuid}
        className={clsx("item-hover", {
          rootCheck: checkedPosts.includes(post.uuid),
        })}
        sx={{ padding: "4px 10px", display: "flex" }}
        onClick={() => onViewPostDetail(post)}
      >
        {/* 왼쪽 블록 */}
        <Box
          sx={{
            width: { xs: "75%", sm: "80%", md: "55%" },
            display: "flex",
            alignItems: "center",
            // border: "1px solid red",
            // justifyContent: "center",
            textAlign: "center",
          }}
        >
          <span
            onClick={(event) => event.stopPropagation()}
            style={{ width: "10%" }}
          >
            <Checkbox
              sx={{
                color: (theme) => theme.palette.text.disabled,
              }}
              checked={checkedPosts.includes(post.uuid)}
              onChange={(event) =>
                onChangeCheckedPosts(event, post.uuid)
              }
              color="primary"
            />
          </span>
          {/* 프로필 */}
          <Box
            sx={{
              //mr: itemRightMargin,
              width: "10%",
            }}
            component="span"
          >
            {post.image ? (
              <Avatar
                sx={{
                  backgroundColor: blue[500],
                  width: 36,
                  height: 36,
                }}
                src={
                  typeof post.image === "string"
                    ? post.image
                    : undefined
                }
              />
            ) : (
              <Avatar
                sx={{
                  backgroundColor: blue[500],
                  width: 36,
                  height: 36,
                }}
              >
                {post.writer_nickname.toUpperCase()}
              </Avatar>
            )}
          </Box>
          {/* 상태 */}
          <Box
            component="span"
            sx={{
              //mr: itemRightMargin,
              fontWeight: Theme.fonts.fontWeight.MEDIUM,
              width: "16%",
              // overflow: "hidden",
              // textOverflow: "ellipsis",
              // whiteSpace: "nowrap",
            }}
          >
            {order_status}
          </Box>
          {/* 제목 */}
          <Box
            component="span"
            sx={{
              //mr: itemRightMargin,
              width: "50%",
              display: { xs: "none", sm: "block" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "left",
            }}
          >
            {post.title}
          </Box>
          <Box
            component="span"
            sx={{
              width: "16%",
              display: { xs: "none", sm: "block" },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {post.writer_nickname}
          </Box>
        </Box>
        {/* 오른쪽 블록 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: { xs: "25%", sm: "20%", md: "45%" },
            // border: "1px solid",
          }}
        >
          <Box
            sx={{
              transition: "all 0.4s ease",
              display: "flex",
              alignItems: "center",
              width: { sm: "calc(100% - 54px)" },
              justifyContent: "center",
            }}
            className="contactViewInfo"
          >
            {/* 카텍고리*/}
            <Box
              component="span"
              sx={{
                //mr: itemRightMargin,
                flex: 1,
                display: { xs: "none", md: "flex" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                justifyContent: "center",
              }}
            >
              {post.category}
            </Box>
            <Box
              component="span"
              sx={{
                flex: 3,
                display: { xs: "none", md: "flex" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                justifyContent: "center",
              }}
            >
              {post.waited_from &&
                post.waited_from.toString().slice(0, 10)}{" "}
              ~{" "}
              {post.waited_until &&
                post.waited_until.toString().slice(0, 10)}
            </Box>
          </Box>

          <Box
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
            {/* 공통 컴포넌트 */}
            <ItemMenu
              post={post}
              type={"POSTLIST"}
              onOpenEditPost={onOpenEditPost}
              onSelectItemsForDelete={onSelectPostsForDelete}
            />
          </Box>
        </Box>
      </PostListTableItemWrapper>
    </>
  );
};

export default PostListTableItem;
