import { Post } from "./../lib/apiSite/apiSite";
import { Axios } from "../services/apis/MockConfig";
import {
  postObj_req,
  postObj_res,
} from "./../@types/models/apps/PostList";
import DjangoAxios, {
  DjangoFormHeaderAxios,
} from "../lib/apiSite/axios";

/*기능 : 수정 모달 완료 후 state에 기록 & 모달 닫기 */
export const onUpdatePost = (
  uuid: string,
  formData: FormData,
  onGetList: () => void,
  setMessage: (active: string) => void,
  setError: (active: string) => void
) => {
  // setSelectedUser(user);
  console.log("onUpdatePost지만 Fn 성공");

  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  /** 통신
   * Type: patch
   * To:우리 서버,
   * For: data 부분 수정,
   * res: 200 code, data
   * contentType: multipart-formdata
   * */
  DjangoFormHeaderAxios.patch(Post.ALL + uuid + "/", formData)
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
  formData: FormData,
  onGetList: () => void,
  setMessage: (active: string) => void,
  setError: (active: string) => void
) => {
  console.log("onCreatePost Fn 성공");

  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  /** 통신
   * Type: post
   * To:우리 서버,
   * For: post data 생성
   * res: 201 code, data
   * contentType: multipart-formdata
   * */
  DjangoFormHeaderAxios.post(Post.ALL, formData)
    .then(({ data, status }) => {
      console.log("받는 데이터 : ");
      console.dir(data);
      if (status === 201) {
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

/*기능 : 선택된 포스트 삭제 위한 비동기 통신, 모달 닫기 / 삭제확인, userPost 자료 초기화*/
export const onDeletePosts = (
  toDeletePosts: string,
  onGetList: () => void,
  setCheckedPosts: (params: string[]) => void,
  onDeny: (active: boolean) => void,
  setMessage: (active: string) => void
) => {
  /** 통신
   * Type: delete
   * To:우리 서버,
   * For: user data 삭제
   * */
  console.log(`삭제포스트's uuid : ${toDeletePosts}`);
  DjangoFormHeaderAxios.delete(Post.ALL + toDeletePosts + "/").then(
    ({ data, status }) => {
      if (status === 204) {
        console.log("onDeletePosts에서 data 받고, onGetList() 호출");
        setMessage("삭제 되었습니다");
        onGetList();
      } else {
        console.log(`dataList 받는 부분 에러 status : ${status}`);
      }
    }
  );

  onDeny(false);
  setCheckedPosts([]);
};
