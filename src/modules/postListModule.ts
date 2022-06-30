import { Axios } from "../services/apis/MockConfig";
import { post } from "./../@types/models/apps/PostList";

/*기능 : 수정 모달 완료 후 state에 기록 & 모달 닫기 */
export const onUpdatePost = (
  post: post,
  onGetList: (params?: any) => void,
  setMessage: (active: string) => void,
  setError: (active: string) => void
) => {
  // setSelectedUser(user);
  console.log("onUpdatePost지만 Fn 성공");
  Axios.patch("/api/postlist/update", { post: post })
    .then(({ data, status }) => {
      console.log("받는 데이터 : ");
      console.dir(data);
      if (status === 200) {
        // dispatch(fetchSuccess());
        console.log("onUpdatePost/  받고 getlist호출");
        setMessage("유저 정보가 업데이트 되었습니다");
        onGetList();
      } else {
        console.log("TableHeader/onUpdatePost() 받는 부분 에러");
        setError("에러가 발생했습니다.");
      }
    })
    .catch((error) => {
      setError("에러가 발생했습니다.");
    });
};

export const onCreatePost = (
  post: post,
  onGetList: (params?: any) => void,
  setMessage: (active: string) => void,
  setError: (active: string) => void
) => {
  console.log("onCreatePost Fn 성공");

  Axios.post("/api/postlist/create", { post: post })
    .then(({ data, status }) => {
      console.log("받는 데이터 : ");
      console.dir(data);
      if (status === 200) {
        // dispatch(fetchSuccess());
        console.log("onCreatePost/  받고 getlist호출");
        setMessage("새로운 글이 추가되었습니다");
        onGetList();
      } else {
        console.log("TableHeader/onCreatePost() 받는 부분 에러");
        setError("에러가 발생했습니다.");
      }
    })
    .catch((error) => {
      setError("에러가 발생했습니다.");
    });
};

/*기능 : 선택된 유저 삭제 위한 비동기 통신, 모달 닫기 / 삭제확인, userList 자료 초기화*/
// export const onDeleteUsers = (
//   toDeleteUsers: number[],
//   onGetList: (params?: any) => void,
//   setCheckedUsers: (params: number[]) => void,
//   onDeny: (active: boolean) => void,
//   setMessage: (active: string) => void
// ) => {
//   Axios.delete("/api/userlist/delete", {
//     data: { userIds: toDeleteUsers },
//   }).then(({ data, status }) => {
//     if (status === 200) {
//       console.log("dataList 받고 전체 state에 set함");
//       setMessage("삭제 되었습니다");
//       onGetList();
//     } else {
//       console.log("dataList 받는 부분 에러");
//     }
//   });

//   onDeny(false);
//   setCheckedUsers([]);
// };
