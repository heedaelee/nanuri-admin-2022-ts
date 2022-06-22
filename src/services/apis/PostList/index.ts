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
  console.log('탄다');
  
  const { params } = config;

  const index = params.page * pageNum;
  const total = postList.length;
  //일단 서버가 없으니,
  //단순히 배열리스트 자료에서 index 값에 맞게 slice 해서 페이징 하는 원리
  const list =
    postList.length > pageNum
      ? postList.slice(index, index + pageNum)
      : postList;

  console.log("usreList mock에서 뿌릴 데이터");
  console.dir({ list, total });

  return [200, { list, total }];
});

/* Create post */
// mock
//   .onPost("/api/userlist/create")
//   .reply((request: AxiosRequestConfig) => {
//     const { user } = JSON.parse(request.data);
//     console.log(
//       `mock 서버 /api/userlist/create,  user: ${JSON.stringify(user)}`
//     );
//     postList = [...postList, user];
//     console.log("====================================");
//     console.log("유저 리스트");
//     console.log(postList);
//     console.log("====================================");
//     return [200, { user }];
//   });

// /* Update user */
// mock
//   .onPut("/api/userlist/update")
//   .reply((request: AxiosRequestConfig) => {
//     const { user } = JSON.parse(request.data);
//     console.log(
//       `mock 서버 /api/userlist/update,  user: ${JSON.stringify(user)}`
//     );
//     postList = postList.map((val, i) =>
//       val.id === user.id ? { ...val, ...user } : val
//     );

//     console.log("====================================");
//     console.log("수정된 유저 리스트 : ");
//     console.log(postList);
//     console.log("====================================");

//     return [200, { user }];
//   });

// /* Delete user */
// mock
//   .onDelete("/api/userlist/delete")
//   .reply((request: AxiosRequestConfig) => {
//     const { userIds, page } = JSON.parse(request.data);

//     postList = postList.filter((user) => !userIds.includes(user.id));

//     // let deletedUserList: UserListObj[];
//     const index = page * pageNum;
//     const total = postList.length;
//     const list =
//       postList.length > pageNum
//         ? postList.slice(index, index + pageNum)
//         : postList;

//     return [200, { list, total }];
//   });
