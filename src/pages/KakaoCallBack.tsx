import axios from "axios";
import React, { useEffect } from "react";

const KakaoCallBack = () => {
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");
    const grant_type = "authorization_code";
    const client_id = `${process.env.REACT_APP_RESTAPI_KAKAO_APP_KEY}`;
    const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`;

    // console.log(
    //   "url : ",
    //   `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URI}&code=${code}`
    // );
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {},
        {
          headers: {
            "Content-type":
              "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        console.log(res);
        const { data } = res;
        const { access_token } = data;
        // res에 포함된 토큰 받아서 원하는 로직을 하면된다.
        if (access_token) {
          console.log(`Bearer ${access_token}`);
          axios
            .post(
              "https://kapi.kakao.com/v2/user/me",
              {},
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                  "Content-type": "application/x-www-form-urlencoded",
                },
              }
            )
            .then((res) => {
              console.log("데이터 성공 : ");
              console.log(res);
            });
        } else {
          console.log("access_token 없음!");
        }
      });
  }, []);
  return <></>;
};

export default KakaoCallBack;
