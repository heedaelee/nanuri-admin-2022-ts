import { UserObj_res } from "../../../@types/models/apps/UserList";
import { AxiosRequestConfig } from "axios";
import userListData from "../../../db/apps/userList/userList";
import mock from "../MockConfig";
import Theme from "../../../lib/Theme";

let userList = userListData;
const pageNum = Theme.numOfItemsPerPage;
/* userLIst */
mock.onGet("/api/userlist").reply((config: AxiosRequestConfig) => {
  const { params } = config;

  const index = params.page * pageNum;
  const total = userList.length;
  //일단 서버 없으니, 단순히 배열리스트 자료에서 index 값에 맞게 slice 해서 페이징 하는 원리
  const list =
    userList.length > pageNum
      ? userList.slice(index, index + pageNum)
      : userList;

  console.log("usreList mock에서 뿌릴 데이터");
  console.dir({ list, total });

  return [200, { list, total }];
});

/* Create user */
mock
  .onPost("/api/userlist/create")
  .reply((request: AxiosRequestConfig) => {
    const { user } = JSON.parse(request.data);
    console.log(
      `mock 서버 /api/userlist/create,  user: ${JSON.stringify(user)}`
    );
    userList = [...userList, user];
    console.log("====================================");
    console.log("유저 리스트");
    console.log(userList);
    console.log("====================================");
    // const list =
    //   userList.length > pageNum
    //     ? userList.slice(index, index + pageNum)
    //     : userList;

    // return [200, { list, total }];
    return [200, { user }];
  });

/* Update user */
mock
  .onPut("/api/userlist/update")
  .reply((request: AxiosRequestConfig) => {
    const { user } = JSON.parse(request.data);
    console.log(
      `mock 서버 /api/userlist/update,  user: ${JSON.stringify(user)}`
    );
    userList = userList.map((val, i) =>
      val.uuid === user.uuid ? { ...val, ...user } : val
    );

    console.log("====================================");
    console.log("수정된 유저 리스트 : ");
    console.log(userList);
    console.log("====================================");

    return [200, { user }];
  });

/* Delete user */
mock
  .onDelete("/api/userlist/delete")
  .reply((request: AxiosRequestConfig) => {
    const { userIds } = JSON.parse(request.data);

    userList = userList.filter((user) => !userIds.includes(user.uuid));

    // let deletedUserList: UserListObj[];
    // const index = page * pageNum;
    // const total = userList.length;
    // const list =
    //   userList.length > pageNum
    //     ? userList.slice(index, index + pageNum)
    //     : userList;

    return [200];
  });

// mock.onGet("/api/postlist").reply((config: AxiosRequestConfig) => {
//   console.log("탄다");
//   return [200];
// });
