import axios from "axios";
import React, { useContext, useEffect } from "react";
import {
  // NODE_API,
  Auth,
  jsonHeader,
  User,
} from "../lib/apiSite/apiSite";
import { UserContext } from "../lib/userAuthProvider/userAuthProvider";

const KakaoCallBack = () => {
  const { setUserInfo } = useContext(UserContext);

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");
    const grant_type = "authorization_code";
    const client_id = `${process.env.REACT_APP_RESTAPI_KAKAO_APP_KEY}`;
    const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_REDIRECT_URL}`;
    /** 통신
     * Type: POST
     * To:카카오서버,
     * For:액세스 토큰 받기
     * */
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
          /** 통신
           * Type: POST
           * To:카카오서버,
           * For:카카오Id 받아오기
           * */
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
              const kakaoId = res.data.id;
              if (kakaoId) {
                /** 통신
                 * Type: POST
                 * To:우리서버,
                 * For:kakaoID로 로그인, 토큰 받아오기
                 * res: type, token, uuid
                 * */
                console.log("test : ", Auth.SIGN_IN_API);
                const postData = { kakao_id: kakaoId };

                axios
                  .post(Auth.SIGN_IN_API, postData, jsonHeader)
                  .then((res) => {
                    if (res.data.token && res.data.uuid) {
                      console.log("res.data : ", res.data);
                      const ourServerToken = res.data.token;
                      const uuid = res.data.uuid;
                      /** 통신
                       * Type: GET
                       * To:우리서버,
                       * For:USER 정보 받아오기
                       * res: posts:[], favorite_posts:[], other user info..
                       * */
                      axios
                        .get(User.ALL + uuid + "/", {
                          headers: {
                            Authorization: `Token ${ourServerToken}`,
                          },
                        })
                        .then((res) => {
                          if (res.data) {
                            if (res.data.is_admin) {
                              setUserInfo(uuid, ourServerToken);
                            } else {
                              console.log("admin false");
                              window.alert(
                                "권한이 없습니다 \n 관리자에게 문의하세요 :("
                              );
                            }
                          } else {
                            console.log("user data 없음!");
                          }
                        });
                    } else {
                      if (!res.data.token) {
                        console.log("우리 token 없음!");
                      }
                      if (!res.data.uuid) {
                        console.log("uuid 없음!");
                      }
                    }
                  });
              } else {
                console.log("kakaoId 없음!");
              }
            });
        } else {
          console.log("access_token 없음!");
        }
      })
      .catch((error) => {
        console.log("error Catch : ", error);
      });
  }, []);
  return <></>;
};

export default KakaoCallBack;
