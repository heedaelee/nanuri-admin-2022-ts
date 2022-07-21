interface UserContextType {
  //localStorage에 기록
  setUserInfo: (uuid: string, token: string) => void;
  getUserInfo: (active?: any) => void;
  logout: () => void;
  user: { uuid: string };
}
