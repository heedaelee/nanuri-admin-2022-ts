import { useContext } from "react";
import { Axios } from "../services/apis/MockConfig";
import { UserListObj } from "./../@types/models/apps/UserList";
import { UserContext } from "../lib/userAuthProvider/userAuthProvider";
import { AppInfoContext } from "../lib/AppInfoProvider/AppInfoProvider";

/**
 * NOTE:조회는 따로 안 빼기로함. 조회는 userListPage.tsx에 사용하는 컴포넌트가 많은데
 * setUserList와 setTotalUsers 또한 다 따로 빼야 하므로, 빼지 않는게 더 효율적
 */

/*기능 : 수정 모달 완료 후 state에 기록 & 모달 닫기 */
export const onUpdateUser = (
  user: UserListObj,
  onGetList: (params?: any) => void,
  setMessage: (active: string) => void,
  setError: (active: string) => void
) => {
  // setSelectedUser(user);
  console.log("onUpdateUser Fn 성공");
  Axios.put("/api/userlist/update", { user: user })
    .then(({ data, status }) => {
      console.log("받는 데이터 : ");
      console.dir(data);
      if (status === 200) {
        // dispatch(fetchSuccess());
        console.log("onUpdateUser/  받고 getlist호출");
        setMessage("유저 정보가 업데이트 되었습니다");
        onGetList();
      } else {
        console.log("TableHeader/onUpdateUser() 받는 부분 에러");
        setError("에러가 발생했습니다.");
      }
    })
    .catch((error) => {
      setError("에러가 발생했습니다.");
    });
};

export const onCreateUser = (
  user: UserListObj,
  onGetList: (params?: any) => void,
  setMessage: (active: string) => void,
  setError: (active: string) => void
) => {
  console.log("onCreateUser Fn 성공");

  Axios.post("/api/userlist/create", { user: user })
    .then(({ data, status }) => {
      console.log("받는 데이터 : ");
      console.dir(data);
      if (status === 200) {
        // dispatch(fetchSuccess());
        console.log("onCreateUser/  받고 getlist호출");
        setMessage("새로운 유저가 추가되었습니다");
        onGetList();
      } else {
        console.log("TableHeader/onCreateUser() 받는 부분 에러");
        setError("에러가 발생했습니다.");
      }
    })
    .catch((error) => {
      setError("에러가 발생했습니다.");
    });
};

/*기능 : 선택된 유저 삭제 위한 비동기 통신, 모달 닫기 / 삭제확인, userList 자료 초기화*/
export const onDeleteUsers = (
  toDeleteUsers: number[],
  onGetList: (params?: any) => void,
  setCheckedUsers: (params: number[]) => void,
  onDeny: (active: boolean) => void,
  setMessage: (active: string) => void
) => {
  Axios.delete("/api/userlist/delete", {
    data: { userIds: toDeleteUsers },
  }).then(({ data, status }) => {
    if (status === 200) {
      console.log("dataList 받고 전체 state에 set함");
      setMessage("삭제 되었습니다");
      onGetList();
    } else {
      console.log("dataList 받는 부분 에러");
    }
  });

  onDeny(false);
  setCheckedUsers([]);
};
