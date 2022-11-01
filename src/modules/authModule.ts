import axios from "axios";

export function loginWithKakao() {
  console.log('loginWithKakao() 찍음');
  const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`;

  //NOTE:js sdk 사용시
  // window.Kakao.Auth.authorize({
  //   redirectUri: "http://localhost:3000/auth/kakao/callback",
  // });

  //NOTE:restAPI 사용시
  const CLIENT_ID = `${process.env.REACT_APP_RESTAPI_KAKAO_APP_KEY}`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  window.location.href = KAKAO_AUTH_URL;

  // navigate는 router 내부만..
  // navigate(KAKAO_AUTH_URL);
}
