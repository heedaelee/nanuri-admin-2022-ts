//기타, origin
//유니텍 서버
// const ip = '220.92.18.202';
//체인지된 서버
const ip = "nanuri.app";
export const NODE_API = `https://${ip}/api`;

//Node에서 처리 모듈 단위
//로그인
export const Auth = {
  SIGN_IN_API: "/auth/kakao/accounts/",
};
//유저
export const User = {
  ALL: "/v1/users/",
};
//게시물
export const Post = {
  ALL: "/v1/posts1/",
};

//기타
export const jsonHeader = {
  headers: {
    "Content-Type": "application/json",
  },
};
