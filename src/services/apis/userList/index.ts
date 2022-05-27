import { AxiosRequestConfig } from "axios";
import userListData from "../../../db/apps/userList/userList";
import mock from "../MockConfig";

let userList = userListData;

mock.onGet("/api/userlist").reply((config: AxiosRequestConfig) => {
  const { params } = config;

  const index = params.page * 15;
  const total = userList.length;
  //일단 서버 없으니, 단순히 배열리스트 자료에서 index 값에 맞게 slice 해서 페이징 하는 원리
  const list =
    userList.length > 15
      ? userList.slice(index, index + 15)
      : userList;

  return [200, { list, total }];
});
