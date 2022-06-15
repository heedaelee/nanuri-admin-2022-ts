import { Axios } from "./../services/apis/MockConfig";
import { UserListObj } from "./../@types/models/apps/UserList";

/*기능 : 수정 모달 완료 후 state에 기록 & 모달 닫기 */
export const onUpdateUser = (
  user: UserListObj,
  onGetList: (params?: any) => void
) => {
  // setSelectedUser(user);
  console.log("onUpdateUser Fn 성공");
  Axios.put("/api/userlist/update", { user: user }).then(
    ({ data, status }) => {
      console.log("받는 데이터 : ");
      console.dir(data);
      if (status === 200) {
        // dispatch(fetchSuccess());
        console.log("onUpdateUser/  받고 getlist호출");
        // console.dir(data);
        onGetList();
        //TODO:보류
        // dispatch(
        //   showMessage(messages["message.contactCreated"] as string)
        // );
      } else {
        console.log("TableHeader/onUpdateUser() 받는 부분 에러");
        //TODO:보류
        // dispatch(
        //   fetchError(messages["message.somethingWentWrong"] as string)
        // );
      }
    }
  );
};

export const onCreateUser = (
  user: UserListObj,
  onGetList: (params?: any) => void
) => {
  console.log("onCreateUser Fn 성공");

  Axios.post("/api/userlist/create", { user: user })
    .then(({ data, status }) => {
      console.log("받는 데이터 : ");
      console.dir(data);
      if (status === 200) {
        // dispatch(fetchSuccess());
        console.log("onCreateUser/  받고 getlist호출");
        onGetList();
        //TODO:보류
        // dispatch(
        //   showMessage(messages["message.contactCreated"] as string)
        // );
      } else {
        console.log("TableHeader/onCreateUser() 받는 부분 에러");
        //TODO:보류
        // dispatch(
        //   fetchError(messages["message.somethingWentWrong"] as string)
        // );
      }
    })
    .catch((error) => {
      //TODO:보류
      // dispatch(fetchError(error.message));
    });
};

/*기능 : 선택된 유저 삭제 위한 비동기 통신, 모달 닫기 / 삭제확인, userList 자료 초기화*/
export const onDeleteUsers = (
  toDeleteUsers: number[],
  onGetList: (params?: any) => void,
  setCheckedUsers: (params: number[]) => void,
  onDeny: (active: boolean) => void
) => {
  Axios.delete("/api/userlist/delete", {
    data: { userIds: toDeleteUsers },
  }).then(({ data, status }) => {
    if (status === 200) {
      console.log("dataList 받고 전체 state에 set함");
      onGetList();
    } else {
      console.log("dataList 받는 부분 에러");
    }
  });

  onDeny(false);
  setCheckedUsers([]);
};
