import { UserObj_res } from './../../@types/models/apps/UserList';
export interface UserContextType {
  //localStorage에 기록
  setUserInfo: (userData: UserObj_res, token: string) => void;
  getUserInfo: (active?: any) => void;
  logout: () => void;
  contextUserData: any;
  accessToken:string;
}
