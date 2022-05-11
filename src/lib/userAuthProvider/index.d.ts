interface UserContextType {
  //localStorage에 기록
  setUserInfo: (
    id: number,
    email: string,
    token: string,
    loginType: string,
    isLogin: boolean
  ) => void;
  getUserInfo: (active?: any) => void;
  logout: () => void;
}
