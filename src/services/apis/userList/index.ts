import { UserListObj } from "./../../../@types/models/apps/UserList";
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

  return [200, { list, total }];
});

/* Delete user */
mock
  .onDelete("/api/userlist/delete")
  .reply((request: AxiosRequestConfig) => {
    const { userIds, page } = JSON.parse(request.data);

    userList = userList.filter((user) => !userIds.includes(user.id));

    // let deletedUserList: UserListObj[];
    const index = page * pageNum;
    const total = userList.length;
    const list =
      userList.length > pageNum
        ? userList.slice(index, index + pageNum)
        : userList;

    return [200, { list, total }];
  });

/* Create user */
mock
  .onPost("/api/userlist/create")
  .reply((request: AxiosRequestConfig) => {
    const { user } = JSON.parse(request.data);
    console.log(`mock 서버 /api/userlist/create,  user: ${user}`);
    userList = [user, ...userList];

    // let deletedUserList: UserListObj[];
    const total = userList.length;
    // const list =
    //   userList.length > pageNum
    //     ? userList.slice(index, index + pageNum)
    //     : userList;

    // return [200, { list, total }];
    return [200];
  });
