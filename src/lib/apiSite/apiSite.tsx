//기타, origin
//유니텍 서버
// const ip = '220.92.18.202';

// const ip = "nanuri.app";
// export const NODE_API = `https://${ip}/api`;

/**
 * src/index.tsx 에 axios.defaults.baseURL =
 * "https://nanuri.app/api" 로 기본 URL이 정의 되어 있음.
 * 그래서 그 이후 url을 사용하면 됨
 * */

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
  ALL: "/v1/posts/",
};

//기타
export const jsonHeader = {
  headers: {
    "Content-Type": "application/json",
  },
};
