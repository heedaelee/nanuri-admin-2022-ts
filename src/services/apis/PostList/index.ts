import {
  PostListObj,
  post,
} from "../../../@types/models/apps/PostList";
import { AxiosRequestConfig } from "axios";
import postListData from "../../../db/apps/PostList/postList";
import mock from "../MockConfig";
import Theme from "../../../lib/Theme";

let postList = postListData.results;
const pageNum = Theme.numOfItemsPerPage;
/* postLIst */
mock.onGet("/api/postlist").reply((config: AxiosRequestConfig) => {
  console.log("탄다");
  const { params } = config;
  const index = params.page * pageNum;
  const total = postList.length;
  //일단 서버가 없으니,
  //단순히 배열리스트 자료에서 index 값에 맞게 slice 해서 페이징 하는 원리
  const list =
    postList.length > pageNum
      ? postList.slice(index, index + pageNum)
      : postList;

  // console.log("usreList mock에서 뿌릴 데이터");
  // console.dir({ list, total });

  return [200, { list, total }];
});

/* Create post */
mock
  .onPost("/api/postlist/create")
  .reply((request: AxiosRequestConfig) => {
    const { post } = JSON.parse(request.data);
    console.log(
      `mock 서버 /api/postlist/create,  post: ${JSON.stringify(post)}`
    );
    postList = [...postList, post];
    console.log("====================================");
    console.log("유저 리스트");
    console.log(postList);
    console.log("====================================");
    return [200, { post }];
  });

// /* Update post */
mock
  .onPatch("/api/postlist/update")
  .reply((request: AxiosRequestConfig) => {
    const { post } = JSON.parse(request.data);
    console.log(
      `mock 서버 /api/postlist/update,  post: ${JSON.stringify(post)}`
    );
    postList = postList.map((val, i) =>
      val.uuid === post.uuid ? { ...val, ...post } : val
    );

    console.log("====================================");
    console.log("수정된 유저 리스트 : ");
    console.log(postList);
    console.log("====================================");

    return [200, { post }];
  });

// /* Delete post */
mock
  .onDelete("/api/postlist/delete")
  .reply((request: AxiosRequestConfig) => {
    const { postIds, page } = JSON.parse(request.data);

    postList = postList.filter(
      (post) => !postIds.includes(post.uuid)
    );

    // let deletedUserList: UserListObj[];
    const index = page * pageNum;
    const total = postList.length;
    const list =
      postList.length > pageNum
        ? postList.slice(index, index + pageNum)
        : postList;

    return [200, { list, total }];
  });
