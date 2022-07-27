export interface UserObj_res {
  address: string | null;
  auth_provider: string | null;
  created_at: string;
  email: string;
  favorite_posts: any[];
  is_active: boolean;
  is_admin: boolean;
  last_login: string | null;
  latitude: string | null;
  longitude: string | null;
  nickname: string | null;
  posts: [];
  profile: string | null; // 사진임
  updated_at: string | null;
  uuid: string;
}
export interface UserObj_req {
  nickname?: string | null;
  address?: string | null;
  auth_provider?: string | null;
  email?: string;
  is_active?: boolean;
  is_admin?: boolean;
  latitude?: string | null;
  longitude?: string | null;
  profile?: string | null; // 사진임
  password?: string | null;
  uuid?: string;
}

export interface userListObj {
  count: number;
  next: string;
  previous: string;
  results: UserObj_res[];
}
