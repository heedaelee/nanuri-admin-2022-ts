import React, { useEffect, useState } from "react";
import {
  postObj_res,
  PostListObj,
} from "../../@types/models/apps/PostList";
import useBoolean from "../../hooks/useBoolean";
import useInput from "../../hooks/useInput";
import { Axios } from "../../services/apis/MockConfig";
import AppsHeader from "../atoms/ AppsHeader";
import AppsContent from "../atoms/AppsContent";
import PostListTableHeader from "../molecules/PostListTableHeader";
import TableContentView from "../molecules/TableContentView";
import AppContainer from "../organisms/AppContainer";
//NOTE: mock 데이터 import 해줘야함!!! 필수! required!
import "../../services/apis/PostList/index";
import CreatePost from "../molecules/PostCreate";
import PostDetail from "../molecules/PostDetail";
import AppConfirmDialog from "../atoms/AppConfirmDialog";
import DjangoAxios from "../../lib/apiSite/axios";
import Theme from "../../lib/Theme";
import { Post } from "../../lib/apiSite/apiSite";

interface PostListPageProps {}

const PostListPage = ({}: PostListPageProps) => {
  const [filterText, onSetFilterText] = useInput("");
  //페이지 넘버
  const [page, setPage] = useState(0);
  //체크된 버튼 ids 데이터화 (num array)
  const [checkedPosts, setCheckedPosts] = useState<string[]>([]);
  //체크버튼(for 삭제) 입력
  const [postsToDelete, setPostsToDelete] = useState<string[]>([]);

  /** 모달 */
  //삭제
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useBoolean(false);
  //수정, not 추가
  const [isAddPost, onSetIsAddPost] = useBoolean(false);
  //상세
  const [isShowDetail, onShowDetail] = useState<boolean>(false);
  //상세, 수정 선택된 포스트 데이터 기록하기
  const [selectedPost, setSelectedPost] =
    useState<postObj_res | null>(null);

  //로딩
  const [loading, setLoading] = useBoolean(false);

  //PostList데이터
  const [postList, setPostList] = useState<
    PostListObj["results"] | []
  >([]);
  //총 포스트수
  const [totalPosts, setTotalPosts] = useState(0);

  // useEffect(() => {
  //   setPage(0);
  // }, [pathname]);

  console.log("====================================");
  console.log("selectedPost : ");
  console.log(selectedPost);
  console.log("====================================");

  /*기능 :  userList 받아옴 */
  useEffect(() => {
    console.log("useEffect");
    onGetPostList(page);
  }, [page]);

  /*기능 : 포스트 수정/추가 모달 오픈  */
  const handleAddPostOpen = () => {
    onSetIsAddPost(true);
  };

  /*기능 : 포스트 수정/추가 모달 닫음 */
  const handleAddPostClose = () => {
    onSetIsAddPost(false);
    setSelectedPost(null);
  };

  /*기능 : 포스트 상세 모달 닫음 */
  const handleDetailPostClose = () => {
    console.log("탄다");
    onShowDetail(false);
    setSelectedPost(null);
  };

  /*기능 : 모달 오픈, 데이터 전달 - 포스트 상세 */
  const onViewPostDetail = (post: postObj_res) => {
    setSelectedPost(post);
    onShowDetail(true);
  };

  /*기능 : 모달 오픈, 데이터 전달 - 포스트 수정 */
  const onOpenEditPost = (post: postObj_res | null) => {
    setSelectedPost(post);
    onShowDetail(false);
    handleAddPostOpen();
  };

  /*기능 : 페이지 변경*/
  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    value: number
  ) => {
    // console.log(`val : ${value}`);
    setPage(value);
  };

  /*기능 : 체크된 포스트 기록 */
  const onChangeCheckedPosts = (event: any, uuid: string) => {
    // 현재 checkbox에 체크되어있으면, 배열에 추가
    if (event.target.checked) {
      setCheckedPosts(checkedPosts.concat(uuid));
    } else {
      //안되어 있으면
      setCheckedPosts(
        checkedPosts.filter((postId) => postId !== uuid)
      );
    }
  };

  /*기능 : 검색후 해당되는 리스트 자료 배열로 리턴 */
  const onGetFilteredItems = () => {
    if (filterText === "") {
      return postList;
    } else {
      return postList.filter(
        (post) =>
          post.title
            .toUpperCase()
            .includes(filterText.toUpperCase()) ||
          post.description
            .toUpperCase()
            .includes(filterText.toUpperCase()) ||
          post.writer_nickname
            .toUpperCase()
            .includes(filterText.toUpperCase())
      );
    }
  };

  /*기능 : 삭제할 포스트 set, 삭제 모달 open*/
  const onSelectPostsForDelete = (postIds: string[]) => {
    setPostsToDelete(postIds);
    setDeleteDialogOpen(true);
  };

  /*기능 : 검색 적용된 userList를 리턴함 */
  const list = onGetFilteredItems();

  /*기능 : 조회 PostList */
  function onGetPostList(currentPage?: number) {
    console.log("onGetPostList 호출");

    const limit = Theme.numOfItemsPerPage;
    const pageNum = currentPage ? currentPage : 0;
    const offset = pageNum * limit;

    DjangoAxios.get(Post.ALL, {
      params: { limit: limit, offset: offset },
    }).then(({ data, status }) => {
      if (status === 200) {
        console.log(
          "[DjangoAxios.get] postList 받고 전체 state에 set함"
        );
        console.dir(data);
        //NOTE: 테이블 리스트 리랜더링 셋트!
        setPostList(data.results);
        setTotalPosts(data.count);
      } else {
        console.log("not status 200, dataList 받는 부분 에러");
        console.log(`status : ${status}`);
      }
    });
  }

  /* 전략 : postImageObj은 말 그대로 post 통신할때만 쓰는 img 객체, 따라서 {file: File,}값이고
    responseImg는 resImageObj로 사용한다
  */

  // let resImageObjarr = [];
  // /*기능 : 선택된 post의 대표image 랑 각images 합쳐서 배열로 만들기*/
  // if (selectedPost && selectedPost.image!!) {
  //   resImageObjarr.push({ file: selectedPost.image, isRep: true });
  //   if (selectedPost.images) {
  //     for (let value of selectedPost.images) {
  //       resImageObjarr.push({ file: value, isRep: false });
  //     }
  //   }
  // }

  // console.log("resImageObjarr : ");
  // console.dir(resImageObjarr);

  

  return (
    <>
      <AppContainer>
        <div style={{ width: "100%" }}>
          <AppsHeader>
            {/* 게시물 추가 모달은 Header 안에 
              header랑 contente는 일부러 userList랑 PostList랑 컴포넌트 별개로
              가져갔음. 
              이유 : 추후 수정할수도 있고, 공통 컴포넌트 가져가도 되는데, 변수명 바꾸고
              그러한 공수도 의미 없을수도 있고, 추후에 다른 기획이 들어올수도 있고 하니깐.
            */}
            <PostListTableHeader
              handleAddPostOpen={handleAddPostOpen}
              postList={list}
              totalPosts={totalPosts}
              checkedPosts={checkedPosts}
              setCheckedPosts={setCheckedPosts}
              filterText={filterText}
              onSelectPostsForDelete={onSelectPostsForDelete}
              onSetFilterText={onSetFilterText}
              onPageChange={onPageChange}
              page={page}
              onGetList={onGetPostList}
              // resImageObjarr={resImageObjarr}
            />
          </AppsHeader>
        </div>
        <AppsContent>
          <TableContentView
            type="POSTLIST"
            list={list}
            loading={loading}
            handleAddModalOpen={handleAddPostOpen}
            onChangeCheckedPosts={onChangeCheckedPosts}
            checkedItems={checkedPosts}
            onSelectItemsForDelete={onSelectPostsForDelete}
            onViewItemDetail={onViewPostDetail}
            onOpenEditItem={onOpenEditPost}
          />
        </AppsContent>

        {/* 수정 모달임, 추가는 헤더 버튼에.. */}
        <CreatePost
          isAddPost={isAddPost}
          handleAddPostClose={handleAddPostClose}
          selectedPost={selectedPost}
          //redux 안쓰니.. 아래값 넘겨줘야..
          setSelectedPost={setSelectedPost}
          onGetList={onGetPostList}
          //image배열로 합치는 resource
          // resImageObjarr={resImageObjarr}
        />

        {/* post 상세 모달임 */}
        {/* TODO: */}
        <PostDetail
          selectedPost={selectedPost}
          isShowDetail={isShowDetail}
          onShowDetail={onShowDetail}
          onSelectPostsForDelete={onSelectPostsForDelete}
          onOpenEditPost={onOpenEditPost}
          handleDetailPostClose={handleDetailPostClose}
          //image배열로 합치는 resource
        />

        {/* 확인 모달 */}
        <AppConfirmDialog
          type="DELETE_POSTS"
          deleteModule={{
            listToDelete: postsToDelete,
            setListToDelete: setPostsToDelete,
          }}
          open={isDeleteDialogOpen}
          onDeny={setDeleteDialogOpen}
          title={"해당 게시물을 \n 정말 삭제하시겠습니까?"}
          dialogTitle={""}
          onGetList={onGetPostList}
        />
      </AppContainer>
    </>
  );
};

export default PostListPage;
