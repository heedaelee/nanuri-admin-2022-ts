interface UserContextType {
  //localStorage에 기록
  setUserInfo: (userData: {}, token: string) => void;
  getUserInfo: (active?: any) => void;
  logout: () => void;
  contextUserData: any;
}
