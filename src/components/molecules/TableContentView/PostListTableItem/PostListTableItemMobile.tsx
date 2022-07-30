import { alpha } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import React from "react";
import { postObj_res } from "../../../../@types/models/apps/PostList";
import Theme from "../../../../lib/Theme";

const TableContentListItemWrapper = styled(ListItem)(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "row",
    fontSize: 14,
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 10,
    cursor: "pointer",
    overflow: "hidden",
    paddingLeft: 20,
    alignItems: "flex-start",
    "& .contactViewLeft": {
      alignItems: "flex-start",
    },
    "&.rootCheck": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      boxShadow: `0 3px 5px 0 ${alpha(
        theme.palette.common.black,
        0.08
      )}`,
    },
  };
});

interface PostListTableItemMobileProps {
  post: postObj_res;
  onChangeCheckedPosts?: (event: any, uuid: string) => void;
  checkedPosts: string[];
  onSelectPostsForDelete?: (postIds: string[]) => void;
  onOpenEditPost: (post: postObj_res) => void;
  onViewPostDetail: (post: postObj_res) => void;

  [x: string]: any;
}

const PostListTableItemMobile: React.FC<
  PostListTableItemMobileProps
> = ({ post, checkedPosts, onViewPostDetail: onViewUserDetail }) => {
  console.log(post.uuid);
  return (
    <>
      <TableContentListItemWrapper
        dense
        key={post.uuid}
        className={clsx("item-hover", {
          rootCheck: checkedPosts.includes(post.uuid),
        })}
        onClick={() => onViewUserDetail(post)}
      >
        <Box
          sx={{
            width: { xs: "75%", sm: "80%", md: "50%" },
            display: "flex",
            alignItems: "center",
          }}
          className="contactViewLeft"
        >
          <Box
            sx={{
              mr: 3,
              mt: 1,
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
                // src={post.image}
              />
            ) : (
              <Avatar
                sx={{
                  backgroundColor: blue[500],
                  width: 36,
                  height: 36,
                }}
              >
                {/* {post.name[0].toUpperCase()} */}
              </Avatar>
            )}
          </Box>
          <Box sx={{ mr: 3, overflow: "hidden" }}>
            <Box
              sx={{
                fontWeight: Theme.fonts.fontWeight.MEDIUM,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              component="p"
            >
              {/* {post.name} */}
            </Box>

            <Box
              component="p"
              sx={{
                color: "text.secondary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {/* {post.contact} */}
            </Box>
          </Box>
        </Box>
      </TableContentListItemWrapper>
    </>
  );
};

export default PostListTableItemMobile;
