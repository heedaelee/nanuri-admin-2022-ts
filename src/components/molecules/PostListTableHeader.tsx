import React from "react";
import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import Checkbox from "../atoms/TableCheckBox";
import AppSearchBar from "../atoms/AppSearchBar/index";
import {
  postObj_res,
  PostListObj,
} from "../../@types/models/apps/PostList";
import CheckedActions from "./CheckedActions";
import TableViewSelectButtons from "./TableViewSelectButtons";
import AppsPagination from "../atoms/AppsPagination";
import { Button } from "@mui/material";
import Theme from "../../lib/Theme";
import useBoolean from "../../hooks/useBoolean";
import CreatePost from "./PostCreate";

interface PostListTableHeaderProps {
  checkedPosts: string[];
  setCheckedPosts: (checkedPosts: string[]) => void;
  filterText: string;
  onSetFilterText: (filterText: string) => void;
  onSelectPostsForDelete: (posts: string[]) => void;
  page: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  postList: postObj_res[] | [];
  totalPosts: number;
  //리스트 조회하는 것
  onGetList: () => void;
  handleAddPostOpen: () => void;
  postImage: { file: File; isRep: boolean }[];
  setPostImage: (active: { file: File; isRep: boolean }[]) => void;
  resImageObjarr: [] | { file: string; isRep: boolean }[];
}

const PostListTableHeader = ({
  checkedPosts,
  setCheckedPosts,
  filterText,
  onSelectPostsForDelete,
  onSetFilterText,
  onPageChange,
  page,
  postList,
  totalPosts,
  onGetList,
  handleAddPostOpen,
  postImage,
  setPostImage,
  resImageObjarr,
}: PostListTableHeaderProps) => {
  //추가
  const [isAddPost, onSetIsAddPost] = useBoolean(false);

  /**
   * 기능 : 모달 오픈 - 유저추가
   * PostListTemplate에 있는것과 달리 따로 이렇게 만들어야 함
   * 같이 사용하면 안됨 x
   */
  // const handleAddPostOpen = () => {
  //   onSetIsAddPost(true);
  // };
  /**
   * 기능 : 모달 오픈 - 유저추가
   * PostListTemplate에 있는것과 달리 따로 이렇게 만들어야 함
   * 같이 사용하면 안됨 x
   */
  const handleAddPostClose = () => {
    onSetIsAddPost(false);
  };
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // border: "1px solid red",
      }}
    >
      <Checkbox
        checkedItems={checkedPosts}
        setCheckedItems={setCheckedPosts}
        data={postList}
      />
      <AppSearchBar
        iconPosition="right"
        overlap={false}
        value={filterText}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onSetFilterText(event.target.value)
        }
        placeholder="여기에 검색하세요!"
      />

      <Button
        sx={{
          fontSize: "1.2rem",
          fontFamily: Theme.fonts.fontFamily,
          // background: "#eff3fb80",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          ml: "1rem",
        }}
        variant="outlined"
        size="large"
        onClick={handleAddPostOpen}
      >
        + 게시물 생성
      </Button>

      {/* 체크된 게 1개 이상일때 Action */}
      {checkedPosts.length > 0 ? (
        <CheckedActions
          checkedItems={checkedPosts}
          setCheckedItems={setCheckedPosts}
          onSelectItemsForDelete={onSelectPostsForDelete}
        />
      ) : null}
      <Hidden smDown>
        {postList.length > 0 ? (
          <AppsPagination
            sx={{
              ml: 2,
              // border: "1px solid",
              display: "flex",
              flex: 1,
              justifyContent: "flex-end",
            }}
            count={totalPosts}
            page={page}
            onPageChange={onPageChange}
          />
        ) : null}
      </Hidden>

      {/* TODO: 추가 모달임, 만들어야 함 */}
      <CreatePost
        isAddPost={isAddPost}
        handleAddPostClose={handleAddPostClose}
        onGetList={onGetList}
        setPostImage={setPostImage}
        postImage={postImage}
        resImageObjarr={resImageObjarr}
        // totalPosts={totalPosts}
      />
    </Box>
  );
};

export default PostListTableHeader;
