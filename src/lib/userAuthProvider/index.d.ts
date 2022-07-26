import { UserObj } from './../../@types/models/apps/UserList';
export interface UserContextType {
  //localStorage에 기록
  setUserInfo: (userData: UserObj, token: string) => void;
  getUserInfo: (active?: any) => void;
  logout: () => void;
  contextUserData: any;
}
